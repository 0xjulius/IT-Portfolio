# Local RAG (Retrieval-Augmented Generation) Engine

RAG (Retrieval-Augmented Generation) on arkkitehtuuri, jossa paikallinen kielimalli (LLM) hakee reaaliaikaisesti faktoja yrityksen omista dokumenteista ja muodostaa vastauksen niiden pohjalta pelkän ulkoa opitun tiedon sijaan.

Järjestelmä on niin sanottu "Model-based reflex agent", joka käyttää reaaliaikaista dataa, tai tietoa luomaan vastauksia ja suorittaa olennaisia toimenpiteitä syötettyjen tietojen mukaan kunnioittaen etukäteen luotua "system prompt"-kehotetta.

Esitä kysymyksiä omista PDF-dokumenteistasi ja saa vastaukset lähdeviitteineen ja dokumenttien kuvineen niin, että kaikki dokumentit, upotukset ja kehotteet pysyvät omalla laitteistollasi. Kielimallin voi vaihtaa kesken käytön suoraan käyttöliittymästä, ja järjestelmä hoitaa mallin purun ja latauksen LM Studiossa puolestasi.

> **"Tietosuoja on suurin yksittäinen este tekoälyn käyttöönotolle yrityksissä Euroopassa ja Suomessa."**
> Yritysten on hallittava, suojattava ja omistettava datansa täysin itse. **Local RAG Engine** vastaa tähän haasteeseen: se on täysin paikallinen RAG-alusta (Retrieval-Augmented Generation) ilman pilvirajapintoja, telemetriaa tai internetyhteyden tarvetta ajon aikana.

## 🎯 Motivaatio: miksi paikallinen RAG?

Pilvipohjaiset LLM-rajapinnat ovat nopeita ottaa käyttöön, mutta eurooppalaiset yritykset, julkishallinto sekä juridiset ja rahoitusalan organisaatiot kohtaavat GDPR-velvoitteita, vaatimustenmukaisuuden haasteita ja IP-vuotojen riskejä, kun sisäisiä dokumentteja lähetetään ulkoisiin palveluihin.

Tämä projekti osoittaa, että **omaa dataa ei tarvitse lähettää kolmannen osapuolen palveluun, jotta voi rakentaa modernin tekoälyavustajan.** Paikallisilla malleilla, vektoritietokannalla ja hybridihaulla organisaatio pitää datansa omalla laitteistollaan tai yksityisessä infrastruktuurissaan.

---

## 🔭 Miksi paikallinen tekoäly on tulevaisuus – ja missä sen rajat ovat

Alle on koottu ulkopuolisia lähteitä, jotka tukevat paikallisen tekoälyn tarvetta. Viitenumerot (esim. [1]) vievät sivun lopun lähdeluetteloon. Mukana on myös vastaväitteitä, koska rehellinen kuva on hyödyllisempi kuin pelkkä mainos.

### Datan vuotaminen on todellinen riski

**Samsung 2023.** Yhtiön insinöörit latasivat sisäistä lähdekoodia ChatGPT:hen, minkä jälkeen Samsung kielsi työntekijöitä käyttämästä ChatGPT:n kaltaisia työkaluja työssään. Fortunen mukaan yksi työntekijä pyysi apua viallisen tietokannan korjaamiseen ja latasi samalla luottamuksellista koodia, ja toinen jakoi kokonaisen palaverin saadakseen siitä muistion. Samsung lupasi samalla rakentaa omat työkalut käännöksiin ja tiivistämiseen [1].

> Samsungin muistiossa todettiin: ”There are growing concerns about security risks presented by generative A.I.” [1]

**Cisco 2024.** Ciscon tietosuojatutkimukseen vastasi 2 600 tietosuoja- ja tietoturva-ammattilaista. Heistä 27 % oli kieltänyt generatiivisen tekoälyn käytön vähintään väliaikaisesti, 48 % myönsi syöttäneensä yrityksen ei-julkisia tietoja tekoälytyökaluihin ja 68 % pelkäsi tietojen päätyvän julkisuuteen tai kilpailijoille [2].

> Ciscon lakiasioista vastaava johtaja Dev Stahlkopf: ”Organizations see GenAI as a fundamentally different technology with novel challenges to consider” [2]

**Sääntely.** Euroopan tietosuojaneuvosto (EDPB) antoi joulukuussa 2024 lausunnon, joka käsittelee sitä, milloin tekoälymalli voi olla anonyymi, voiko oikeutettu etu toimia käsittelyperusteena ja mitä tapahtuu, jos malli on kehitetty laittomasti käsitellyillä henkilötiedoilla. Lausunnon mukaan laiton käsittely kehitysvaiheessa voi vaikuttaa mallin käyttöönoton lainmukaisuuteen, ellei mallia ole asianmukaisesti anonymisoitu [3]. Tämä on tämän projektin tulkinta, ei EDPB:n johtopäätös: kun data ja malli pysyvät omassa hallinnassa, käsittelyn perusteet ja sijainti on helpompi osoittaa.

**Suomalainen näkökulma.** CGI:n asiantuntijat muistuttavat, että tekoälyä voi hyödyntää myös ilman kaupallisia pilvipalveluita ja että erityisiä henkilö- tai terveystietoja käsiteltäessä ratkaisu voi olla tuotava paikallisiin konesaleihin. He suosittelevat kuitenkin yhdistämään kaupallisen pilven ja paikalliset ratkaisut parhaalla mahdollisella tavalla [5].

> CGI:n blogissa tiivistetään: ”Pilvipalvelut ovat hyödyllisiä tekoälymallien kouluttamiseen, mutta tuotantokäytössä sensitiivinen tieto voi vaatia paikallisia ratkaisuja.” [5]

**Varoitus: paikallinen ei aina tarkoita paikallista.** MTV Uutisten mukaan tekoälytietokoneet voivat periaatteessa tarjota verkkoversiota parempaa tietosuojaa, koska laskenta tapahtuu omalla koneella, mutta tietosuojavaltuutettu kehottaa tarkistamaan ehdot ja asetukset [4].

> Tietosuojavaltuutettu muistutti: ”On hyvä varmistua siitä, onko ratkaisu aidosti paikallinen.” [4]

Siksi tämän projektin verkkoraja on dokumentoitu erikseen kohdassa *Tietoturvaraja ja tuotantokäyttö*.

### Pienet ja erikoistuneet mallit riittävät yhä useammin

Gartner ennustaa huhtikuussa 2025 julkaistussa tiedotteessaan, että vuoteen 2027 mennessä organisaatiot käyttävät pieniä, tehtäväkohtaisia tekoälymalleja vähintään kolme kertaa enemmän kuin yleiskäyttöisiä suuria kielimalleja [6].

> Gartnerin analyytikko Sumit Agarwal perustelee: ”Small, task-specific models provide quicker responses and use less computational power” [6]

NVIDIAn tutkijat esittivät kesäkuussa 2025 julkaistussa kannanottoartikkelissa, että pienet kielimallit ovat riittävän tehokkaita, toiminnallisesti sopivampia ja taloudellisempia agenttimaisiin järjestelmiin [7]. Artikkeli on asemapaperi eikä uusi mittaus, joten se kuvaa tutkijoiden näkemystä eikä todistetta.

> Artikkelin väite on: ”small, rather than large, language models are the future of agentic AI” [7]

### Avoimet mallit pysyvät lähellä suljettuja

Stanfordin AI Index 2025 raportoi Chatbot Arena -vertailussa, että johtava suljettu malli oli tammikuussa 2024 parempi kuin paras avoimen painon malli 8,04 prosenttia. Helmikuuhun 2025 mennessä ero oli kaventunut 1,70 prosenttiin [8]. Vuoden 2026 raportin mukaan ero kasvoi uudelleen: HPCwiren AIwiren mukaan ero parhaan suljetun ja parhaan avoimen mallin välillä oli 0,3 % elokuussa 2024 ja 3,3 % maaliskuussa 2026 [9]. Ero on siis kasvanut, mutta se on yhä muutaman prosentin luokkaa.

### Organisaatiot siirtävät tekoälyä omaan hallintaansa

**Broadcom, kesäkuu 2026.** Yhtiön Private Cloud Outlook 2026 -raportin mukaan 56 % yrityksistä ajaa tai suunnittelee ajavansa tuotantokäytön päättelyn yksityisessä pilvessä, kun julkisessa pilvessä vastaava osuus oli 41 %. Julkisen pilven osuus laski vuodessa 15 prosenttiyksikköä (56 %:sta 41 %:iin). Neljä viidestä IT-johtajasta kertoi geopolitiikan vaikuttavan IT-strategiaansa, ja ensimmäistä kertaa datan sijaintiin ja suvereniteettiin liittyvät vaatimukset (54 %) ohittivat lainkäyttöaluekohtaisen vaatimustenmukaisuuden (51 %) [10].

> Broadcomin VMware Cloud Foundation -yksikön varatoimitusjohtaja Prashanth Shenoy: ”enterprises increasingly prefer private cloud for production AI” [10]

Huomaa kaksi rajausta: Broadcom myy yksityisen pilven ohjelmistoja, joten kysely ei ole puolueeton, ja *yksityinen pilvi* tarkoittaa omassa hallinnassa olevaa infrastruktuuria eikä välttämättä yksittäisen koneen paikallista mallia [10].

**Schneider Electric ja Omdia, marraskuu 2026.** Tutkimuksen mukaan 55 % vastaajista suosi yrityksen omistamaa, omissa tiloissa olevaa infrastruktuuria tekoälylle. Tärkeimmät syyt olivat tietosuoja ja tietoturva (30 %), luotettavuusvaatimukset (22 %) ja sääntelyn noudattaminen (21 %). Silti 33 % mainitsi esteeksi sisäisen osaamisen puutteen. Tutkimuksen tilasi Schneider Electric, joka myy energia- ja infrastruktuuriteknologiaa, ja tulokset kuvaavat kyselyyn vastanneiden mielipiteitä eivätkä koko markkinaa [11].

### Laitteet ja avoimen lähdekoodin työkalut kypsyvät

Google julkaisi kesäkuussa 2026 työkaluja, joilla agenttimaisia työnkulkuja voi ajaa paikallisesti 12 miljardin parametrin Gemma 4 12B -mallilla tavallisilla koneilla. Lisäksi LiteRT-LM-komentorivityökalu voi toimia paikallisena LLM-palvelimena ja tarjota mallin tavallisille työkaluille paikallisen rajapinnan kautta [12].

> Google totesi blogikirjoituksessaan: ”Your data stays on your device” [12]

Avoimen lähdekoodin puolella Nous Researchin MIT-lisensioitu Hermes Agent -agentti tukee muun muassa omaa rajapintaa, ja projektilla oli marraskuussa 2026 yli 260 000 GitHub-tähteä [13]. Tähtimäärä kertoo kiinnostuksesta, ei laadusta.

> Hermes Agentin esittelyssä luvataan: ”Use any model you want” [13]

### Rajat ja vastaväitteet

- **Paikallinen ei korvaa pilveä kokonaan.** InfoWorldin haastattelema TechInsightsin analyytikko Anand Joshi ei odota paikallisen agenttitekoälyn korvaavan pilvitekoälyä, mutta arvioi sen vievän siitä osan. Hänen mukaansa tietosuojaa tai tiukkaa vasteaikaa vaativat käyttötapaukset siirtyvät paikalliseen ensin ja muut seuraavien 2–3 vuoden aikana [12].
- **Laitteisto maksaa.** Gartnerin analyytikko Rishi Padhi huomauttaa, että Gemma 4 12B -kaltainen optimoitu malli vaatii noin 16 Gt yhteistä muistia tai VRAMia tavallisten sovellusten rinnalla, ja monissa yrityskannettavissa ei ole siihen riittävästi tehoa. Hänen mukaansa siirtymä muuttaa kulut käyttökustannuksista (OpEx) investoinneiksi (CapEx) [12].
- **RAG-järjestelmien sijoittumisesta ei ole yksimielisyyttä.** Padhin mukaan koodin generointi ja paikallisten tiedostojen analyysi voivat siirtyä työntekijöiden laitteille, mutta yrityksen laajuiset RAG-järjestelmät ja monimutkaiset työnkulut todennäköisesti pysyvät pilvessä [12]. Local RAG Engine on tarkoitettu tilanteisiin, joissa dokumentit eivät saa poistua organisaation hallinnasta, ja se toimii myös yhden koneen tai oman palvelimen ympäristössä.
- **Osaaminen ja ylläpito.** Omaa tekoälyympäristöä rakentavat organisaatiot törmäävät osaamisen puutteeseen [11], ja audit-lokien sekä malliajautuman seuranta on vaikeampaa, kun päättely tapahtuu kokonaan offline-tilassa [12].
- **Avoimet mallit eivät ole kaikissa tehtävissä yhtä hyviä.** Ero parhaisiin suljettuihin malleihin on pienentynyt mutta kasvanut uudelleen vuoden 2024 jälkeen [8][9].

**Yhteenveto.** Lähteiden perusteella paikallinen tekoäly ei ole tulevaisuus kaikessa vaan siellä, missä data on arkaluonteista, verkkoyhteys rajallinen, vasteajan pitää olla lyhyt tai kustannusten pitää olla ennustettavia. Todennäköisin lopputulos on hybridimalli, jossa arkaluonteinen työ ajetaan omassa hallinnassa ja muu työ pilvessä. Tämä on tämän projektin tulkinta lähteistä.

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

[2] **Cisco Newsroom — Cisco 2024 Data Privacy Benchmark Study: yli joka neljäs organisaatio kielsi generatiivisen tekoälyn (25.1.2024)**  
   https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2024/m01/organizations-ban-use-of-generative-ai-over-data-privacy-security-cisco-study.html

[3] **Euroopan tietosuojaneuvosto (EDPB) — lausunto tekoälymalleista ja GDPR:stä (18.12.2024)**  
   https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en

[4] **MTV Uutiset — Tekoälytietokoneet yleistyvät, selvitä tietosuoja-asetukset ennen käyttöä**  
   https://www.mtvuutiset.fi/artikkeli/tekoalytietokoneet-yleistyvat-kovaa-vauhtia-selvita-nama-tietosuoja-asetukset-ennen-kayttoa/9210982

[5] **CGI Suomi — Julkisen sektorin tekoälystrategia: onko pilvi ainoa vaihtoehto? (20.3.2025)**  
   https://www.cgi.com/fi/fi/blogi/julkisen-sektorin-tekoalystrategia-onko-pilvi-ainoa-vaihtoehto

[6] **Gartner — Gartner Predicts by 2027, Organizations Will Use Small, Task-Specific AI Models Three Times More Than General-Purpose LLMs (9.4.2025)**  
   https://www.gartner.com/en/newsroom/press-releases/2025-04-09-gartner-predicts-by-2027-organizations-will-use-small-task-specific-ai-models-three-times-more-than-general-purpose-large-language-models

[7] **NVIDIA Research — Small Language Models are the Future of Agentic AI (arXiv:2506.02153, kesäkuu 2025)**  
   https://arxiv.org/abs/2506.02153

[8] **Stanford HAI — AI Index Report 2025, Technical Performance (open-weight-mallien kuroutuminen)**  
   https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance

[9] **HPCwire / AIwire — What Stanford's HAI Report Says About AI in Science (15.4.2026)**  
   https://www.hpcwire.com/aiwire/2026/04/15/what-stanfords-hai-report-says-about-ai-in-science/

[10] **Broadcom — Private Cloud Outlook 2026: AI Tipping Point as Production Inference Shifts to Private Cloud (9.6.2026)**  
   https://news.broadcom.com/releases/broadcom-private-cloud-outlook-2026

[11] **New Civil Engineer — Enterprises favour on-premises AI as sovereignty and compliance concerns grow (Schneider Electric / Omdia, 23.11.2026)**  
   https://www.newcivilengineer.com/latest/enterprises-favour-on-premises-ai-as-sovereignty-and-compliance-concerns-grow-23-11-2026/

[12] **InfoWorld — Google brings local AI agents to laptops with Gemma 4 12B (4.6.2026)**  
   https://www.infoworld.com/article/4181175/google-brings-local-ai-agents-to-laptops-with-gemma-4-12b.html

[13] **Nous Research — Hermes Agent, lähdekoodi ja projektin yleiskuvaus**  
   https://github.com/NousResearch/hermes-agent

---

## 📄 Lisenssi

Tämä projekti on lisensoitu MIT-lisenssillä. Katso [LICENSE](LICENSE).