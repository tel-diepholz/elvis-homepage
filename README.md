# ELVIS – Projekthomepage

Quelle der Seite **<https://einsatzleitwagen.app>**: Vorstellung von [ELVIS](https://github.com/tel-diepholz/elvis),
der Software für den Einsatzleitwagen, mit Funktionen, Bildern, App-Anbindung und Installation.

Eine einzelne Seite mit React und Vite, gehostet auf **Cloudflare Pages** (kostenlos, HTTPS).

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Typprüfung + Build nach dist/
npm run preview    # gebaute Seite ansehen
```

```
src/sections/       Abschnitte der Seite: Header, Hero, Features, Screenshots, Ecosystem, Install, Footer
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

## Lizenz

[MIT](LICENSE)
