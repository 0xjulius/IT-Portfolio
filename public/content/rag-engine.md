# Local RAG (Retrieval-Augmented Generation) Engine

RAG (Retrieval-Augmented Generation) on arkkitehtuuri, jossa paikallinen kielimalli (LLM) hakee reaaliaikaisesti faktoja yrityksen omista dokumenteista ja muodostaa vastauksen niiden pohjalta pelkän ulkoa opitun tiedon sijaan.

Järjestelmä on niin sanottu "Model-based reflex agent", joka käyttää reaaliaikaista dataa, tai tietoa luomaan vastauksia ja suorittaa olennaisia toimenpiteitä syötettyjen tietojen mukaan kunnioittaen etukäteen luotua "system prompt"-kehotetta.

Esitä kysymyksiä omista PDF-dokumenteistasi ja saa vastaukset lähdeviitteineen ja dokumenttien kuvineen niin, että kaikki dokumentit, upotukset ja kehotteet pysyvät omalla laitteistollasi. Kielimallin voi vaihtaa kesken käytön suoraan käyttöliittymästä, ja järjestelmä hoitaa mallin purun ja latauksen LM Studiossa puolestasi.

> **"Tietosuoja on suurin yksittäinen este tekoälyn käyttöönotolle yrityksissä Euroopassa ja Suomessa."**
> Yritysten on hallittava, suojattava ja omistettava datansa täysin itse. **Local RAG Engine** vastaa tähän haasteeseen: se on täysin paikallinen RAG-alusta (Retrieval-Augmented Generation) ilman pilvirajapintoja, telemetriaa tai internetyhteyden tarvetta ajon aikana.

## 🎯 Miksi paikallinen RAG?

Yritysten dokumentit sisältävät usein tietoa, jota ei voi lähettää ulkopuolisiin tekoälypalveluihin: sopimuksia, potilastietoja, talousraportteja, lähdekoodia ja sisäisiä ohjeistuksia.

Riski ei ole teoreettinen. Samsung kielsi työntekijöiltään ChatGPT:n käytön vuonna 2023 sen jälkeen, kun sisäistä lähdekoodia oli ladattu palveluun. Ciscon vuoden 2024 tutkimuksessa puolestaan 27 % organisaatioista kertoi rajoittaneensa generatiivisen tekoälyn käyttöä tietosuoja- ja tietoturvasyistä [1][2].

**Local RAG Engine ratkaisee tämän ongelman pitämällä koko tiedonkäsittelyketjun organisaation omassa hallinnassa.**

PDF-dokumentit käsitellään paikallisesti, niiden sisältö indeksoidaan Qdrantiin ja paikallinen kielimalli muodostaa vastaukset haettujen dokumenttiosumien perusteella. Käyttäjä saa vastaukset lähdeviitteineen ilman, että dokumentteja tarvitsee lähettää kaupalliseen pilvipalveluun.

Ratkaisu soveltuu erityisesti ympäristöihin, joissa tietojen sijainti, salassapito ja infrastruktuurin hallinta ovat keskeisiä vaatimuksia.

## ✨ Miksi paikallinen tekoäly on ajankohtainen?

Paikallisen tekoälyn kehitystä tukee kolme merkittävää muutosta.

**1. Tietosuoja ja datan hallinta**

Euroopan tietosuojaneuvoston joulukuussa 2024 julkaisema lausunto käsittelee tekoälymallien ja GDPR:n suhdetta. Se korostaa, ettei tekoälyn käyttö poista henkilötietojen käsittelyyn liittyviä velvoitteita [3].

Myös suomalaisessa julkisen sektorin keskustelussa on nostettu esiin mahdollisuus hyödyntää paikallisia tekoälyratkaisuja kaupallisten pilvipalveluiden rinnalla. Erityisesti arkaluonteisen tiedon käsittely voi edellyttää omassa hallinnassa olevaa infrastruktuuria [5].

Paikallinen ratkaisu ei kuitenkaan automaattisesti takaa tietosuojaa. Myös verkkoyhteydet, telemetria, ohjelmistojen asetukset ja käyttöoikeudet on tarkistettava [4].

**2. Pienemmät kielimallit ovat kehittyneet**

Kaikkiin tehtäviin ei tarvita suurinta mahdollista kielimallia. Gartner ennusti vuonna 2025, että organisaatiot käyttäisivät vuoteen 2027 mennessä pieniä, tehtäväkohtaisia malleja kolme kertaa enemmän kuin yleiskäyttöisiä suuria kielimalleja [6].

Tämä on tärkeää paikallisessa RAG-järjestelmässä: dokumenttien hakeminen, tiivistäminen ja kysymyksiin vastaaminen voidaan toteuttaa myös paikallisesti ajettavilla malleilla.

**3. Yritykset haluavat enemmän hallintaa tekoälyinfrastruktuuriinsa**

Broadcomin vuoden 2026 Private Cloud Outlook -raportissa 56 % yrityksistä ilmoitti ajavansa tai suunnittelevansa ajavansa tuotantokäytön tekoälypäättelyä yksityisessä pilvessä [10].

Schneider Electricin ja Omdian marraskuussa 2026 julkaisemassa tutkimuksessa 55 % vastaajista suosi yrityksen omistamaa, omissa tiloissa olevaa tekoälyinfrastruktuuria. Tietosuoja ja tietoturva olivat tärkeimpiä perusteluja [11].

Luvut eivät tarkoita, että kaikki tekoäly pitäisi siirtää paikalliseksi. Ne kuitenkin osoittavat, että oman infrastruktuurin merkitys kasvaa.

## ⚖️ Paikallisen tekoälyn rajat

Paikallinen ratkaisu ei ole automaattisesti paras vaihtoehto jokaiseen käyttötarkoitukseen.

- **Laitteistovaatimukset:** Suuremmat kielimallit tarvitsevat huomattavasti RAM-muistia ja GPU-muistia. Pienempi malli voi olla käytännöllisempi vaihtoehto.
- **Mallien suorituskyky:** Avoimet mallit ovat kehittyneet nopeasti, mutta parhaat suljetut mallit voivat edelleen olla tietyissä tehtävissä parempia [8].
- **Ylläpito:** Organisaatio vastaa itse mallien, tietokantojen, käyttöoikeuksien ja infrastruktuurin ylläpidosta.
- **Pilven ja paikallisen yhdistäminen:** Kaikkea tekoälykuormaa ei tarvitse ajaa paikallisesti. Arkaluonteiset dokumentit voidaan käsitellä omassa ympäristössä ja muut tehtävät tarvittaessa pilvessä.

Googlen vuonna 2026 esittelemät paikallisesti ajettavat Gemma-mallit osoittavat myös, kuinka paikallisen tekoälyn käyttömahdollisuudet laajenevat tavallisiin tietokoneisiin [12].

**Local RAG Engine keskittyy yhteen selkeään käyttötarkoitukseen: organisaation omien dokumenttien turvalliseen, lähteistettyyn ja paikalliseen tekoälyavusteiseen käsittelyyn.**

Seuraavaksi katsotaan, miten tämä toteutetaan käytännössä.

---

## ✨ Ominaisuudet

- 🛡️ **Paikallinen ensin:** upotukset, haku ja LLM-päättely toimivat omalla koneellasi tai yksityisellä palvelimellasi. Kun kontit on rakennettu, internetyhteyttä ei tarvita.
- 🔍 **Hybridihaku:** tiheät upotukset (`bge-m3` LM Studion kautta) yhdistettynä harvaan BM25-avainsanahakuun (`fastembed`) Qdrantissa. Monikielinen: suomenkieliset, englanninkieliset ja ruotsinkieliset dokumentit.
- ⚡ **Vastausten suoratoisto SSE:llä:** lähteet saapuvat ensin, sitten tokenit ja lopuksi jatkokysymykset. Päättelymallit toimivat, koska `<think>...</think>`-lohkot poistetaan palvelimella (`STRIP_THINK`).
- 🔀 **Mallinvaihto kesken käytön:** syöttökentän mallipainikkeesta valitaan LM Studiossa saatavilla oleva kielimalli. Backend purkaa ladatun keskustelumallin muistista ja lataa valitun tilalle, jotta GPU-muisti riittää. Upotusmalli säilyy aina ladattuna. Katso [Mallinvaihto](#-mallinvaihto-unload-ja-load-lm-studiossa).
- 🖼️ **Kuvat vastauksissa:** PDF-tiedostoista poimitaan sivut ja upotetut kuvat, ja vastauksen yhteydessä näytetään aiheeseen liittyviä kuvia lähdeviitteineen. Kuvan voi avata suurennettuna ja selata nuolinäppäimillä. Katso kohta *Kuvat vastauksissa*.
- ➡️ **Jatkokysymykset jokaisen vastauksen jälkeen:** LLM ehdottaa kolme suomenkielistä jatkokysymystä, jotka eivät toista keskustelun aiempia kysymyksiä. Ehdotuksen voi lähettää yhdellä klikkauksella.
- 🗂️ **Keskusteluhistoria:** jokainen keskustelu säilyttää viestit, lähteet, kuvat ja dokumentit. Aiemmat keskustelut voi avata sivupalkista, ja ne säilyvät uudelleenkäynnistyksissä. Aktiivinen keskustelu muistetaan osoitteessa (`?c=<id>`), joten sivun voi ladata uudelleen samaan keskusteluun.
- ✏️ **Keskustelujen hallinta:** keskustelun voi nimetä uudelleen, kiinnittää listan alkuun, arkistoida tai poistaa. Toiminnot vahvistetaan modaali-ikkunalla, ja otsikot muodostuvat aluksi automaattisesti dokumentin nimestä ja ensimmäisestä kysymyksestä.
- 🏷️ **Eristetyt keskustelukontekstit:** jokainen keskustelu omistaa omat PDF-tiedostonsa. Haku rajataan Qdrantissa `conversation_id`:llä, joten dokumentit eivät vuoda keskustelusta toiseen.
- 📎 **Liitteet syöttökentästä:** PDF-tiedostoja voi liittää syöttökentän klemmaripainikkeesta, useita kerrallaan, tai vetämällä ne keskusteluikkunaan. Oikean reunan paneeli listaa keskustelun dokumentit.
- 💬 **Ehdotetut kysymykset:** latauksen jälkeen LLM luo muutaman esimerkkikysymyksen dokumentin kielellä. "Yhteenveto"-oikotie on aina käytettävissä.
- 📑 **Rikas Markdown-esitys:** otsikot, listat, lihavoinnit, GitHub-tyyliset taulukot (vaakasuunnassa vieritettävässä kontissa) sekä klikattavat `[n]`-viitteet laajennettavine lähdeotteineen.
- 📊 **Admin-lokinäkymä:** tarkastele hakuviiveitä, pistemääriä ja aiempien kyselyjen tarkkoja lähteitä. Avaa mikä tahansa lokirivi nähdäksesi koko vastauksen tai siirtyäksesi sen keskusteluun.
- 🔔 **Selkeä palaute:** ilmoitukset (toast) lataukselle, mallinvaihdolle, nimeämiselle ja virheille. Mallinvaihdon aikana kysymysten lähetys on estetty.
- 🎨 **Tumma käyttöliittymä ja typografia:** `Instrument Serif` -otsikkofontti, `Inter Variable` -leipä- ja käyttöliittymäfontti, `JetBrains Mono` -koodifontti sekä korkearesoluutioisille näytöille (kuten 1440p) skaalattu leipäteksti, lähderivit ja jatkokysymykset. Sivupalkit voi tiivistää.
- 🖱️ **Hallittu vedä ja pudota -pudotusnäkymä ja latauspalaute:** sisäkkäisten raahaustapahtumien laskenta (`dragDepthRef`), `0.5` sekunnin häivytys (`fade in` ja `fade out`), oikean yläkulman `X`-sulkupainike sekä selkeät lataus- ja vieritystilat.

![Projektin kuvakaappaus](/images/rag.png)
> Kuvakaappaus: Käyttöliittymän toiminnallisuuden esittely. Kieli on tällä hetkellä suomeksi.

---

## 🔀 Mallinvaihto: unload ja load LM Studiossa

Paikallisen koneen GPU-muisti on rajallinen, joten kaksi isoa keskustelumallia ei yleensä mahdu muistiin yhtä aikaa. Siksi mallin vaihto tehdään kahdessa vaiheessa: ensin vanha malli puretaan muistista (*unload*) ja sitten uusi ladataan (*load*). Käyttäjän ei tarvitse avata LM Studiota.

**Käyttäjän näkökulma**

1. Avaa syöttökentän oikean reunan mallipainike. Lista näyttää LM Studiosta löytyvät keskustelumallit (upotusmallit on suodatettu pois).
2. Valitse malli. Vahvistusikkuna kysyy, haluatko vaihtaa siihen, ja kertoo että uusi malli otetaan käyttöön seuraavissa kysymyksissä.
3. Vahvistuksen jälkeen näkyy ilmoitus "Ladataan mallia ...". Latauksen ajan kysymysten lähetys on estetty, ja valmistuttua näkyy "Malli vaihdettu".
4. Valinta tallentuu selaimeen ja lähetetään jokaisen kysymyksen mukana (`model`), joten se säilyy sivun uudelleenlatauksessa.

**Mitä taustalla tapahtuu** (`POST /api/models/select`)

```text
Selain ──► POST /api/models/select  { "model": "<uusi>", "unload_existing": true }
              │
Backend       ├─ 1. GET  {LM Studio}/api/v1/models
              │       → mallit ja niiden loaded_instances
              ├─ 2. jokaiselle ladatulle instanssille, joka EI ole
              │       a) kohdemalli eikä
              │       b) upotusmalli:
              │       POST {LM Studio}/api/v1/models/unload  { "instance_id": "<id>" }
              ├─ 3. POST {LM Studio}/api/v1/models/load     { "model": "<uusi>" }
              │       (odottaa jopa 300 s, koska suuren mallin lataus kestää)
              └─ 4. vastaus: { status, model, unloaded: [...], load_response }
Selain ◄── päivittää mallilistan (/api/models) ja tilan (/api/health)
```

Tärkeimmät periaatteet:

- **Upotusmallia ei koskaan pureta.** Haku ja dokumenttien käsittely tarvitsevat sitä, joten backend tunnistaa sen kahdella tavalla: nimi vastaa asetusta `EMBED_MODEL`, tai nimi sisältää tyypillisen upotusmallin tunnisteen (`embed`, `bge-`, `e5-`, `gte-`, `nomic-embed`, `minilm`, `snowflake-arctic-embed`, `mxbai-embed`). Tämän ansiosta haku toimii mallinvaihdon jälkeenkin.
- **Hallintarajapinta on eri kuin OpenAI-yhteensopiva rajapinta.** Chat ja upotukset kulkevat osoitteen `LLM_BASE_URL` (`.../v1`) kautta, mutta unload ja load käyttävät LM Studion hallintapäätepisteitä (`/api/v1/models/...`). Hallinnan osoite johdetaan `LLM_BASE_URL`:sta poistamalla `/v1`, tai se voidaan asettaa erikseen muuttujalla `LM_STUDIO_BASE_URL`. LM Studion version on tuettava näitä päätepisteitä.
- **Virheet välitetään käyttäjälle.** Jos LM Studio palauttaa virheen (esimerkiksi mallia ei löydy tai muisti loppuu), backend välittää sen käyttöliittymään ilmoituksena, ja mallilista päivitetään.
- **Malli vaikuttaa vain vastauksiin.** Vastaus ja jatkokysymykset tuotetaan valitulla mallilla. Dokumentin latauksen jälkeiset esimerkkikysymykset käyttävät oletusmallia (`LLM_MODEL`).
- **Lista elää LM Studion mukana.** `GET /api/models` hakee mallit LM Studiosta. Jos LM Studiota ei tavoiteta, lista sisältää ainakin oletusmallin.

---

## 🖼️ Kuvat vastauksissa

Moni PDF kertoo olennaisen kuvissa, kaavioissa ja piirroksissa. Siksi järjestelmä ei käsittele vain tekstiä: se tallentaa myös dokumenttien visuaalisen sisällön ja näyttää sen vastauksen yhteydessä.

**Latauksen aikana** (`pdf_media.py`, PyMuPDF)

- Jokainen PDF-sivu renderöidään PNG-kuvaksi (150 dpi).
- Sivuilta poimitaan upotetut kuvat. Liian pienet kuvat (alle 140 px) ja ohuet viivat tai palkit suodatetaan pois.
- Jokaiselle kuvalle tallennetaan sijainti sivulla ja sen lähellä oleva teksti, jonka avulla kuva voidaan yhdistää aiheeseen.
- Sisällysluettelo-, kansi- ja takakansisivut tunnistetaan heuristiikoilla ja jätetään kuvavalinnan ulkopuolelle.
- Tiedostot tallentuvat kansioon `MEDIA_DIR/<doc_id>/` ja tarjoillaan osoitteesta `/api/media/...`. Dokumentin poisto poistaa myös sen kuvat.

**Kysyttäessä**

- Jokaiselle lähteelle voidaan valita kuva sivun upotetuista kuvista vertaamalla kysymystä ja lähdepätkän tekstiä kuvan lähitekstiin.
- Kuvia haetaan vain riittävän vahvoille osumille (`MIN_SPECIFIC_IMAGE_SCORE`, oletus `0.50`). Listamaisissa kysymyksissä ("listaa ...") kuvia voi tulla usealle lähteelle, mutta samaa kuvaa ei käytetä kahdesti samassa vastauksessa.
- Käyttöliittymä suodattaa pois kansikuvat, verkko-osoitteita sisältävät kuvat ja rikkinäiset kuvat.

**Käyttöliittymässä**

- Kuvat näytetään vastauksen yhteydessä, ja jokaisen kuvan lähde ja sivunumero ovat nähtävissä.
- Kuvaa klikkaamalla avautuu suurennettu näkymä. Nuolinäppäimet selaavat saman vastauksen kuvia ja `Esc` sulkee näkymän.

**Rajoitukset**

- Kuva valitaan sanatason täsmäyksellä kuvan ympärillä olevaan tekstiin, ei kuvan sisällön perusteella. Jos sivun teksti ei mainitse kuvan aihetta, osuma voi jäädä löytymättä tai olla epätarkka.
- Vektoripiirrokset eivät ole upotettuja kuvia, joten niitä ei voi poimia erikseen. Ne näkyvät vain sivun renderöinnissä.

---

## 💡 Keskeiset käyttötapaukset

## UC-1: Juridiikka ja sopimushallinta (Legal & Compliance)

### Ongelma
Asianajotoimistot ja yritysten lakiosastot käsittelevät päivittäin valtavia määriä luottamuksellisia sopimuksia ja oikeudellisia ennakkotapauksia. Julkisten tekoälypalveluiden käyttö on kielletty salassapitosopimusten ja GDPR:n vuoksi.

### Ratkaisu
Lakitiimi lataa tuhansia sisäisiä sopimuspohjia ja asiakirjoja järjestelmään. Hybridihaku löytää tarkat sopimuslausekkeet jopa monimutkaisesta juridisesta terminologiasta, ja paikallinen kielimalli tiivistää tai vertailee ehtoja reaaliajassa. Raskaampaa päättelyä vaativiin vertailuihin voi vaihtaa isomman mallin käyttöliittymästä ja palata kevyempään malliin nopeaan tiedonhakuun.

### Hyöty
Merkittävä ajansäästö sopimusten tarkastuksessa ja riskienhallinnassa ilman minkäänlaista riskiä asiakastietojen tai salassapidettävän materiaalin vuotamisesta ulkopuolisille.

---

## UC-2: Terveydenhuolto ja lääketieteellinen tutkimus (Healthcare & Clinical Documentation)

### Ongelma
Sairaalat ja tutkimuslaitokset omistavat herkkää potilastietoa sekä laajoja sisäisiä hoito-ohjeita ja lääketieteellisiä tutkimuksia. Tietosuoja (esim. EU:n tietosuoja-asetus ja potilastietojen salassapito) estää tietojen lähettämisen pilvipohjaisiin tekoälyihin.

### Ratkaisu
Järjestelmä asennetaan sairaalan omaan suljettuun verkkoon. Lääkärit ja tutkijat voivat kysyä monimutkaisia kysymyksiä sisäisistä hoitoprotokollasta ja tutkimuspapereista. Järjestelmä hakee tiedot ja antaa vastauksen suorilla lähdeviitteillä alkuperäisiin dokumentteihin. Ohjeiden kaaviot ja kuvat tulevat vastauksen mukana, joten lukijan ei tarvitse etsiä niitä käsin.

### Hyöty
Nopea ja luotettava tiedonhaku kriittisissä tilanteissa täydellisellä tietosuojalla, mikä tehostaa kliinistä työtä säädöksiä rikkomatta.

---

## UC-3: Taloushallinto ja tilintarkastus (Finance & Auditing)

### Ongelma
Tilintarkastajat ja yritysten talousosastot käyvät läpi laajoja tilinpäätöksiä, dokumentteja, sisäisiä tarkastusjälkiä ja budjettiraportteja, jotka sisältävät tarkasti varjeltuja liikesalaisuuksia.

### Ratkaisu
Talousosasto syöttää tilikauden raportit paikalliseen moottoriin. Hybridihaku (Dense + BM25) kykenee poimimaan tarkat luvut, kirjaukset ja poikkeamat suuristakin dokumenttimassoista. Paikallinen malli analysoi lukuja ilman pelkoa taloustietojen päätymisestä kolmansien osapuolten haltuun. Jatkokysymysehdotukset auttavat etenemään analyysissa seuraavaan poikkeamaan tai tilikauden vertailuun.

### Hyöty
Virheettömämpi ja nopeampi taloudellinen analyysi sekä tarkastusten valmistelu ilman ulkoisia API-kustannuksia tai tietovuotoriskejä.

---

## UC-4: Julkinen sektori ja turvaluokitellut ympäristöt (Public Sector & Air-Gapped Environments)

### Ongelma
Puolustusvoimat, viranomaiset ja kriittinen infrastruktuuri toimivat ympäristöissä, joissa ei saa olla minkäänlaista internetyhteyttä (air-gapped), mutta sisäisen tiedon määrä ja sen hallinnan tarve kasvaa jatkuvasti.

### Ratkaisu
Koko järjestelmä (FastAPI, Qdrant, React-käyttöliittymä ja paikallinen LLM) pyörii täysin eristetyssä laitteistossa ilman ulkoverkkoyhteyttä. Virkamiehet voivat hakea tietoa sisäisistä ohjeistuksista, laeista ja operaatiodokumenteista turvallisesti.

### Hyöty
Mahdollistaa modernin tekoälyavusteisen tiedonhaun ja päätöksenteon myös täysin suljetuissa ja korkean turvatason verkkoympäristöissä.

---

## UC-5: Tekniset käsikirjat ja huolto-ohjeet (Technical Documentation)

### Ongelma
Valmistavan teollisuuden ja huoltoyritysten käsikirjat ovat satojen sivujen PDF-tiedostoja, joissa olennainen on usein kuvassa: kokoonpanopiirros, kytkentäkaavio tai varaosakuva. Pelkkä tekstihaku löytää kohdan, mutta kuva jää etsittäväksi käsin.

### Ratkaisu
Käsikirjat ladataan paikalliseen järjestelmään. Kysymykseen saadaan vastaus lähdeviitteineen, ja vastauksen yhteydessä näytetään sivun kuvat, jotka voi avata suurennettuina ja joiden lähdesivun numero näkyy suoraan. Jos mallilta puuttuu tarvittava kyvykkyys, sen voi vaihtaa käyttöliittymästä kesken keskustelun.

### Hyöty
Nopeampi vianetsintä ja huolto, kun teksti ja kuvat löytyvät samasta vastauksesta eikä tietoa tarvitse kaivaa useasta tiedostosta.

---

## 🛠️ Arkkitehtuuri

```text
┌───────────────────────────────────────────────────────────────┐
│                           SELAIN                              │
│     React + TypeScript + Tailwind CSS (Nginx tarjoilee)       │
└───────────────────────────────┬───────────────────────────────┘
                                │ HTTP / SSE-virta  (/api/*)
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                       FASTAPI-BACKEND                         │
│  Keskustelut · ingestio · haku · suoratoisto · lokit          │
│  Kuvat (PyMuPDF, /api/media) · mallinvaihto                   │
│  Tilatiedosto (state.json): dokumentit + keskustelut          │
└───────────────┬───────────────────────────────┬───────────────┘
                │ tiheä + harva haku            │ chat + upotukset
                ▼                               │ + mallin lataus/purku
┌───────────────────────────┐                   ▼
│          QDRANT           │   ┌───────────────────────────────┐
│  Vektori + BM25-hybridi-  │   │          LM STUDIO            │
│  indeksi (Docker)         │   │  OpenAI-yhteensopiva palvelin │
└───────────────────────────┘   │  isäntäkoneella + hallinta-   │
                                │  rajapinta (/api/v1/models)   │
                                └───────────────────────────────┘
```

**Datavirta**

- **Lataus:** PDF → API (`202 Accepted`) → ingestio taustalla → teksti pilkotaan, sivut renderöidään ja upotetut kuvat poimitaan (PyMuPDF) → tiheä upotus (LM Studio) + harva BM25 (fastembed) → Qdrant, merkittynä tunnisteilla `doc_id` ja `conversation_id`. Lopuksi LLM luo ehdotetut kysymykset.
- **Kysely:** kysymys + `conversation_id` (+ valittu `model`) → hybridihaku rajattuna kyseisen keskustelun dokumentteihin → numeroitu kontekstikehote → LM Studio → SSE-virta (lähteet, tokenit, valmis, jatkokysymykset). Lähteille valitaan kuvat, ja vuorovaikutus tallennetaan keskusteluhistoriaan.
- **Mallinvaihto:** valittu malli → backend purkaa ladatut keskustelumallit (ei upotusmallia) → lataa valitun mallin LM Studioon → selain päivittää mallilistan ja tilan.

**Teknologiat**

| Kerros | Teknologia |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Lucide-ikonit, `react-markdown` + `remark-gfm`, Framer Motion |
| Backend | Python, FastAPI, LlamaIndex, Uvicorn, httpx |
| Kuvat | PyMuPDF (sivujen renderöinti ja upotettujen kuvien poiminta) |
| Vektoritietokanta | Qdrant (Docker) |
| Harva indeksi | FastEmbed BM25 (malli sisällytetty konttikuvaan) |
| LLM / upotukset | LM Studio tai mikä tahansa OpenAI-yhteensopiva palvelin (vLLM, llama.cpp server, ...). Mallinvaihto (unload/load) vaatii LM Studion hallintarajapinnan |
| Käyttöönotto | Docker Compose, Nginx-käänteisproxy (SSE-puskurointi pois päältä) |

---

## 🚀 Pika-aloitus

### Vaatimukset

1. **Docker** ja **Docker Compose**.
2. **LM Studio** käynnissä isäntäkoneella:
   - Lataa upotusmalli, esim. `text-embedding-bge-m3`.
   - Lataa vähintään yksi keskustelumalli, esim. Qwen 2.5 Instruct -malli. Muut LM Studion listaamat keskustelumallit ilmestyvät käyttöliittymän mallilistaan, ja backend lataa valitun mallin tarvittaessa.
   - Käynnistä paikallinen palvelin (oletuksena `http://localhost:1234/v1`).

   Linuxissa varmista, että LM Studion palvelin on tavoitettavissa Docker-konteista (ei sidottu pelkästään osoitteeseen `127.0.0.1`). Compose-tiedosto yhdistää `host.docker.internal`-nimen isäntäkoneeseen.

### Käynnistys Docker Composella

```bash
git clone https://github.com/your-username/local-rag-engine.git
cd local-rag-engine

# Tarkista backend-palvelun environment-osio tiedostossa docker-compose.yml
# (LLM_BASE_URL, LLM_MODEL, EMBED_MODEL) ja muokkaa se LM Studio -asetuksiisi sopivaksi.

docker compose up -d --build
```

Avaa **http://localhost:3000**. Qdrantin hallintapaneeli on osoitteessa http://localhost:6333/dashboard ja API osoitteessa http://localhost:8000/docs.

Luo keskustelu lataamalla PDF tai esittämällä kysymys, ja kysy sitten dokumentista.

### Paikallinen kehitys (sovellus ilman Dockeria)

```bash
# 1. Qdrant
docker compose up -d qdrant

# 2. Backend (Python 3.11+)
cd backend
pip install -r requirements.txt
QDRANT_URL=http://localhost:6333 UPLOAD_DIR=./data/uploads \
  uvicorn app:app --reload --port 8000

# 3. Frontend
cd frontend
npm install
npm run dev        # http://localhost:5173, /api ohjataan porttiin 8000
```

---

## ⚙️ Asetukset

Backendin asetukset ovat ympäristömuuttujia (aseta ne tiedostossa `docker-compose.yml`). Frontendillä on yksi käännösaikainen asetus.

| Muuttuja | Oletus | Kuvaus |
|---|---|---|
| `LLM_BASE_URL` | `http://host.docker.internal:1234/v1` | OpenAI-yhteensopiva rajapinta chatille ja upotuksille |
| `LM_STUDIO_BASE_URL` | johdetaan `LLM_BASE_URL`:sta | Valinnainen: LM Studion hallintarajapinnan osoite mallin purkuun ja lataukseen. Jos tyhjä, käytetään `LLM_BASE_URL` ilman `/v1`-päätettä |
| `LLM_API_KEY` | `lm-studio` | Rajapinnalle lähetettävä API-avain (LM Studiolle käy mikä tahansa) |
| `LLM_MODEL` | `local-model` | Oletuskeskustelumalli (käytetään, kun käyttäjä ei ole valinnut mallia, sekä dokumenttien esimerkkikysymyksiin) |
| `EMBED_MODEL` | `text-embedding-bge-m3` | Upotusmallin tunniste. Sitä ei koskaan pureta mallinvaihdossa |
| `QDRANT_URL` | `http://qdrant:6333` | Qdrantin osoite |
| `COLLECTION` | `documents` | Qdrant-kokoelman nimi |
| `TOP_K`, `HYBRID_TOP_K` | `12`, `12` | Haettavien pätkien määrä (tiheä/harva haku sekä yhdistämisen jälkeen) |
| `MIN_SPECIFIC_IMAGE_SCORE` | `0.50` | Pistekynnys, jonka ylittäville lähteille haetaan kuva |
| `TEMPERATURE` | `0.1` | LLM:n lämpötila |
| `STRIP_THINK` | `true` | Poista `<think>`-lohkot suoratoistetuista vastauksista |
| `UPLOAD_DIR` | `/data/uploads` | Ladattujen PDF-tiedostojen sijainti |
| `MEDIA_DIR` | `<UPLOAD_DIR>/images` | PDF-tiedostoista poimittujen sivu- ja dokumenttikuvien sijainti |
| `STATE_PATH` | `<UPLOAD_DIR>/state.json` | Tallennetut dokumentit ja keskustelut |
| `MAX_LOG_ENTRIES` | `500` | Muistissa säilytettävien hakulokien määrä |

Data tallentuu kahteen Docker-volumeen: `qdrant_data` (vektorit) sekä `rag_data` (PDF-tiedostot, kuvat ja `state.json`).

---

## 📡 API-yleiskatsaus

| Rajapinta | Metodi | Tarkoitus |
|---|---|---|
| `/api/conversations` | `POST` / `GET` | Luo keskustelu / listaa keskustelut (uusin ensin) |
| `/api/conversations/{id}` | `GET` / `DELETE` | Hae keskustelu viesteineen ja dokumentteineen / poista se dokumentteineen, tiedostoineen, kuvineen ja vektoreineen |
| `/api/conversations/{id}/documents` | `POST` / `GET` | Lataa PDF (asynkroninen ingestio, `202`) / listaa keskustelun dokumentit ja niiden tila |
| `/api/documents/{doc_id}` | `DELETE` | Poista yksi dokumentti (tiedosto, kuvat, vektorit, tilamerkintä) |
| `/api/models` | `GET` | Listaa LM Studion keskustelumallit (upotusmallit suodatettu pois) ja oletusmalli |
| `/api/models/select` | `POST` | Vaihda malli: `{ "model": "...", "unload_existing": true }`. Purkaa ladatut keskustelumallit ja lataa valitun |
| `/api/media/{doc_id}/{tiedosto}` | `GET` | Dokumenttien sivu- ja kuvatiedostot (staattinen) |
| `/api/query` | `POST` | Hybridihaku keskustelun dokumenteista, suoratoisto SSE:llä. Runko: `question`, `conversation_id`, valinnainen `model`. Tapahtumat: `sources`, `token`, `done`, `followups`, `error` |
| `/api/admin/search-logs` | `GET` | Viimeiset 100 kyselyä: pistemäärät, hakuviive |
| `/api/admin/search-logs/{id}` | `GET` | Koko lokirivi: kysymys, vastaus, lähteet, ajat |
| `/api/health` | `GET` | Mallien nimet, LLM:n osoite, dokumenttien määrä |

Keskustelun nimeäminen uudelleen, kiinnitys ja arkistointi tallentuvat toistaiseksi selaimen `localStorage`-tallennustilaan, koska keskustelun muokkaukselle ei vielä ole omaa rajapintaa (katso tiekartta).

FastAPI tarjoaa interaktiivisen API-dokumentaation osoitteessa `/docs` portissa 8000.

---

## 🛡️ Tietoturvaraja ja tuotantokäyttö

- **Verkkoraja:** Qdrant ja backend keskustelevat vain Dockerin sisäisessä verkossa, ja backend kutsuu vain paikallista LM Studio -palvelinta. Internetyhteyttä ei tarvita kuvien rakentamisen jälkeen.
- **Ei autentikointia vielä:** kaikki rajapinnat, myös `/api/admin/*`, ovat avoimia. Hakulokit ja keskusteluhistoria sisältävät dokumenttien tekstiä ja kokonaisia vastauksia. Luotetun verkon ulkopuolella sovelluksen eteen kannattaa laittaa autentikointiproxy (esim. OAuth2-Proxy tai Authelia) tai lisätä rajapintaan pääsynhallinta.
- **Mallinvaihto on arkaluonteinen toiminto:** `POST /api/models/select` voi purkaa ja ladata malleja isäntäkoneen LM Studiossa, eikä sillä ole pääsynhallintaa. Rajaa pääsy samaan autentikointiproxyyn kuin muutkin rajapinnat ja pidä LM Studion hallintarajapinta vain luotetussa verkossa.
- **Tilan tallennus:** dokumentit ja keskustelut ovat yhdessä JSON-tiedostossa, ja hakulokit ovat muistissa. Tämä riittää yhden käyttäjän käyttöön; monen käyttäjän ympäristöön tarvitaan tietokanta.
- **Ingestio taustalla:** se ajetaan samassa prosessissa eikä säily uudelleenkäynnistyksen yli (keskeytyneet lataukset merkitään epäonnistuneiksi). Tuotannossa käytä työjonoa, kuten Celery + Redis.

---

## 🛣️ Tiekartta

- [ ] Siirrä tila tiedostosta `state.json` PostgreSQL:ään tai SQLiteen ja tallenna hakulokit pysyvästi
- [ ] Keskustelun muokkausrajapinta (`PATCH /api/conversations/{id}`): nimeäminen, kiinnitys ja arkistointi palvelimelle, jotta ne seuraavat käyttäjää laitteelta toiselle
- [ ] Monivuoroinen muisti: lähetä viimeisimmät vuorot LLM:lle ja kirjoita jatkokysymykset itsenäisiksi hakukyselyiksi (nyt aiempia kysymyksiä käytetään vain jatkokysymysehdotusten toiston välttämiseen)
- [ ] Parempi kuvavalinta: valitse kuva kuvan sisällön perusteella (esim. visiomallin tuottama kuvaus tai visuaalinen upotus) pelkän lähitekstin sijaan, ja poimi myös vektorikuviot
- [ ] Cross-encoder-uudelleenjärjestys (esim. `bge-reranker`) hybridihaun parhaille osumille
- [ ] PDF-katselin siteeratulle sivulle (`[n]`-viitteet ovat jo klikattavia)
- [ ] Dokumentin uudelleenkäyttö useassa keskustelussa
- [ ] Autentikointi ja roolipohjainen käyttöoikeuksien hallinta (RBAC) dokumenttikohtaisin oikeuksin, mukaan lukien mallinvaihdon rajaus
- [ ] Arviointiaineisto (50 kysymys–vastaus-paria) hakutarkkuuden ja vastausten uskollisuuden mittaamiseen
- [ ] Pistekynnys, jotta heikko konteksti johtaa vastaukseen "En tiedä"

---

## Lähteet

Verkkosivut tarkistettu 27.11.2026. Viitenumerot ovat tekstissä esiintymisjärjestyksessä.

[1] **Fortune — Samsung kieltää ChatGPT:n käytön työssä lähdekoodivuodon jälkeen (2.5.2023)**
https://fortune.com/2023/05/02/samsung-bans-employee-use-chatgpt-data-leak/

[2] **Cisco Newsroom — Cisco 2024 Data Privacy Benchmark Study (25.1.2024)**
https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2024/m01/organizations-ban-use-of-generative-ai-over-data-privacy-security-cisco-study.html

[3] **Euroopan tietosuojaneuvosto (EDPB) — lausunto tekoälymalleista ja GDPR:stä (18.12.2024)**
https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en

[4] **MTV Uutiset — Tekoälytietokoneet yleistyvät, selvitä tietosuoja-asetukset ennen käyttöä**
https://www.mtvuutiset.fi/artikkeli/tekoalytietokoneet-yleistyvat-kovaa-vauhtia-selvita-nama-tietosuoja-asetukset-ennen-kayttoa/9210982

[5] **CGI Suomi — Julkisen sektorin tekoälystrategia: onko pilvi ainoa vaihtoehto? (20.3.2025)**
https://www.cgi.com/fi/fi/blogi/julkisen-sektorin-tekoalystrategia-onko-pilvi-ainoa-vaihtoehto

[6] **Gartner — Gartner Predicts by 2027, Organizations Will Use Small, Task-Specific AI Models Three Times More Than General-Purpose LLMs (9.4.2025)**
https://www.gartner.com/en/newsroom/press-releases/2025-04-09-gartner-predicts-by-2027-organizations-will-use-small-task-specific-models-three-times-more-than-general-purpose-large-language-models

[7] **NVIDIA Research — Small Language Models are the Future of Agentic AI (arXiv:2506.02153, kesäkuu 2025)**  
https://arxiv.org/abs/2506.02153

[8] **Stanford HAI — AI Index Report 2025, Technical Performance**
https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance

[10] **Broadcom — Private Cloud Outlook 2026 (9.6.2026)**
https://news.broadcom.com/releases/broadcom-private-cloud-outlook-2026

[11] **New Civil Engineer — Enterprises favour on-premises AI as sovereignty and compliance concerns grow (23.11.2026)**
https://www.newcivilengineer.com/latest/enterprises-favour-on-premises-ai-as-sovereignty-and-compliance-concerns-grow-23-11-2026/

[12] **InfoWorld — Google brings local AI agents to laptops with Gemma 4 12B (4.6.2026)**
https://www.infoworld.com/article/4181175/google-brings-local-ai-agents-to-laptops-with-gemma-4-12b.html

---

## 📄 Lisenssi

Tämä projekti on lisensoitu MIT-lisenssillä. Katso [LICENSE](LICENSE).