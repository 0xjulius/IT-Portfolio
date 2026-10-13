# Duunify – Tekninen arkkitehtuuri ja toteutus

**Duunify** on suomalaisille työnhakijoille suunnattu moderni web-sovellus, jonka tavoitteena on tehdä työnhausta järjestelmällisempää, helpommin seurattavaa ja vähemmän manuaalista.

Duunify kokoaa työnhaun eri vaiheet yhteen paikkaan: työpaikkailmoitusten tallentamisen, hakemusten seurannan, kalenterin, muistiinpanot, analytiikan sekä tekoälyä hyödyntävän työnhakuavustajan.

Alkuperäinen ydinidea oli ratkaista ongelma, jossa työnhakija joutuu ylläpitämään työnhakuaan hajallaan esimerkiksi Excelissä, muistilapuissa ja sähköposteissa. Uusien ominaisuuksien myötä Duunify ei ainoastaan seuraa työnhakua, vaan auttaa myös **tekemään työnhakua**.

---

# 1. Liiketoimintaongelma ja käyttötapaukset

Perinteinen työnhaku koostuu helposti useista erillisistä työkaluista. Työpaikat löytyvät eri palveluista, hakemukset lähetetään eri järjestelmissä ja haastattelut sekä muistutukset ovat erillisissä kalentereissa.

Tämä aiheuttaa erityisesti kolme ongelmaa:

- **Manuaalinen työ:** työpaikkailmoitusten tietojen kopioiminen ja hakemusten ylläpitäminen vie aikaa.
- **Kokonaiskuvan puute:** hakija ei aina tiedä, missä vaiheessa eri hakemukset ovat.
- **Tietojen katoaminen:** työpaikkailmoitus voi poistua alkuperäisestä palvelusta, vaikka hakuprosessi jatkuisi vielä viikkoja.

Duunify kokoaa nämä asiat yhteen paikkaan.

## UC-1: Työpaikkailmoituksen automaattinen tuonti

### Ongelma

Työpaikkailmoituksen tietojen kopioiminen käsin on hidasta ja altista virheille.

Lisäksi ilmoitukset poistuvat usein alkuperäisestä palvelusta hakuajan päätyttyä. Tällöin hakija ei välttämättä enää pääse tarkistamaan, mitä tehtävässä luvattiin tai mitä työnantaja ilmoituksessa edellytti.

### Ratkaisu

Käyttäjä voi syöttää työpaikkailmoituksen URL-osoitteen Duunifyyn.

Järjestelmä hakee ilmoituksen sisällön ja pyrkii tunnistamaan siitä keskeiset tiedot, kuten:

- yrityksen
- tehtävänimikkeen
- sijainnin
- palkan
- hakuajan päättymisen
- työpaikkailmoituksen varsinaisen sisällön

Ilmoitus tallennetaan Duunifyn tietokantaan.

### Hyöty

Käyttäjän ei tarvitse kirjoittaa tietoja käsin, ja ilmoituksen sisältö säilyy Duunifyssä myös silloin, kun alkuperäinen verkkosivu myöhemmin poistuu.

Tämä muodostaa myös pohjan muille ominaisuuksille, kuten työnhakuavustajalle.

---

# UC-2: Hakemusten hallinta

Käyttäjä voi seurata työnhaun etenemistä yhdestä näkymästä.

Hakemuksella voi olla esimerkiksi seuraavia tiloja:

- Tallennettu
- Haettu
- Haastattelu
- Tarjous
- Hylätty

Hakemukseen voidaan liittää myös muistiinpanoja ja tiedostoja, kuten CV ja saatekirje.

Tavoitteena on, että käyttäjän ei tarvitse muistaa ulkoa, mitä missäkin hakuprosessissa on tapahtunut.

---

# UC-3: Kalenteri ja muistutukset

Työnhakuun liittyy paljon päivämääriä:

- hakuaikoja
- haastatteluja
- jatkohaastatteluja
- muistutuksia
- muita sovittuja tapahtumia

Duunify kokoaa nämä samaan kalenteriin.

Näin hakija pystyy näkemään työnhaun aikataulun kokonaisuutena ja vähentämään unohtuneita määräaikoja.

---

# UC-4: Työnhaun analytiikka

Duunify kerää tietoa käyttäjän työnhakuprosessista ja näyttää sitä visuaalisesti.

Dashboard voi näyttää esimerkiksi:

- hakemusten määrän
- hakemusten tilajakauman
- aktiivisuuden ajan kuluessa
- työpaikkojen sijainteja
- toimintalokin

Tavoitteena ei ole pelkästään näyttää numeroita, vaan auttaa käyttäjää ymmärtämään oman työnhakunsa etenemistä.

---

# UC-5: Työnhakuavustaja

Työnhakuavustaja on yksi Duunifyn merkittävimmistä uusista ominaisuuksista.

Aikaisemmin Duunify keskittyi suurelta osin työnhaun **seuraamiseen ja järjestämiseen**. Työnhakuavustaja laajentaa palvelua kohti itse työnhakuprosessin tukemista.

### Ongelma

Sama saatekirje ei välttämättä sovi sellaisenaan kaikkiin työpaikkoihin.

Hakijan täytyy usein muokata saatekirjettä jokaisen työpaikan vaatimusten, tehtävän ja yrityksen mukaan.

### Ratkaisu

Käyttäjä voi valita Duunifyyn tallentamansa työpaikan ja antaa työnhakuavustajalle oman pohjasaatekirjeensä tai taustatietonsa.

Järjestelmä analysoi työpaikkailmoituksen ja muodostaa sen perusteella kohdennetun saatekirjeen.

Tekoäly pyrkii:

1. tunnistamaan ilmoituksen tärkeimmät vaatimukset
2. löytämään hakijan taustasta niihin liittyvän osaamisen
3. korostamaan työnantajalle relevantteja vahvuuksia
4. säilyttämään hakijan todellisen kokemuksen ja taustan
5. välttämään sellaisen kokemuksen keksimistä, jota hakijalla ei ole

Tämän ansiosta käyttäjä voi käyttää samaa pohjaa useiden hakemusten lähtökohtana ilman, että jokainen saatekirje täytyy kirjoittaa täysin uudelleen.

---

# UC-6: Tekoälyn tietosuojan tukeminen

Duunifyn tekoälytoiminnoissa käytetään erillistä tekstin esikäsittelyä (`lib/anonymize.ts`).

Sen tarkoituksena on poistaa tekstistä tunnistettavia henkilötietoja ennen kuin tekstiä käytetään tekoälytoiminnossa.

Anonymisointifunktio tunnistaa esimerkiksi:

- suomalaisia henkilötunnuksia
- sähköpostiosoitteita
- verkkosivujen osoitteita
- puhelinnumeroita
- tyypillisiä katuosoitteita
- suomalaisia postinumero–paikkakunta-yhdistelmiä
- käyttäjän nimen, mikäli se on järjestelmän tiedossa

Tunnistetut tiedot korvataan neutraaleilla merkinnöillä, kuten:

`[SÄHKÖPOSTI_POISTETTU]`

`[PUHELIN_POISTETTU]`

`[HAKIJAN_NIMI]`

Näin tekoälylle voidaan välittää mahdollisimman paljon hakemuksen kannalta olennaista sisältöä – esimerkiksi koulutusta, työkokemusta ja osaamista – ilman, että kaikkia alkuperäisen tekstin henkilötietoja tarvitsee välittää sellaisenaan.

### Miksi tämä on tärkeää?

Työnhakuasiakirjat sisältävät helposti paljon henkilötietoja.

Duunifyn lähestymistavassa tietojen käsittelyä ei jätetä kokonaan tekoälypalvelun vastuulle, vaan teksti käsitellään ensin Duunifyn omassa sovelluslogiikassa.

Anonymisointi ei kuitenkaan ole täydellinen henkilötietojen tunnistusjärjestelmä. Regex-pohjainen käsittely ei voi tunnistaa kaikkia mahdollisia henkilötietoja, minkä vuoksi sitä tulee pitää **ylimääräisenä suojaavana kerroksena**, ei absoluuttisena anonymisointitakuuna.

---

# UC-7: Järjestelmän ylläpito ja turvallisuus

Duunify sisältää erillisen ylläpitojärjestelmän.

Admin-käyttäjät voivat esimerkiksi:

- tarkastella käyttäjiä
- hallita käyttäjien oikeuksia
- tarkastella toimintalokeja
- jäädyttää käyttäjätilejä
- tarkastella bännättyjä käyttäjiä

Pääsy admin-toimintoihin perustuu käyttäjän rooliin.

Admin-reitit suojataan myös sovelluksen palvelinpuolen reitityksessä, jotta tavallinen käyttäjä ei voi käyttää hallintanäkymiä pelkästään kirjoittamalla niiden URL-osoitetta selaimeen.

---

# UC-8: Demo-tila

Duunify sisältää myös kirjautumattoman demo-ympäristön.

Demo käyttää valmista mock-dataa eikä tarvitse käyttäjän omaa tietokantaa.

Tämän avulla palvelua voidaan esitellä ilman, että käyttäjän täytyy ensin luoda tiliä.

---

# 2. Teknologiapino

## 2.1 Frontend

### Next.js

Duunify on rakennettu Next.js:n App Router -arkkitehtuurilla.

Next.js mahdollistaa Reactin käyttämisen sekä palvelimella että selaimessa.

Sovelluksessa käytetään:

- React Server Components -komponentteja palvelinpuolella
- Client Components -komponentteja interaktiivisissa näkymissä
- palvelinpuolen API-reittejä
- palvelinpuolen autentikointia
- reitityksen ja käyttöoikeuksien hallintaa

Tämän ansiosta kaikkea sovelluslogiikkaa ei tarvitse lähettää käyttäjän selaimeen.

### TypeScript

TypeScriptiä käytetään koko sovelluksessa.

Se auttaa havaitsemaan virheitä jo kehitysvaiheessa ja tekee erityisesti tietokannan, API-kutsujen ja React-komponenttien välisestä tiedonsiirrosta selkeämpää.

### Tailwind CSS

Käyttöliittymä on rakennettu Tailwind CSS:llä.

Käyttöliittymä on responsiivinen ja toimii sekä työpöydällä että mobiililaitteilla.

---

# 2.2 Backend ja tietokanta

### Supabase

Duunify käyttää Supabasea PostgreSQL-tietokannan, autentikoinnin ja tiedostojen tallennuksen yhteydessä.

Tietokantaan tallennetaan esimerkiksi:

- käyttäjät
- profiilit
- työpaikat
- hakemukset
- kalenteritapahtumat
- toimintahistoria
- admin-lokit

Supabase Storagea voidaan käyttää esimerkiksi CV- ja saatekirjetiedostojen säilyttämiseen.

### Cheerio

Cheerioa käytetään työpaikkailmoitusten HTML-rakenteen käsittelyyn.

Duunify pyrkii hyödyntämään työpaikkasivujen rakenteistettua JSON-LD-dataa, jolloin ilmoituksen tietoja voidaan tunnistaa ilman riippuvuutta mahdollisimman monista yksittäisistä CSS-luokista.

### Resend

Resendiä käytetään sähköpostien lähettämiseen esimerkiksi yhteydenottolomakkeen kautta.

---

# 2.3 Tekoäly

Duunifyn työnhakuavustaja hyödyntää Google Gemini -malleja.

Tekoälytoiminto sijaitsee palvelinpuolella.

Käyttäjän selain ei tarvitse suoraa pääsyä tekoälypalvelun tunnistetietoihin. Selain lähettää tarvittavat tiedot Duunifyn omalle palvelimelle, joka käsittelee pyynnön.

Tämä on tärkeä arkkitehtuuriratkaisu, koska ulkoisen tekoälypalvelun tunnistetietoja ei pidä sijoittaa selaimessa ajettavaan JavaScript-koodiin.

---

# 3. Tietoturva

## 3.1 Roolipohjainen pääsynhallinta

Duunify erottaa tavalliset käyttäjät ja admin-käyttäjät roolien perusteella.

Admin-toiminnot eivät ole normaalin käyttäjän käytettävissä.

Käyttöoikeuksia tarkistetaan palvelinpuolella, eikä pelkkä käyttöliittymän piilottaminen toimi tietoturvaratkaisuna.

---

## 3.2 Supabasen RLS

Käyttäjien data suojataan PostgreSQL:n Row Level Security -säännöillä.

Tavoitteena on, että käyttäjä voi käsitellä vain omaan tiliinsä kuuluvaa dataa.

Esimerkiksi toinen käyttäjä ei saa pystyä lukemaan toisen käyttäjän hakemuksia muuttamalla selaimesta lähetettävää pyyntöä.

RLS toimii siten tärkeänä tietoturvakerroksena sovelluksen käyttöliittymän ja palvelinlogiikan lisäksi.

---

## 3.3 Palvelin- ja selainasiakkaiden erottaminen

Duunifyssa on erilliset Supabase-yhteydet eri käyttötarkoituksiin.

### Selain

Selainpuolen Supabase-asiakas toimii käyttäjän normaalien sovellustoimintojen yhteydessä.

### Palvelin

Palvelinpuolen Supabase-asiakas käsittelee toimintoja, jotka kuuluvat Next.js-palvelimelle.

### Admin

Erityisen tehokkaita ylläpitotoimintoja varten käytetään palvelinpuolen admin-yhteyttä.

Tämän yhteyden tunnistetietoja ei koskaan tule sijoittaa client-puolen koodiin.

---

# 3.4 Käyttäjien bännijärjestelmä

Duunify sisältää käyttäjien tilapäisen ja pysyvän estämisen.

Bännin yhteydessä käyttäjälle voidaan määrittää esimerkiksi:

- aktiivinen esto
- bännin päättymisaika
- pysyvä esto

Sovelluksen `proxy.ts` tarkistaa kirjautuneen käyttäjän tilan ja voi ohjata aktiivisesti estetyn käyttäjän `/banned`-sivulle.

Tämä muodostaa ensimmäisen suojakerroksen ennen varsinaisten suojattujen näkymien lataamista.

---

# 3.5 API-reittien suojaaminen

Tekoälytoimintoja ja muita palvelinpuolen toimintoja ei tule suojata pelkästään piilottamalla niiden käyttöliittymässä oleva painike.

Palvelin tarkistaa pyynnön yhteydessä käyttäjän oikeudet.

Tällä estetään tilanne, jossa tavallinen käyttäjä yrittäisi kutsua esimerkiksi tekoälytoimintoa suoraan selaimesta tai omalla HTTP-pyynnöllään.

---

# 4. Datan käsittely

## 4.1 Työpaikkailmoituksen käsittely

Prosessi voidaan kuvata seuraavasti:

**URL → palvelin → verkkosivu → HTML/JSON-LD → jäsennys → työpaikkadata → tietokanta**

Käyttäjän ei tarvitse kopioida ilmoituksesta tietoja käsin.

---

## 4.2 Tekoälyavustajan käsittely

Työnhakuavustajan prosessi:

**Työpaikkailmoitus + käyttäjän pohjasaatekirje → henkilötietojen esikäsittely → tekoälykäsittely → valmis saatekirje**

Tekoälylle pyritään välittämään mahdollisimman paljon työn kannalta olennaista tietoa ja mahdollisimman vähän tarpeettomia henkilötietoja.

---

# 5. Tietokannan eheys ja poistaminen

Kun hakemus poistetaan, siihen liittyviä tietoja voidaan poistaa tietokannan relaatiomallin mukaisesti.

Analytiikan ja toimintalokin tarpeisiin voidaan kuitenkin säilyttää erillisiä tietoja poistetuista hakemuksista.

Tämä mahdollistaa sen, että esimerkiksi käyttäjän aktiivisuushistoria ei vääristy automaattisesti jokaisen poistamisen yhteydessä.

---

# 6. Demo ja uudelleenkäytettävät komponentit

Demo- ja tuotantoympäristö hyödyntävät samoja käyttöliittymäkomponentteja.

Esimerkiksi dashboardin visualisointikomponentit voivat vastaanottaa joko:

- oikeaa käyttäjädataa
- demo-dataa

Tämä vähentää koodin duplikaatiota ja tekee käyttöliittymästä helpommin ylläpidettävän.

---


# 7. Arkkitehtuurin kokonaiskuva

Duunifyn kokonaisuus voidaan tiivistää seuraavasti:

**Käyttäjä**

↓

**Next.js + React**

↓

**Palvelinpuolen logiikka / API-reitit**

↓

**Supabase / PostgreSQL**

↓

**Työpaikkadata, hakemukset, kalenteri ja käyttäjädata**

Samanaikaisesti:

**Käyttäjän työpaikkailmoitus + taustatiedot**

↓

**Duunifyn henkilötietojen esikäsittely**

↓

**Tekoälypalvelu**

↓

**Räätälöity saatekirje**

Tärkeä osa arkkitehtuuria on se, että käyttöliittymä, palvelinlogiikka, tietokanta ja ulkoiset palvelut eivät kaikki ole suoraan yhteydessä toisiinsa. Niiden välissä on selkeitä rajapintoja ja käyttöoikeustarkistuksia.

---

# 8. Projektin nykyinen kehityssuunta

Duunify on kehittynyt alkuperäisestä työpaikkailmoitusten keräämiseen ja hakemusten seurantaan keskittyvästä työkalusta kohti kokonaisvaltaisempaa työnhaun työkalua.

Alkuperäinen ydin:

**Löydä → tallenna → seuraa**

Uudempi kokonaisuus:

**Löydä → tallenna → seuraa → analysoi → valmistele → hae**

Tämä muuttaa Duunifyn roolia merkittävästi.

Se ei ole enää pelkästään työnhaun seurantatyökalu, vaan alusta, joka voi auttaa käyttäjää myös työnhaun käytännön tekemisessä.

## 9. Projektin Rakenne
```
duunify/
├── .env.local
├── .gitignore
├── app
│   ├── admin
│   │   ├── applications
│   │   ├── layout.tsx
│   │   ├── logs
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── users
│   │       └── page.tsx
│   ├── api
│   │   ├── admin
│   │   │   └── users
│   │   │       └── [id]
│   │   │           ├── ban
│   │   │           │   └── route.ts
│   │   │           ├── confirm
│   │   │           │   └── route.ts
│   │   │           └── route.ts
│   │   ├── contact
│   │   │   └── route.ts
│   │   ├── cron
│   │   │   └── route.ts
│   │   ├── generate-cover-letter
│   │   │   └── route.ts
│   │   ├── parse-job
│   │   │   └── route.ts
│   │   ├── ping
│   │   │   └── route.ts
│   │   └── webhooks
│   │       └── new-user
│   │           └── route.ts
│   ├── applications
│   │   ├── AddApplicationForm.tsx
│   │   ├── ApplicationCard.tsx
│   │   ├── ApplicationDialog.tsx
│   │   ├── page.tsx
│   │   └── [id]
│   ├── auth
│   │   └── callback
│   │       └── route.ts
│   ├── banned
│   │   └── page.tsx
│   ├── calendar
│   │   └── page.tsx
│   ├── changelog
│   │   └── page.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── demo
│   │   ├── applications
│   │   │   └── page.tsx
│   │   ├── calendar
│   │   │   └── page.tsx
│   │   ├── demosettings
│   │   │   └── page.tsx
│   │   ├── favorites
│   │   │   └── page.tsx
│   │   ├── history
│   │   │   └── page.tsx
│   │   ├── job-assistant
│   │   │   ├── page.tsx
│   │   │   └── [id]
│   │   │       ├── page.tsx
│   │   │       └── result
│   │   │           └── page.tsx
│   │   └── page.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── favorites
│   │   └── page.tsx
│   ├── globals.css
│   ├── history
│   │   └── page.tsx
│   ├── job-assistant
│   │   ├── cover-letters
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── [id]
│   │       ├── generate
│   │       │   └── page.tsx
│   │       ├── page.tsx
│   │       └── result
│   │           └── page.tsx
│   ├── layout.tsx
│   ├── login
│   │   ├── actions.ts
│   │   └── page.tsx
│   ├── logout
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── privacy
│   │   └── page.tsx
│   ├── settings
│   │   └── page.tsx
│   └── tos
│       └── page.tsx
├── components
│   ├── Admin
│   │   ├── AdminSidebar.tsx
│   │   ├── LogDetailModal.tsx
│   │   ├── UserDetailsModal.tsx
│   │   └── UsersTable.tsx
│   ├── AdminCard.tsx
│   ├── AiCreditsBadge.tsx
│   ├── applications
│   │   ├── AddAttachment.tsx
│   │   ├── ApplicationHistory.tsx
│   │   ├── ApplicationRow.tsx
│   │   ├── ApplicationStats.tsx
│   │   ├── CompanyLogo.tsx
│   │   └── QuickAddApplication.tsx
│   ├── calendar
│   │   ├── AddEventModal.tsx
│   │   ├── CalendarClient.tsx
│   │   ├── CalendarView.tsx
│   │   ├── EventDetailModal.tsx
│   │   ├── MiniCalendar.tsx
│   │   └── QuickEvents.tsx
│   ├── dashboard
│   │   ├── ActivityHeatmap.tsx
│   │   ├── ApplicationChart.tsx
│   │   ├── ApplicationTrendChart.tsx
│   │   ├── ConsistencyCard.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── GhostedCard.tsx
│   │   ├── ImpactRatingCard.tsx
│   │   ├── LocationsChart.tsx
│   │   ├── MapComponent.tsx
│   │   ├── RecentApplications.tsx
│   │   ├── StatsCard.tsx
│   │   └── UpcomingDeadlines.tsx
│   ├── demo
│   │   ├── DemoBanner.tsx
│   │   ├── DemoCompanyLogo.tsx
│   │   ├── DemoHeader.tsx
│   │   ├── DemoNotificationsDropdown.tsx
│   │   └── DemoSidebar.tsx
│   ├── DownloadButton.tsx
│   ├── favorites
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── history
│   │   └── HistoryClient.tsx
│   ├── job-assistant
│   │   ├── id
│   │   │   ├── DocumentItem.tsx
│   │   │   ├── InfoSidebar.tsx
│   │   │   ├── JobDescriptionCard.tsx
│   │   │   ├── JobHeader.tsx
│   │   │   ├── result
│   │   │   │   ├── CoverLetterCard.tsx
│   │   │   │   ├── CoverLetterSkeleton.tsx
│   │   │   │   ├── DocumentHeader.tsx
│   │   │   │   ├── ResultHeader.tsx
│   │   │   │   └── ResultSidebar.tsx
│   │   │   └── UserDocumentsCard.tsx
│   │   ├── JobAssistantHeader.tsx
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   └── StepIndicator.tsx
│   ├── LandingIndexCard.tsx
│   ├── local-date.tsx
│   ├── LoginModal.tsx
│   ├── logout
│   │   ├── LogoutConfirmModal.tsx
│   │   └── ModalProvider.tsx
│   ├── NavBar.tsx
│   ├── NavBarWait.tsx
│   ├── NotificationsDropdown.tsx
│   ├── PageHeader.tsx
│   ├── settings
│   │   ├── AvatarUpload.tsx
│   │   ├── PasswordChangeForm.tsx
│   │   ├── ProfileDetailsForm.tsx
│   │   └── SettingsClient.tsx
│   ├── Sidebar.tsx
│   ├── SimpleNav.tsx
│   ├── theme-provider.tsx
│   ├── ui
│   │   ├── AppToaster.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── skeletons.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── TimerComponent.tsx
│   │   └── tooltip.tsx
│   ├── WaitlistSignup.tsx
│   └── WelcomeModal.tsx
├── components.json
├── eslint.config.mjs
├── lib
│   ├── anonymize.ts
│   ├── applications.tsx
│   ├── auth-errors.ts
│   ├── calendar.ts
│   ├── changelog.ts
│   ├── demo-data.ts
│   ├── export-csv.ts
│   ├── history.ts
│   ├── logger.ts
│   ├── middleware.ts
│   ├── ratelimit.ts
│   ├── supabase-admin.ts
│   ├── supabase-server.ts
│   ├── supabase.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── public
│   ├── demo-logos
│   │   ├── dna.png
│   │   ├── elisa.png
│   │   ├── fiskars.png
│   │   ├── fortum.png
│   │   ├── futurice.webp
│   │   ├── gofore.webp
│   │   ├── kone.png
│   │   ├── kone.webp
│   │   ├── neste.png
│   │   ├── nixu.webp
│   │   ├── nordea.png
│   │   ├── opryhma.png
│   │   ├── reaktor.png
│   │   ├── relex.png
│   │   ├── relex.webp
│   │   ├── relexsolutions.png
│   │   ├── sok.png
│   │   ├── supercell.jpg
│   │   ├── supercell.png
│   │   ├── telia.png
│   │   ├── varma.png
│   │   ├── vincit.png
│   │   ├── vr.jpg
│   │   └── wolt.png
│   ├── fi.svg
│   ├── file.svg
│   ├── globe.svg
│   ├── login-bg.png
│   ├── next.svg
│   ├── og-image.png
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── tsconfig.json
└── vercel.json
```

## Yhteenveto

### Duunify – moderni työnhaun hallinta- ja avustuspalvelu

Duunify on suomalaisille työnhakijoille suunniteltu Mini-SaaS-palvelu, jonka tavoitteena on tehdä työnhausta järjestelmällisempää, selkeämpää ja tehokkaampaa. Lähtökohtana on ollut ongelma, jossa työnhakijan tiedot, työpaikkailmoitukset, hakemukset, haastattelut ja muistiinpanot ovat helposti hajallaan useissa eri palveluissa ja esimerkiksi Excel-taulukoissa.

Duunify kokoaa nämä yhteen palveluun ja automatisoi mahdollisimman suuren osan toistuvasta työstä.

Palvelun keskeisiä kokonaisuuksia ovat:

- **Työpaikkailmoitusten automaattinen tallennus:** Käyttäjä voi tuoda työpaikkailmoituksen URL-osoitteella, jolloin järjestelmä poimii ilmoituksesta olennaiset tiedot ja tallentaa myös alkuperäisen ilmoitustekstin myöhempää käyttöä varten.
- **Hakemusten hallinta:** Käyttäjä voi seurata hakemustensa etenemistä yhdestä paikasta, lisätä muistiinpanoja ja liittää mukaan esimerkiksi CV:n ja saatekirjeen.
- **Kalenteri ja muistutukset:** Haastattelut, hakuajat ja muut työnhakuun liittyvät tapahtumat voidaan hallita keskitetysti.
- **Analytiikka:** Dashboard kokoaa työnhaun aktiivisuuden ja hakemusten tilanteen visuaaliseksi kokonaisuudeksi, jolloin käyttäjä näkee nopeasti oman työnhakunsa tilanteen.
- **Toimintaloki:** Käyttäjän tekemät keskeiset muutokset ja tapahtumat voidaan säilyttää osana työnhakuprosessia.
- **Työnhakuavustaja:** Tekoälyä hyödynnetään konkreettisena apuna työnhaussa. Käyttäjä voi valita tallentamansa työpaikkailmoituksen ja käyttää omaa pohjasaatekirjettään lähtökohtana räätälöidyn hakemuksen muodostamiseen.
- **Tietosuoja:** Ennen tekoälykäsittelyä käyttäjän tekstistä poistetaan automaattisesti tunnistettavia henkilötietoja, kuten nimi, sähköposti, puhelinnumero, henkilötunnus ja osoitetietoja. Tavoitteena on välittää tekoälylle ensisijaisesti työn kannalta olennaista osaamis- ja kokemustietoa.
- **Hallinta ja turvallisuus:** Järjestelmässä on erillinen ylläpito-osio, roolipohjainen käyttöoikeuksien hallinta, käyttäjien estäminen sekä toimintojen lokitus.
- **Demo-ympäristö:** Palvelun toimintaa voidaan esitellä ilman käyttäjätiliä erillisellä mock-datalla toimivalla demo-ympäristöllä.

Teknisesti Duunify on rakennettu modernin Next.js- ja React-ekosysteemin ympärille. TypeScript huolehtii sovelluksen tyyppiturvallisuudesta, Next.js App Router tarjoaa sekä palvelin- että selainpuolen komponentit ja Supabase toimii tietokannan, käyttäjähallinnan ja tiedostojen tallennuksen perustana. Tailwind CSS mahdollistaa responsiivisen käyttöliittymän rakentamisen, ja Rechartsia hyödynnetään työnhaun visualisoinnissa.

Arkkitehtuurissa on kiinnitetty erityistä huomiota tietoturvaan. Käyttäjien dataa suojataan Supabasen RLS-säännöillä, palvelin- ja selainpuolen tietokantayhteydet on erotettu toisistaan ja ylläpidon tehokkaampia oikeuksia käyttävät toiminnot pidetään palvelinpuolella. Suojatut reitit ja ylläpito-osio tarkistavat käyttäjän kirjautumisen ja käyttöoikeudet ennen pääsyn sallimista.

Duunify on siten kehittynyt yksinkertaisesta työpaikkailmoitusten keräämisestä kokonaiseksi työnhaun hallintatyökaluksi. Erityisesti työnhakuavustajan kaltaiset ominaisuudet tuovat palveluun uuden tason: tavoitteena ei ole ainoastaan auttaa käyttäjää **seuraamaan työnhakua**, vaan myös **helpottaa itse työnhakutyötä**.

Projektissa yhdistyvät käytännön ongelman ratkaiseminen, moderni web-kehitys, tietokannat, käyttäjähallinta, automaattinen tiedonkeruu, tekoälyn hyödyntäminen sekä tietoturvallinen palvelinarkkitehtuuri. Kokonaisuus toimii samalla käytännön projektina, jossa modernin SaaS-palvelun eri osa-alueet tulevat konkreettisesti tutuiksi.

Tutustu Duunify-projektiin ja lähdekoodiin GitHubissa:  

👉 **[Duunify.com](https://duunify.com)**

👉 **[Github](https://github.com/0xjulius/Duunify)**

