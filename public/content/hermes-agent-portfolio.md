# Itseisännöity tekoälyagentti: Hermes Agent + LM Studio + Telegram

*Projektin yhteenveto portfoliota varten – marraskuu 2026*

## Yhteenveto

Rakensin Windows-koneelle itseisännöidyn tekoälyagentin. Agentti on
[Hermes Agent](https://github.com/NousResearch/hermes-agent) (Nous Research),
ja se pyörii Docker-kontissa. Ratkaisussa käytetään paikallista Gemma 4 12B -kielimallia (LM Studio), mutta kielimallit ovat myös vaihdettavissa nappia painamalla. Tämä arkkitehtuuri varmistaa, että kaikki data pysyy yksinomaan omassa hallinnassa ja tietoturvallisesti suljetussa ympäristössä.

Agenttia käytetään kahden käyttöliittymän kautta: web-dashboardin ja Telegram-botin.

Projektin aikana siirryin omatekoisesta imagesta virallisen imagen käyttöön,
ratkaisin kontin pysyvän datan, dashboardin kirjautumisen ja agentin työkalujen
oikeudet sekä kirjoitin käynnistysskriptin, joka pystyttää koko ympäristön
yhdellä komennolla.

## Miksi Gemma?

Google Gemma 4 12B -kielimalli on valittu järjestelmään sen erinomaisten teknisten ominaisuuksien ja paikallisen tehokkuuden vuoksi. Kuvassa näkyvien ja mallin arkkitehtuurin tarjoamien vahvuuksien ansiosta se soveltuu täydellisesti agenttiympäristöön:

* **Erinomainen työkaluosaaminen (Tool Use):** Malli on koulutettu ja optimoitu nimenomaan työkalujen käyttöön (*”This model has been trained for tool use”*). Se osaa hyödyntää itsenäisesti erilaisia toimintoja, skriptejä ja ohjelmistorajapintoja poikkeuksellisen tarkasti.
* **Optimoitu koko ja suorituskyky (12B):** Noin 12 miljardin parametrin koko tarjoaa täydellisen tasapainon älykkyyden ja keveyden välillä. Se pyörii sujuvasti paikallisessa laitteistossa (kuten LM Studiossa), mutta tarjoaa silti riittävästi päättelykykyä monimutkaisten tehtävien pilkkomiseen.
* **Täydellinen tietosuvereenisuus:** Koska mallia ajetaan paikallisesti omassa ympäristössä, kaikki data ja tiedostot pysyvät täysin omassa hallinnassa ilman tietovuotoriskejä tai riippuvuutta ulkoisista pilvipalveluista.

![Projektin kuvakaappaus](/images/hermes/tg-image-vision.png) 
> Kuvakaappaus: Google Gemma 4 12B -kielimallin "Image Vision" ominaisuus tunnistaa myös kuvia lokaalisti, ja osaa päätellä tarkkaan mitä kuvassa on.

## Motivaatio

- **Yksityisyys ja hallinta:** henkilökohtainen agentti, jonka data ja mallit
  pysyvät omalla koneella.
- **Kustannukset:** paikallinen malli ei kuluta API-kutsuja.
- **Oppiminen:** halusin ymmärtää, miten agenttiympäristö rakennetaan
  turvallisesti: kontit, volumet, oikeudet, hyväksyntäkehotteet ja
  viestikanavien kytkentä.
- **Käytettävyys:** agentti tavoitettavissa myös puhelimesta Telegramin kautta.

## Omaisuudet (projektin tuotokset)

| Tuotos | Kuvaus |
|---|---|
| `start_hermes.ps1` | Käynnistysskripti: käynnistää Dockerin ja LM Studion, luo tai käynnistää Hermes-kontin, odottaa dashboardin ja avaa selaimen |
| Docker-volume `hermes-data` | Pysyvä data (`/opt/data`): asetukset, muistit, skillit, sessiot, työtiedostot |
| `SOUL.md` | Agentin persoona ja toimintaperiaatteet (tyyli, rehellisyys, turvallisuus) |
| `AGENTS.md` | Ympäristön kuvaus ja säännöt agentille (tiedostosijainnit, rajoitukset) |
| `hermes_dashboard.env` | Dashboardin kirjautumistiedot erillisessä tiedostossa (ei versionhallintaan) |
| Telegram-botti | Agentin viestikanava puhelimeen, rajattu sallittuihin käyttäjiin |
| Käyttö- ja vianetsintämuistiinpanot | Opitut asiat ja korjausohjeet (ks. Yhteenveto) |

## Keskeiset käyttötapaukset

### UC-1: Yksityinen henkilökohtainen avustaja Telegramissa

**Ongelma:** Pilvipohjaiset avustajat vaativat keskustelujen ja tiedostojen
lähettämistä kolmannelle osapuolelle, eikä niitä voi räätälöidä omiin
tarpeisiin.

**Ratkaisu:** Hermes pyörii omalla koneella paikallisen mallin varassa, ja
Telegram-botti on yhdistetty siihen. Botti vastaa vain sallituille
käyttäjätunnuksille. Agentin tyyli ja säännöt määritellään tiedostoissa
`SOUL.md` ja `AGENTS.md`.

**Hyöty:** Agentti tavoitettavissa mistä tahansa puhelimella, ja keskustelut
sekä muisti pysyvät omassa hallinnassa. Tyyli ja toimintatavat ovat
muokattavissa ilman kolmannen osapuolen rajoituksia.

### UC-2: Valvottu tehtäväautomaatio eristetyssä ympäristössä

**Ongelma:** Agentille on hyödyllistä antaa terminaalin käyttö (skriptien
kirjoitus ja ajo, tiedostojen käsittely), mutta vapaa shell-pääsy omalle
koneelle on riski.

**Ratkaisu:** Agentti ajaa komennot Docker-kontin sisällä (terminal backend
`local`). Windows-koneen tiedostoja ei ole liitetty konttiin eikä
Docker-socketia ole annettu agentille. Työtiedostot kirjoitetaan
työkansioon `workspace`, ja vaaralliset komennot (esim. `rm -rf`) pysäytetään
Hermesin hyväksyntäkehotteella, ennen kuin ne ajetaan. Lisäksi agentti
kysyy luvan ennen tiedostojen poistoa SOUL.md:n säännön mukaan.

**Hyöty:** Agentti voi kirjoittaa ja ajaa koodia käytännössä (testattu:
Python-skriptin luonti ja ajo), ja virhetilanteen vaikutus rajoittuu
konttiin. Ihminen pysyy mukana vaarallisissa päätöksissä.

### UC-3: Pysyvä muisti ja toistuvat tehtävät

**Ongelma:** Tavallinen chat unohtaa kontekstin joka keskustelussa, eikä
siitä ole apua toistuviin tehtäviin.

**Ratkaisu:** Hermes tallentaa muistit, skillit ja sessiot volumeen
(`/opt/data`), joten ne säilyvät, vaikka kontti poistettaisiin ja luotaisiin
uudelleen. Agentti voi oppia toistuvia työtapoja skilleiksi ja hoitaa
ajastettuja tehtäviä (esim. muistutukset) gatewayn kautta. Kontekstin
kasvua hallitaan komennoilla `/usage`, `/compress` ja `/new`.

**Hyöty:** Agentti muistaa mieltymykset ja työtavat sessioiden yli. Pitkän
keskustelun kustannus pysyy hallinnassa, kun kontekstin kokoa seurataan.

## Telegram-integraatio
![Projektin kuvakaappaus](/images/hermes/tg.png) 
> Kuvakaappaus: Telegram-botti.

- Yhteys toteutettu Hermesin gateway-palvelun kautta (`gateway run`), joka
  pitää Telegram-botin yhteyden auki kontin käynnissäoloajan.
- Botti luotiin Telegramin BotFatherilla. Tunniste (token) ja sallittu
  käyttäjä-ID tallennetaan Hermesin asetustiedostoon volumessa
  (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALLOWED_USERS`). Ilman sallittua
  käyttäjää botti hylkää kaikki viestit.
- Telegramissa käytettävät komennot: `/new` (uusi sessio), `/usage`
  (tokenit), `/compress` (konteksti), `/sessions`.
- Opittu: kolmannen osapuolen neuvoissa esiintyneet asetusavaimet
  (`plugins.telegram.*`) eivät olleet dokumentoituja. Oikea tapa vahvistettiin
  Hermesin virallisesta dokumentaatiosta.

## Arkkitehtuuri

```
  Puhelin ──Telegram──┐
                      ▼
               Telegram Bot API
                      │ (ulos kontista)
 Windows-kone         ▼
 ┌─────────────────────────────────────────────────────────┐
 │  Docker-kontti: nousresearch/hermes-agent               │
 │   ┌──────────────┐   ┌─────────────┐   ┌─────────────┐  │
 │   │ Gateway      │   │ Dashboard   │   │ Agentti +   │  │
 │   │ (Telegram,   │   │ (web, auth) │   │ työkalut    │  │
 │   │  ajastukset) │   │ :9119       │   │ (terminal)  │  │
 │   └──────┬───────┘   └──────┬──────┘   └──────┬──────┘  │
 │          └──────────────────┴─────────────────┘         │
 │             Volume hermes-data  →  /opt/data            │
 └───────────┬─────────────────────────────────▲───────────┘
             │ HTTP (host.docker.internal:1234) │
             ▼                                  │
      LM Studio (Gemma 4 12B, 64k konteksti)    │
                                      Selain ───┘ 127.0.0.1:9119
```

## Teknologiat

| Alue | Teknologia |
|---|---|
| Agentti | Hermes Agent (Nous Research) |
| Kielimalli | Gemma 4 12B (GGUF Q4_K_M), LM Studio, OpenAI-yhteensopiva API |
| Konttialusta | Docker Desktop (Windows), Docker-volumet |
| Käyttöliittymät | Hermes web dashboard, Telegram Bot API |
| Automaatio | PowerShell, LM Studio CLI (`lms`) |
| Tiedostot | Markdown (`SOUL.md`, `AGENTS.md`), YAML-asetukset |

## Asetukset

| Asetus | Arvo / tarkoitus |
|---|---|
| Image | `nousresearch/hermes-agent` (virallinen) |
| Käynnistys | `gateway run` + `HERMES_DASHBOARD=1`, `--restart unless-stopped` |
| Pysyvä data | Named volume `hermes-data` → `/opt/data` |
| Dashboard-portti | `127.0.0.1:9119` (julkaistu vain paikalliseen osoitteeseen) |
| Dashboard-kirjautuminen | Basic auth (ympäristömuuttujat tiedostosta) |
| Terminal backend | `local` (komennot ajetaan kontin sisällä) |
| Työhakemisto | `terminal.cwd = /opt/data`, työtiedostot kansioon `workspace` |
| Hyväksyntätila | `approvals.mode = manual` (varmista komennolla `hermes config`) |
| LM Studio | Palvelin käynnistetty `lms server start`, konteksti 64 000, malli ladattu GPU:lle |
| Malliyhteys | `host.docker.internal:1234/v1` kontista isäntäkoneelle |

## Tietoturvaraja ja tuotantokäyttö

**Nykyiset suojaukset**

- Kontti on eristyskerros: ei Docker-socketia, ei isäntäkoneen kansioita.
- Dashboard vaatii kirjautumisen ja on julkaistu vain osoitteeseen
  `127.0.0.1`.
- Telegram-botti vastaa vain sallituille käyttäjille.
- Vaaralliset komennot vaativat hyväksynnän (`approvals.mode = manual`).
- Salaisuudet pidetään erillisessä env-tiedostossa, ei skriptissä.

**Tunnetut rajat**

- Tekstimuotoiset säännöt (`SOUL.md`, `AGENTS.md`) ovat ohjeita, eivät
  pakotteita. Pieni 12B-malli voi unohtaa niitä, joten kriittisiä päätöksiä ei
  voi jättää pelkän tekstiohjeen varaan.
- Agentti näkee kontin sisällä Hermesin asetukset ja `.env`-tiedoston, joten
  API-avaimet ovat agentin luettavissa. `local`-backend ei suojaa niitä.
- Jos LM Studio kuuntelee kaikissa verkkoliitännöissä, se on näkyvissä
  lähiverkossa. Palomuurisääntö tai sidonta vain paikalliseen osoitteeseen on
  syytä tarkistaa.
- Aiemman Docker-backendin kokeilu osoitti, että konttiin ei voi antaa
  Docker-socketia ilman, että agentille annetaan käytännössä oikeus koko
  isäntäkoneeseen.

**Tuotantokäyttöön tarvittaisiin**

- Eristetty suoritusympäristö työkaluille (erillinen sandbox-backend tai
  etäkone), jotta salaisuudet ja agentin komennot eivät jaa samaa konttia.
- Salaisuuksien hallinta (secrets manager) ja avainten kierrätys.
- TLS ja käänteinen välityspalvelin (reverse proxy), jos dashboard
  altistetaan verkkoon; pidä dashboardin autentikointi päällä.
- Kiinteä image-versio `latest`-tagin sijaan, päivitysprosessi ja
  varmuuskopiot volumesta.
- Lokien keruu, valvonta ja ulosmenevän liikenteen rajaus (egress-palomuuri).
- Ei-root-käyttäjä ja vähimmät oikeudet.

Nykyisessä muodossa ympäristö sopii henkilökohtaiseen käyttöön omalla
koneella, ei monen käyttäjän tai julkiseen tuotantoon.

## Yhteenveto

Projekti tuotti toimivan, paikallisen ja yksityisen tekoälyagentin, joka on
käytettävissä sekä selaimesta että Telegramista. Ympäristö käynnistyy
yhdellä skriptillä, ja pysyvä data säilyy kontin päivityksissä.

**Keskeiset opit**

1. **Pysyvyys:** kontin sisälle `pip`illä tehdyt asennukset katoavat
   kontin uudelleenluonnissa. Pysyvä data kuuluu volumeen.
2. **Virallinen image voitti oman:** oma image, jossa paketti oli asennettu
   PyPI:sta, ei sisältänyt dashboardin vaatimia moduuleja. Virallinen image
   ratkaisi ongelman kerralla.
3. **Backend ja oikeudet:** Docker-backend ei toimi, jos agentti itse
   pyörii kontissa ilman Docker-socketia. `local`-backend kontin sisällä on
   käytännöllinen kompromissi.
4. **Työhakemisto vaikuttaa löydettävyyteen:** liian kapea `terminal.cwd`
   sai agentin etsimään vain yhdestä kansiosta. Työhakemisto juureen ja
   uusien tiedostojen sääntö omaan kansioonsa toimi paremmin.
5. **Tarkista lähteet:** konfiguraatioavaimet ja komennot kannattaa
   varmistaa virallisesta dokumentaatiosta eikä luottaa yksittäisen
   avustajan ehdotuksiin.
6. **Turvallisuus kerroksina:** eristys, hyväksyntäkehote, käyttäjärajaus
   ja tekstisäännöt täydentävät toisiaan, eikä yksikään niistä yksin riitä.

**Jatkokehitys:** erillinen sandbox työkaluille, kiinteä imageversio ja
automaattinen varmuuskopiointi, tarkemmat Telegram-käyttötapaukset
(ajastetut raportit, tiedostojen käsittely) sekä mallin ja kontekstin
koon hienosäätö.
