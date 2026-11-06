# Itseisännöity tekoälyagentti: Hermes Agent, LM Studio, Docker ja Telegram

## Yhteenveto

Tässä projektissa rakennetaan Windows-koneelle itse hallittava tekoälyagentti, joka käyttää [Hermes Agentia](https://github.com/NousResearch/hermes-agent) (Nous Research), Docker Desktopia ja paikallisesti ajettavaa kielimallia LM Studion kautta. Agenttia voidaan käyttää Hermesin web-dashboardin kautta [2] sekä Telegram-botin välityksellä [10].

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
- Paikallinen malli ei itsessään takaa, että Hermesin terminaali, selain, Telegram tai muut integraatiot toimivat.
- Jos agentille otetaan käyttöön ulkoisia palveluita, niiden käyttö voi aiheuttaa kustannuksia ja tietojen siirtymistä palveluntarjoajille.

Tässä kokoonpanossa käytetään Gemma 4 12B -mallia LM Studion kautta [7]. Gemma-mallien ominaisuudet ja mallikohtaiset tiedot löytyvät Googlen dokumentaatiosta [8]. Mallin tarkka tunniste tulee tarkistaa LM Studion `/v1/models`-rajapinnasta ja valita Hermesin asetuksiin vasta tämän perusteella. Mallin nimi tai koko ei yksin takaa agenttitehtävien onnistumista; työkalujen käyttö pitää testata käytännössä.

![Kuvakaappaus: mallin kuvankäsittelyominaisuus](/images/hermes/tg-image-vision.png)

*Kuvakaappaus: esimerkki paikallisen mallin kuvasyötteestä. Kuvan ymmärtämisen tuki ja laatu riippuvat käytetystä mallista ja LM Studion asetuksista.*

## Miksi Hermes Agent?

Hermes on agenttikehys, ei pelkkä keskustelumalli. Sen tehtävänä on ohjata mallin ja työkalujen välistä vuorovaikutusta. Hermesin dokumentaatiossa kuvataan muun muassa:

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

Dashboardin julkaiseminen osoitteeseen `127.0.0.1` rajoittaa portin isäntäkoneen paikalliseen loopback-osoitteeseen. Tämä on hyvä oletus henkilökohtaiseen käyttöön, mutta se ei korvaa autentikointia eikä muiden verkkoasetusten tarkistamista.

## Pysyvä data ja projektitiedostot

Projektissa käytetään Docker named volumea `hermes-data`, joka liitetään polkuun `/opt/data` [3]. Hermeksen Docker-dokumentaation mukaan tämä hakemisto toimii konttiasennuksen pysyvän tilan sijaintina. Siellä voidaan säilyttää esimerkiksi:

- `config.yaml`: Hermesin asetukset
- `.env`: API-avaimet ja muut salaisuudet
- `SOUL.md`: agentin persoonaa ja toimintatapoja kuvaavat ohjeet
- keskustelusessiot ja muistit
- asennetut taidot ja muut Hermesin tiedot.

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

Ohjetiedostot, kuten `SOUL.md` ja `AGENTS.md`, ohjaavat mallin käyttäytymistä, mutta eivät yksin muodosta teknistä turvarajaa. Niiden lisäksi tarvitaan käyttöoikeuksien, verkon ja suoritusympäristön rajoituksia.

## Terminal-työkalun käyttöönotto ja testaus

Hermeksen työkalut eivät välttämättä ole kaikki käytössä asennuksen jälkeen. Ennen kuin agentilta odotetaan tiedostojen muokkaamista tai koodin ajamista, pitää varmistaa seuraavat asiat:

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

Ennen kuin agentille annetaan laajoja tehtäviä, testaa yksi ominaisuus kerrallaan:

1. **Terminal:** pyydä agenttia suorittamaan `pwd` ja `date` ja palauttamaan tulosteet.
2. **Tiedostot:** luo `workspace/hello.txt`, kirjoita siihen lyhyt teksti ja lue tiedosto takaisin.
3. **Koodi:** kirjoita Python-ohjelma, suorita se ja tarkista tulos.
4. **Verkkohaku:** pyydä hakemaan virallinen lähde ja tarkista, että käytössä on oikea hakutyökalu.
5. **Muisti:** tallenna testitieto ja tarkista myöhemmin, säilyykö se uuden session jälkeen.
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

[4] **Hermes Agent — asetukset ja Terminal-backendit**  
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
