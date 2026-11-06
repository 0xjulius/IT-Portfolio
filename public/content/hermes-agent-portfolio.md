# Itseisännöity tekoälyagentti: Hermes Agent, LM Studio, Docker ja Telegram

## Yhteenveto

Tässä projektissa rakennetaan Windows-koneelle itse hallittava tekoälyagentti, joka käyttää [Hermes Agentia](https://github.com/NousResearch/hermes-agent) (Nous Research) [1], Docker Desktopia ja paikallisesti ajettavaa kielimallia LM Studion kautta. Agenttia voidaan käyttää Hermesin web-dashboardin kautta [2] sekä Telegram-botin välityksellä [10].

Tavoitteena on yhdistää paikallisen mallin kustannus- ja hallintaedut agentin työkaluihin: komentojen suorittamiseen, tiedostojen käsittelyyn, toistuviin tehtäviin ja keskustelumuistiin. Samalla ympäristö pyritään pitämään rajattuna niin, ettei agentilla ole tarpeettomia oikeuksia Windows-isäntäkoneeseen.

**Tärkeä rajaus:** paikallisesti ajettava kielimalli ei yksin takaa, että kaikki liikenne tai kaikki tiedot pysyvät paikallisina. Telegramin käyttö välittää viestejä Telegramin palveluiden kautta, ja erikseen käyttöön otetut verkkotyökalut tai ulkoiset API-palvelut voivat lähettää niille annettua sisältöä kolmansille osapuolille. Tietosuojan taso riippuu koko kokoonpanosta, ei pelkästään mallin sijainnista [7]. Telegramin viestiliikenne kulkee Telegramin palveluiden kautta [10].

![Projektin kuvakaappaus](/images/hermes/hermesagent.webp)

*Kuvakaappaus: Hermes-agentin logo.*

## Projektin tavoitteet

Projektissa tavoitellaan neljää asiaa:

- **Hallinta:** agentti ja sen asetukset ovat omassa ylläpidossa.
- **Paikallinen päättely:** kielimalli ajetaan LM Studiossa omalla koneella.
- **Työkalujen käyttö:** agentti voi tehdä konkreettisia toimia, kun tarvittavat työkalut on otettu käyttöön ja konfiguroitu.
- **Rajattu käyttöoikeus:** agentille annetaan vain tehtävien kannalta tarpeelliset tiedosto- ja suoritusympäristön oikeudet.

Hermes Agent tukee useita käyttöliittymiä, työkaluryhmiä, muistitoimintoja, taitoja (*skills*) ja ajastettuja tehtäviä [2]. Kaikki ominaisuudet eivät kuitenkaan aktivoidu automaattisesti pelkällä perusasennuksella; työkalut, taustapalvelut, mallin kyvykkyydet ja asetukset vaikuttavat siihen, mitä agentti pystyy tekemään [4].

## Arkkitehtuuri

Ratkaisussa on neljä keskeistä osaa:

1. **Hermes Agent** käsittelee keskustelun, valitsee työkalut ja koordinoi tehtävän suorittamista.
2. **LM Studio** tarjoaa paikallisen mallin HTTP-rajapinnan kautta.
3. **Docker Desktop** ajaa Hermes Gatewayn eristetyssä kontissa ja säilyttää määritellyn datan Docker-volumessa.
4. **Web-dashboard ja Telegram** tarjoavat käyttöliittymät agentille.

```text
Puhelin ── Telegram ── Telegram Bot API
                         │
                         ▼
Windows-kone       Docker-kontti: Hermes Agent
┌──────────────────────────────────────────────────────────┐
│ Gateway ── Dashboard ── Agentti ja työkalut              │
│                         │                                │
│                         └── terminal / file / muut       │
│                                                          │
│ Docker-volume: hermes-data → /opt/data                   │
└─────────────────────────────┬────────────────────────────┘
                              │ HTTP API
                              ▼
                 LM Studio Windowsissa
                 http://host.docker.internal:1234/v1
```

Kuvio esittää tavoiteltua loogista rakennetta. Terminal-työkalun todellinen suorituspaikka määräytyy erikseen määritetystä `terminal.backend`-asetuksesta. Hermesin ajaminen Docker-kontissa ja Hermeksen komentojen ajaminen erillisessä Docker-sandboxissa ovat kaksi eri asiaa [4].

## Miksi paikallinen kielimalli?

Paikallisen mallin käyttö voi vähentää riippuvuutta maksullisista mallirajapinnoista ja pitää varsinaiset mallipäättelyn pyynnöt omalla koneella. Se mahdollistaa myös mallien vaihtamisen LM Studion kautta laitteiston ja tehtävän mukaan [7].

Paikallisuudella on kuitenkin rajansa:

- Mallin lataaminen ja ajaminen vaatii riittävästi RAM-muistia ja/tai GPU-muistia.
- Mallin suorituskyky riippuu malliversiosta, kvantisoinnista, laitteistosta ja asetuksista.
- Mallin kyky kutsua työkaluja riippuu sekä mallin koulutuksesta että siitä, miten agentti ja mallipalvelin välittävät työkalukutsut.
- Hermes edellyttää vähintään 64 000 tokenin kontekstia. Paikallisessa mallissa kontekstin koko pitää asettaa vähintään tähän, koska pienemmällä kontekstilla varustetut mallit hylätään käynnistyksessä [5].
- Pienet paikalliset mallit voivat väittää tallentaneensa asian muistiin kutsumatta `memory`-työkalua. Dokumentaation mukaan näin käy usein alle noin 30 miljardin parametrin malleilla, joten tallennus pitää tarkistaa muistitiedostosta [11].
- Paikallinen malli ei itsessään takaa, että Hermesin terminaali, selain, Telegram tai muut integraatiot toimivat.
- Jos agentille otetaan käyttöön ulkoisia palveluita, niiden käyttö voi aiheuttaa kustannuksia ja tietojen siirtymistä palveluntarjoajille.

Tässä kokoonpanossa käytetään Gemma 4 12B -mallia LM Studion kautta [7]. Gemma-mallien ominaisuudet ja mallikohtaiset tiedot löytyvät Googlen dokumentaatiosta [8]. Mallin tarkka tunniste tulee tarkistaa LM Studion `/v1/models`-rajapinnasta ja valita Hermesin asetuksiin vasta tämän perusteella. Mallin nimi tai koko ei yksin takaa agenttitehtävien onnistumista; työkalujen käyttö pitää testata käytännössä.

![Kuvakaappaus: mallin kuvankäsittelyominaisuus](/images/hermes/tg-image-vision.png)

*Kuvakaappaus: esimerkki paikallisen mallin kuvasyötteestä. Kuvan ymmärtämisen tuki ja laatu riippuvat käytetystä mallista ja LM Studion asetuksista.*

## Miksi Hermes Agent?

Hermes on agenttikehys, ei pelkkä keskustelumalli. Sen tehtävänä on ohjata mallin ja työkalujen välistä vuorovaikutusta. Hermes Agent on MIT-lisensoitu avoimen lähdekoodin projekti, ja sen oma kuvaus korostaa oppimissilmukkaa: agentti voi luoda taitoja kokemuksesta, parantaa niitä käytössä ja pyrkiä tallentamaan tietoa pysyvästi [1]. Hermesin dokumentaatiossa kuvataan muun muassa:

- terminaalin ja koodin suorittamisen työkalut
- tiedostojen käsittely ja työskentelyhakemisto
- muistitoiminnot ja keskusteluhistoria
- uudelleenkäytettävät taidot (*skills*)
- gateway useille viestikanaville
- ajastetut tehtävät ja alitehtävien delegointi.

Ominaisuudet ovat riippuvaisia käytössä olevasta Hermes-versiosta, määrityksistä, käyttöliittymästä ja työkalujen saatavuudesta [4]. Agentin vastaus, jossa se kertoo komennon mutta ei suorita sitä, ei osoita terminaalityökalun toimivuutta. Työkalun suoritus on testattava todellisella komennolla ja sen tulosteella.

## Docker: kaksi eri käyttötapaa

Hermeksen Docker-dokumentaatio erottaa toisistaan kaksi asetelmaa [3]. Terminal-backendien yksityiskohdat kuvataan asetusten dokumentaatiossa [4]:

### 1. Hermes itse ajetaan Dockerissa

Tässä projektissa `nousresearch/hermes-agent`-image käynnistää Gatewayn. Skripti liittää pysyvän volumen konttiin:

```powershell
-v "${VOLUME}:/opt/data"
```

Tämä säilyttää Hermeksen asetukset ja muut `/opt/data`-hakemistoon tallennetut tiedot kontin uudelleenluonnin yhteydessä [3]. Se ei kuitenkaan automaattisesti ota käyttöön agentin Terminal-työkalua eikä anna sille pääsyä Dockerin hallintaan.

### 2. Hermes suorittaa tehtävät erillisessä Docker-sandboxissa

Hermesin `terminal.backend: docker` tarkoittaa erillistä suoritusympäristöä, jossa terminal-, file- ja koodinsuorituskutsut voidaan suorittaa [4]. Tämä on eri asia kuin Gateway-kontti. Docker-backend tarvitsee toimivan Docker- tai Podman-komennon Hermeksen käytettäväksi ja sen asetukset pitää tarkistaa.

### 3. Local-backend kontissa

`terminal.backend: local` suorittaa komennot siinä käyttöympäristössä, jossa Hermes-prosessi toimii [4]. Kun Hermes itse pyörii Docker-kontissa, `local` tarkoittaa käytännössä kyseisen kontin ympäristöä — ei suoraan Windowsin PowerShelliä.

Tämä voi olla yksinkertainen tapa testata komentojen suorittamista, mutta se ei ole sama eristystaso kuin erillinen Docker-sandbox. Lisäksi agentin käytössä olevat tiedostot ja salaisuudet on huomioitava: jos ne ovat saman kontin sisällä ja luettavissa, local-backend ei suojaa niitä agentin suorittamilta komennoilta.

## Käytetty käynnistysratkaisu

Projektissa käytetään PowerShell-skriptiä `start_hermes.ps1`, joka:

1. tarkistaa Docker CLI:n ja Docker Enginen toiminnan
2. käynnistää Docker Desktopin tarvittaessa
3. tarkistaa LM Studion API:n ja listaa saatavilla olevat mallit
4. luo Docker-volumen `hermes-data`, jos sitä ei vielä ole
5. luo tai käynnistää Hermes-kontin
6. odottaa dashboardin vastausta ja avaa selaimen.

Keskeiset muuttujat:

| Asetus | Arvo / tarkoitus |
|---|---|
| Docker image | `nousresearch/hermes-agent:latest` |
| Kontin nimi | `hermes` |
| Pysyvä volume | `hermes-data` → `/opt/data` |
| Dashboard | `127.0.0.1:9119` |
| LM Studio Windowsissa | `127.0.0.1:1234` |
| LM Studio kontista | `http://host.docker.internal:1234/v1` |
| Käynnistys | `gateway run` |
| Dashboardin aktivointi | `HERMES_DASHBOARD=1` |

Hermes tukee LM Studiota omana providerinaan. Osoite voidaan antaa `LM_BASE_URL`-ympäristömuuttujalla (oletus `http://localhost:1234/v1`) ja avain `LM_API_KEY`-muuttujalla, joka on paikallisella palvelimella usein pelkkä paikkamerkki [6]. Kontin sisällä `localhost` viittaa kontin omaan ympäristöön eikä isäntäkoneeseen, minkä vuoksi taulukossa käytetään osoitetta `host.docker.internal` [3].

Dashboardin julkaiseminen osoitteeseen `127.0.0.1` rajoittaa portin isäntäkoneen paikalliseen loopback-osoitteeseen. Tämä on hyvä oletus henkilökohtaiseen käyttöön, mutta se ei korvaa autentikointia eikä muiden verkkoasetusten tarkistamista.

## Pysyvä data ja projektitiedostot

Projektissa käytetään Docker named volumea `hermes-data`, joka liitetään polkuun `/opt/data` [3]. Hermeksen Docker-dokumentaation mukaan tämä hakemisto toimii konttiasennuksen pysyvän tilan sijaintina. Hermesin kotihakemisto määräytyy `HERMES_HOME`-ympäristömuuttujasta. Oletuksena se on `~/.hermes` (natiivissa Windows-asennuksessa `%LOCALAPPDATA%\hermes`), ja virallinen Docker-image käyttää polkua `/opt/data` [6]. Kontissa koko Hermesin tila on siis yhdessä hakemistossa, joka näyttää dokumentaation mukaan seuraavalta [3][4]:

```text
/opt/data                  # Docker-volume hermes-data (muualla ~/.hermes)
├── config.yaml            # Asetukset: malli, terminal, muisti, pakkaus jne.
├── .env                   # API-avaimet ja muut salaisuudet
├── auth.json              # OAuth-tunnistetiedot (esim. Nous Portal)
├── SOUL.md                # Agentin ensisijainen identiteetti (system promptin ensimmäinen osa)
├── memories/              # Pysyvä muisti
│   ├── MEMORY.md          #   agentin omat muistiinpanot: ympäristö, käytännöt, opitut asiat
│   └── USER.md            #   käyttäjäprofiili: mieltymykset, viestintätyyli, odotukset
├── skills/                # Taidot: mukana tulevat, asennetut ja agentin itse luomat
├── sessions/              # Keskusteluhistoria
├── state.db               # SQLite-tietokanta: sessiot, viestit ja gateway-reititys
├── cron/                  # Ajastettujen tehtävien määritykset
├── hooks/                 # Tapahtumakoukut
├── logs/                  # Lokit (esim. agent.log, errors.log, gateway.log; salaisuudet piilotetaan)
├── home/                  # Työkalu-alaprosessien HOME (git, ssh, gh, npm ja taito-CLI:t)
├── skins/                 # Omat CLI-teemat
├── cache/                 # Välimuistit ja tilapäistiedostot
├── backups/               # Asetusten ja päivitysten varmuuskopiot
├── pending/               # Hyväksyntää odottavat taitotallennukset (jos write_approval on päällä)
├── installs/              # Valinnaisten lisäosien riippuvuudet (asentuvat ensikäytössä)
└── profiles/              # Muut profiilit: jokaisella oma SOUL, muisti, taidot ja sessiot
```

`SOUL.md` on siis vain yksi tiedosto monista. Muisti, taidot, keskusteluhistoria ja tietokanta tallentuvat omiin paikkoihinsa, ja koko hakemisto sisältää sekä salaisuuksia (`.env`, `auth.json`) että henkilökohtaisia tietoja (`memories/`, `sessions/`, `state.db`). Käytännön huomioita:

- **Yksi data-hakemisto, yksi gateway.** Samaa data-hakemistoa ei pidä käyttää kahdella samanaikaisella gateway-kontilla, koska sessiotiedostoja ja muistia ei ole suunniteltu samanaikaiseen kirjoitukseen [3].
- **Nimetty volume suojaa tietokantaa.** `state.db` käyttää oletuksena SQLiten WAL-tilaa, ja Docker Desktopin Windows-bind mountit (9p/drvfs) voivat dokumentaation mukaan vioittaa WAL-tietokannan huomaamatta. Nimetty Docker-volume, kuten tässä projektissa käytetty `hermes-data`, sijaitsee Docker-virtuaalikoneen omalla tiedostojärjestelmällä ja tukee WAL-tilaa normaalisti [3].
- **Profiilit eristävät tilan.** Muisti on profiilikohtainen, joten toinen profiili ei näe ensimmäisen muistia, taitoja tai sessioita [3][11].

### Projektin omat tiedostot

Projektissa käytetään lisäksi omia dokumentteja:

| Tiedosto tai resurssi | Käyttötarkoitus |
|---|---|
| `start_hermes.ps1` | Käynnistää ja tarkistaa ympäristön |
| Docker-volume `hermes-data` | Säilyttää Hermeksen pysyvän tilan |
| `SOUL.md` | Kuvaa agentin tyyliä, toimintaperiaatteita ja rajoja |
| `AGENTS.md` | Kuvaa ympäristön ja projektin työskentelysäännöt |
| `hermes_dashboard.env` | Dashboardin tunnistetiedot, ei versionhallintaan |
| Telegram-botti | Agentin käyttö puhelimesta |
| Vianetsintämuistiinpanot | Kirjaa tehdyt muutokset ja tunnetut ongelmat |

Hermes lataa system promptiin kontekstitiedostoina muun muassa tiedostot `SOUL.md`, `.hermes.md`, `AGENTS.md`, `CLAUDE.md` ja `.cursorrules`, ja ladattavaa sisältöä rajoittaa asetus `context_file_max_chars` [4].

Ohjetiedostot, kuten `SOUL.md` ja `AGENTS.md`, ohjaavat mallin käyttäytymistä, mutta eivät yksin muodosta teknistä turvarajaa. Niiden lisäksi tarvitaan käyttöoikeuksien, verkon ja suoritusympäristön rajoituksia.

## Miten Hermes oppii käyttäjästä

Hermes ei ole tilaton keskustelija. Sen tarkoitus on kerätä tietoa käyttäjästä, ympäristöstä ja aiemmin ratkaistuista tehtävistä niin, että tieto on käytettävissä myös seuraavissa sessioissa. Tämä tapahtuu usealla toisiaan täydentävällä mekanismilla:

| Mekanismi | Sijainti | Sisältö |
|---|---|---|
| Agentin muistiinpanot | `memories/MEMORY.md` | Ympäristötiedot, käytännöt ja opitut asiat; enintään 2 200 merkkiä [11] |
| Käyttäjäprofiili | `memories/USER.md` | Käyttäjän mieltymykset, viestintätyyli ja odotukset; enintään 1 375 merkkiä [11] |
| Keskusteluhistoria | `state.db`, `sessions/` | Kaikki CLI- ja viestialustasessiot SQLite-tietokannassa, haettavissa FTS5-täystekstihaulla `session_search`-työkalulla [11] |
| Taidot | `skills/` | Uudelleenkäytettävät menettelyt `SKILL.md`-tiedostoina, joita agentti hallinnoi `skill_manage`-työkalulla [4][5] |

Muistitiedostot ladataan system promptiin kerran session alussa. Agentti hallinnoi niitä itse `memory`-työkalulla (lisää, korjaa, poistaa), ja muutokset tallentuvat levylle heti, mutta ne näkyvät mallille vasta seuraavassa sessiossa [11]. Muisti ei tiivisty automaattisesti: kun raja tulee vastaan, työkalu palauttaa virheen ja agentin on itse yhdistettävä tai poistettava vanhoja merkintöjä [11].

Taidot syntyvät kokemuksesta: agentti voi tallentaa onnistuneen ratkaisun taidoksi [1][4]. Taidon täysi sisältö ladataan vasta, kun tehtävä sitä tarvitsee, joten taitojen lisääminen ei kasvata jokaisen pyynnön kokoa. Mukana tulee myös valmis taitokatalogi, joka asennetaan hakemistoon `skills/` [5].

Telegramissa keskustelu on oletuksena yksi jatkuva sessio, joka säilyy uudelleenkäynnistyksissä. Tämä hidastaa oppimista, koska muistin ja historiahaun hyöty tulee esiin vasta session rajalla. Dokumentaation suositus on aloittaa uusi sessio komennolla `/new` luontevissa taukokohdissa, esimerkiksi tehtävän päätyttyä [11].

### Oppimisen hallinta ja yksityisyys

Koska nämä tiedostot kertovat käyttäjästä, niitä on käsiteltävä henkilötietoina:

- **Hyväksyntä ennen tallennusta.** Asetus `memory.write_approval: true` vaatii hyväksynnän ennen muistitallennusta. Telegramissa ja taustalla ajettavan itsearvioinnin tallennukset jäävät odottamaan komentoja `/memory pending`, `/memory approve` ja `/memory reject` [4][11].
- **Taitojen tallennukset samalla tavalla.** Asetus `skills.write_approval: true` pysäyttää taitojen luonnin ja muokkauksen; muutokset odottavat hakemistossa `~/.hermes/pending/skills/`, ja niitä tarkastellaan komennoilla `/skills pending` ja `/skills diff` [4].
- **Näe ja korjaa opitut asiat.** Komento `hermes journey` näyttää aikajanalla, mitä Hermes on oppinut, ja sillä voi muokata tai poistaa yksittäisiä taitoja ja muistimerkintöjä [11]. Muistitiedostot voi lukea myös suoraan hakemistosta `memories/` [11].
- **Muistin sisältö kulkee kehotteen mukana.** Koska `MEMORY.md` ja `USER.md` syötetään osaksi system promptia, niiden sisältö on mukana jokaisessa mallikutsussa. Paikallisella mallilla se pysyy LM Studiossa, mutta jos käyttöön otetaan ulkoinen mallipalvelu tai ulkoinen muistipalvelu, tietosuoja-arvio pitää tehdä uudelleen [11].

## Terminal-työkalun käyttöönotto ja testaus

Hermeksen työkalut eivät välttämättä ole kaikki käytössä asennuksen jälkeen. Käytössä olevia työkaluja voi säätää komennolla `hermes tools` [5]. Ennen kuin agentilta odotetaan tiedostojen muokkaamista tai koodin ajamista, pitää varmistaa seuraavat asiat:

1. Terminal-työkaluryhmä on käytössä Hermesin työkaluasetuksissa.
2. `terminal.backend` on valittu ja backendin edellytykset täyttyvät.
3. Malli ja Hermes käsittelevät työkalukutsut oikein.
4. Agentti pystyy suorittamaan komennon ja palauttamaan sen todellisen tulosteen.
5. Työhakemisto on oikea ja kirjoitusoikeudet riittävät.

Perustesti on pyytää agenttia suorittamaan `pwd` ja `date` sekä näyttämään komentojen tulosteet. Pelkkä vastaus, jossa agentti kertoo komennon nimen mutta sanoo, ettei sillä ole terminaalia, ei ole onnistunut suoritus.

### Backend-valinta tässä projektissa

Tässä ympäristössä on valittava tietoisesti kahden vaihtoehdon välillä:

- **`local`:** komennot suoritetaan Hermes Gateway -kontin sisällä. Tämä voi olla helpompi ottaa käyttöön, mutta agentin on tällöin mahdollista lukea ja muokata kaikkea, mihin sen prosessilla on kontin sisällä oikeudet.
- **`docker`:** Hermes käynnistää erillisen sandbox-kontin komentoja varten. Tämä tarjoaa paremman eristyksen, mutta vaatii, että Docker-komento on Hermeksen käytettävissä.

Projektin käynnistysskripti ei liitä Docker-socketia Gateway-konttiin. Dockerin ja Terminal-backendin asetusten ero kuvataan Hermesin dokumentaatiossa [4]. Tämä vähentää riskiä, että agentti voisi hallita isäntäkoneen Dockeria. Samalla se tarkoittaa, ettei erillinen Docker-backend välttämättä toimi ennen kuin sen tarvitsema Docker-yhteys on ratkaistu turvallisesti.

Docker-socketin liittäminen ei ole harmiton korjaus: Dockerin hallintaoikeus voi käytännössä antaa laajat oikeudet isäntäkoneeseen [9]. Siksi sitä ei pidä lisätä vain siksi, että Terminal saataisiin toimimaan.


## Telegram-integraatio

![Projektin kuvakaappaus](/images/hermes/tg.png) 
> Kuvakaappaus: Telegram-botti.

Telegramin Bot API mahdollistaa botin kautta viestittelyn [10]. Hermes Gateway ylläpitää viestikanavan yhteyttä ja välittää viestit agentille.

Projektin asetuksissa Telegram-botin token ja sallittujen käyttäjien tunnisteet määritetään Hermesin dokumentoiman konfiguraation mukaisesti. Token on salaisuus, eikä sitä pidä tallentaa julkiseen Git-repositorioon tai liittää kuvakaappauksiin.

Telegramin Bot API:n käytöstä seuraa, että viestit välitetään Telegramin palveluiden kautta [10]. Käytännössä huomioitavaa:

- Telegramin kautta lähetetyt viestit kulkevat Telegramin palveluiden kautta.
- Käyttäjien sallittujen tunnisteiden rajaaminen vähentää riskiä, että muut voivat käyttää bottia.
- Käyttäjärajaus pitää testata toisella, kielletyllä käyttäjällä tai muuten varmistaa asetuksista.
- Viestikanavan turvallisuus ei automaattisesti suojaa agentin työkaluja tai tiedostoja.

## Tietoturva ja yksityisyys

Ympäristöä suunniteltaessa on erotettava toisistaan mallin paikallisuus, agentin oikeudet ja viestikanavien tietovirrat.

### Käytössä olevat suojaukset

- Hermes ajetaan Docker-kontissa.
- Dashboard-portti julkaistaan vain osoitteeseen `127.0.0.1:9119`.
- Docker-socketia ei liitetä Hermes Gateway -konttiin.
- Pysyvä data tallennetaan nimettyyn volumeen.
- Telegram-botti on tarkoitus rajata sallittuihin käyttäjiin.
- Salaisuudet pyritään pitämään erillisissä asetustiedostoissa, joita ei lisätä versionhallintaan.

### Riskit ja rajoitukset

- **Paikallinen malli ei tarkoita, että kaikki liikenne on paikallista.** Telegram ja ulkoiset verkkopalvelut ovat edelleen kolmansia osapuolia.
- **`local`-terminal-backend ei ole erillinen sandbox.** Kontin sisällä käytettävissä olevat tiedostot ja salaisuudet voivat olla komentojen saavutettavissa.
- **Ohjetiedostot eivät ole teknisiä käyttöoikeusrajoja.** Pienempi tai työkalukäyttöön heikommin soveltuva malli voi tulkita ohjeita väärin.
- **LM Studion verkko-osoite pitää rajata harkiten.** Jos palvelin kuuntelee kaikissa verkkoliitännöissä, lähiverkon saavutettavuus riippuu myös palomuurista ja muista asetuksista.
- **Dashboardin autentikointi pitää varmistaa.** Paikallinen porttisidonta pienentää altistusta mutta ei yksin korvaa kirjautumissuojausta.
- **`latest`-image voi muuttua päivitysten yhteydessä.** Toistettavuutta parantaa version tai imagetunnisteen lukitseminen ja varmuuskopiointi ennen päivitystä.
- **Varmuuskopioi volume.** Pysyvä volume suojaa kontin poistumiselta, mutta ei itsessään suojaa vahingossa tapahtuvalta poistamiselta tai levyrikolta.

### Tuotantokäyttöön suositeltavat parannukset

Jos ympäristöä käytetään tärkeisiin tietoihin tai usean käyttäjän palveluna, harkitse ainakin:

- erillistä sandboxia agentin komentoja varten
- vähimmän oikeuden periaatetta ja tarvittaessa ei-root-käyttäjää
- API-avainten erottamista agentin työskentelytilasta
- verkon ulosmenevän liikenteen rajaamista
- kiinteää image-versiota, päivityssuunnitelmaa ja varmuuskopioita
- lokien seurantaa ja palautumistestausta
- dashboardin vahvaa autentikointia sekä TLS:ää, jos käyttö avataan paikallisen koneen ulkopuolelle.

Nykyinen ratkaisu on henkilökohtaiseen kokeiluun sopiva lähtökohta, mutta sitä ei pidä kuvata automaattisesti riskittömäksi tai täysin suljetuksi ympäristöksi.

## Ongelmat ja opit

Projektin tärkeimmät käytännön opit ovat:

1. **Virallinen image vähensi yhteensopivuusongelmia.** Aiempi oma image, jossa paketti asennettiin PyPI:sta, ei sisältänyt dashboardin vaatimia moduuleja. Viralliseen imageen siirtyminen ratkaisi tämän ongelman.
2. **Gateway-kontti ja Terminal-backend ovat eri asioita.** Hermes voi toimia Dockerissa, vaikka Terminal-työkalun suoritusympäristö olisi määrittämättä tai toimimaton.
3. **Backend ja oikeudet on suunniteltava yhdessä.** Erillinen Docker-backend tarvitsee Docker-yhteyden; `local` suorittaa komennot nykyisessä Hermes-ympäristössä.
4. **Pysyvä data kuuluu volumeen.** Kontin sisään asennetut paketit tai muut muutokset eivät välttämättä säily kontin uudelleenluonnissa, ellei niitä tallenneta pysyvään sijaintiin tai sisällytetä imageen.
5. **Työhakemisto vaikuttaa tiedostojen löytymiseen.** `terminal.cwd` ja käytössä oleva backend määrittävät, mistä suhteellisia polkuja tulkitaan.
6. **Mallin työkalukyky pitää testata käytännössä.** Mallin koko tai maininta työkalutuesta ei takaa onnistunutta työkalukutsua.
7. **Turvallisuus muodostuu useasta kerroksesta.** Konttieristys, käyttöoikeudet, käyttäjärajaukset, salaisuuksien käsittely ja hyväksyntämenettelyt täydentävät toisiaan.

## Ensimmäiset testit

Ennen kuin agentille annetaan laajoja tehtäviä, testaa yksi ominaisuus kerrallaan. Hermesin pika-aloitusohjeen periaate on sama: ensin pitää saada toimimaan yksi tavallinen keskustelu, ja gateway, ajastukset ja taidot lisätään vasta sen jälkeen [5]. Jos jokin ei toimi, komento `hermes doctor` kertoo puuttuvista tai vanhentuneista asetuksista [5].

1. **Terminal:** pyydä agenttia suorittamaan `pwd` ja `date` ja palauttamaan tulosteet.
2. **Tiedostot:** luo `workspace/hello.txt`, kirjoita siihen lyhyt teksti ja lue tiedosto takaisin.
3. **Koodi:** kirjoita Python-ohjelma, suorita se ja tarkista tulos.
4. **Verkkohaku:** pyydä hakemaan virallinen lähde ja tarkista, että käytössä on oikea hakutyökalu.
5. **Muisti:** pyydä agenttia tallentamaan testitieto `memory`-työkalulla ja varmista, että merkintä löytyy tiedostosta `memories/MEMORY.md` (tai käyttäjätiedoista `USER.md`). Aloita sitten uusi sessio komennolla `/new` ja kysy tietoa uudelleen, koska muisti päivittyy mallille vasta uudessa sessiossa [11].
6. **Turvallisuus:** varmista, että agentti ei pääse Windowsin tiedostoihin, joita sille ei ole tarkoituksella jaettu.

Testituloksissa erotetaan aina toisistaan agentin ilmoitus ja todennettu suoritus. Jos agentti sanoo luoneensa tiedoston, varmista tiedoston olemassaolo ja sisältö.

## Yhteenveto

Projektissa yhdistyvät Hermes Agent, paikallinen LM Studio -mallipalvelu, Docker Desktop sekä web- ja Telegram-käyttöliittymät. Ratkaisu tarjoaa hyvän oppimisympäristön agenttien työkalujen, pysyvän tilan, mallipalvelun ja tietoturvarajojen ymmärtämiseen.

Tärkein tekninen havainto on, että **Hermes Gatewayn ajaminen Dockerissa ei automaattisesti ota käyttöön erillistä komentojen suoritusympäristöä**. Terminal-backend pitää valita, sen edellytykset pitää täyttää ja työkalun toiminta todentaa käytännön testillä.

Paikallinen kielimalli voi vähentää ulkoisten mallirajapintojen tarvetta, mutta tietosuojan ja turvallisuuden arvioinnissa on huomioitava myös Telegram, verkkotyökalut, salaisuudet, tiedostojen käyttöoikeudet ja komentojen suoritusympäristö.

## Lähteet

Alla olevat lähteet ovat ensisijaisesti valmistajien ja projektien virallista dokumentaatiota. Ominaisuudet ja asetukset voivat muuttua, joten tarkista oman asennetun Hermes-version dokumentaatio ennen tuotantokäyttöä.

[1] **Nous Research — Hermes Agent, lähdekoodi ja projektin yleiskuvaus**  
   https://github.com/NousResearch/hermes-agent

[2] **Hermes Agent — virallinen dokumentaatio**  
   https://hermes-agent.nousresearch.com/docs/

[3] **Hermes Agent — Docker-asennus ja Gateway-kontti**  
   https://hermes-agent.nousresearch.com/docs/user-guide/docker

[4] **Hermes Agent — asetukset, hakemistorakenne ja Terminal-backendit**  
   https://hermes-agent.nousresearch.com/docs/user-guide/configuration

[5] **Hermes Agent — pika-aloitus ja työkalujen käyttöönotto**  
   https://hermes-agent.nousresearch.com/docs/getting-started/quickstart/

[6] **Hermes Agent — ympäristömuuttujien viite**  
   https://hermes-agent.nousresearch.com/docs/reference/environment-variables

[7] **LM Studio — virallinen dokumentaatio**  
   https://lmstudio.ai/docs

[8] **Google AI for Developers — Gemma-mallien dokumentaatio**  
   https://ai.google.dev/gemma/docs

[9] **Docker — Docker Desktopin dokumentaatio**  
   https://docs.docker.com/desktop/

[10] **Telegram — Bot API**  
    https://core.telegram.org/bots/api

[11] **Hermes Agent — pysyvä muisti (MEMORY.md, USER.md ja session_search)**  
    https://hermes-agent.nousresearch.com/docs/user-guide/features/memory