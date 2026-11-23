# wietekevandiggele.nl

De website van Wieteke van Diggele (Wiet): online bestie, online business adviseur, Virtual Assistant en VA-matchmaker.

De site is gebouwd met [Eleventy](https://www.11ty.dev/). Dat maakt van de bestanden in `src/` gewone, supersnelle HTML-pagina's. Geen WordPress, geen sitebouwer, geen plugins die stuk gaan.

## Iets aanpassen

| Wat wil je aanpassen? | Waar staat het? |
| --- | --- |
| Volgers, views, peildatum, prijzen, links naar betaalpagina's en agenda | `src/_data/site.js` |
| Reviews | `src/_data/reviews.js` |
| Producten in Wiet's Shop | `src/_data/shop.js` (de affiliate-links staan in `src/_data/affiliate.json`) |
| Menu | `src/_data/nav.js` |
| Teksten op een pagina | `src/<pagina>.njk`, bijvoorbeeld `src/samenwerken.njk` |
| Kleuren, lettertype, opmaak | `src/assets/css/site.css` (kleuren staan bovenaan) |
| Foto's | `src/assets/img/` (WebP, in twee formaten) |

Je kunt een bestand direct op GitHub aanpassen (potloodje rechtsboven), of het aan Claude vragen.
Na elke wijziging op `main` zet GitHub de nieuwe versie binnen een paar minuten vanzelf online.

## Lokaal bekijken

```bash
npm install
npm start
```

Open daarna http://localhost:8080.

## Online zetten

De workflow in `.github/workflows/publiceren.yml` bouwt de site en zet hem op GitHub Pages.
Eenmalig instellen in GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Je eigen domein koppelen (pas als de nieuwe site helemaal klaar is)

1. GitHub: **Settings → Pages → Custom domain**: `www.wietekevandiggele.nl`. Zet daarna **Enforce HTTPS** aan.
2. MijnDomein, DNS-instellingen van wietekevandiggele.nl:
   - `www`: CNAME naar `<jouw-github-naam>.github.io`
   - `@` (het kale domein): vier A-records naar `185.199.108.153`, `185.199.109.153`, `185.199.110.153` en `185.199.111.153`
   - Haal de oude A- en CNAME-records voor `@` en `www` weg die naar de sitebouwer wijzen.
   - **Laat de MX-records staan.** Die regelen je e-mail (vuur@wietekevandiggele.nl).
3. Zeg je sitebouwer-pakket bij MijnDomein pas op als de nieuwe site live staat. Check eerst of je e-mail niet in datzelfde pakket zit.

## Nog aan te zetten

- **Live Instagram-feed:** maak een (gratis) JSON-feed aan, bijvoorbeeld bij Behold.so, en zet de URL bij `instagramFeedUrl` in `src/_data/site.js`. Er komen geen trackers van Meta op je site, dus je hebt er geen cookiebanner voor nodig.
- **Contactformulier:** maak een gratis access key aan bij Web3Forms en zet die bij `web3formsKey`. Het formulier verschijnt dan vanzelf op de contactpagina.

## Oude adressen

Pagina's die verhuisd zijn, sturen bezoekers automatisch door. Zo blijven links in je bio, mails en Google werken. De lijst staat in `src/_data/redirects.js`.

| Oud | Nieuw |
| --- | --- |
| `/wiet-vindt-er-wat-van` | `/samenwerken/` |
| `/virtualassistant` | `/va-matchmaking/` |
| `/meer-wiet` | `/over-wiet/` |
| `/instagram` | `/links/` |

## Nog te verhuizen van de oude site

Deze pagina's staan nog op de oude site. Zet de nieuwe site pas live als ze over zijn:

- Blog (`/wietsblog`) en de 10 blogartikelen
- `/bestie-tijdens-rouw`
- Weggevers en bedankpagina's: `/moeilijke-mails-makkelijk-gemaakt`, `/prioriteren`, `/checklist`, `/weggever-download`, `/bedankt`, `/bedankt-inschrijving`, `/business-dip-resultaten`
- `/zoom` (doorverwijzing naar je Zoom-room)
