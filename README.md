# ELVIS – Projekthomepage

Quelle der Seite **<https://einsatzleitwagen.app>**: Vorstellung von [ELVIS](https://github.com/tel-diepholz/elvis),
der Software für den Einsatzleitwagen, mit Funktionen, Bildern, App-Anbindung, E-Mail und Installation, dazu die
**Statusseite** <https://einsatzleitwagen.app/status> für Mail-Dienst und Cloud-Relay.

Zwei Seiten mit React und Vite (`index.html`, `status/index.html`), gehostet auf **Cloudflare Pages** (kostenlos, HTTPS).

## Statusseite

`/status` und der Störungshinweis oben auf der Startseite lesen `GET /v1/status` des Relays (Adresse in `src/links.ts`).
Die Startseite zeigt den Hinweis nur, wenn der Gesamtstatus nicht „ok“ ist oder das Relay nicht antwortet. Prüfungen und
Störungsmeldungen pflegt das Relay (siehe README von elvis-relay). Gegen ein lokales Relay:
`VITE_RELAY_URL=http://localhost:8787 npm run dev`.

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Typprüfung + Build nach dist/
npm run preview    # gebaute Seite ansehen
```

```
src/sections/       Abschnitte der Seite: StatusBanner, Header, Hero, Features, Screenshots, Ecosystem, Mail, Install, Footer
src/status/         Statusseite (/status)
src/styles.css      Farben als CSS-Variablen, Hell/Dunkel nach Systemeinstellung
public/screenshots/ Bilder aus dem Simulationsmodus von ELVIS (WebP, 1440 × 900)
public/_headers     Cache-Header für Cloudflare Pages
```

## Screenshots erneuern

Im ELVIS-Repo mit dem Skill `run-elvis` eine isolierte Instanz starten (`.claude/skills/run-elvis/start.sh --incident`),
Übungsdaten per API anlegen, mit `driver.mjs` (`size 1440 900`, `nav`, `ss`) aufnehmen und als WebP ablegen:

```bash
npx sharp-cli -i /tmp/elvis-run/shots/karte.png -o public/screenshots/karte.webp -f webp -q 82
```

Keine echten Namen oder Einsatzdaten verwenden.

## Veröffentlichen

Von Hand (mit `npx wrangler login`):

```bash
npm run deploy -- --branch main
```

Automatisch: Jeder Push auf `main` baut und veröffentlicht über GitHub Actions, sobald diese Secrets im Repo hinterlegt sind:

| Secret | Inhalt |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | API-Token mit der Berechtigung *Cloudflare Pages: Edit* |
| `CLOUDFLARE_ACCOUNT_ID` | Konto-ID aus dem Cloudflare-Dashboard |

Ohne Secrets läuft nur der Build, der Deploy-Schritt warnt und endet.

Die Domains `einsatzleitwagen.app` und `www.einsatzleitwagen.app` sind im Pages-Projekt `elvis-homepage` als
Custom Domains eingetragen. Die Zone liegt im selben Cloudflare-Konto, DNS und Zertifikat verwaltet Cloudflare.
`functions/_middleware.js` leitet `www` dauerhaft (301) auf die Adresse ohne `www` um.

## Lizenz

[MIT](LICENSE)
