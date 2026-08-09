# ELSEWHERE ARCHIVE

ELSEWHERE ARCHIVE is a digital registry for an art archive of physical, postcard-sized contributions organised into editions. This repository is the intentionally small, static first phase of the archive.

## Stack

- [Astro](https://astro.build/) with static output
- TypeScript in strict mode
- Local JSON data and locally stored images
- Plain CSS (no UI framework or client-side JavaScript)

## Local development

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:4321`. Create a production build with `npm run build`; its output is written to `dist/`.

## Deployment

Every push to `main` automatically builds and deploys the site through GitHub Actions. The workflow installs the project dependencies, creates the static production build, and uploads only the contents of `dist/` to the FTP web hosting; Kreativmedia does not need Node.js, npm, Astro, or a running server process.

Configure `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD` as GitHub Actions repository secrets. If the website must be deployed below the FTP account's default directory, also configure `FTP_SERVER_DIR`. These credentials are used only by the deployment workflow and are not stored in the repository.

Local development continues to use `npm install` followed by `npm run dev`. To test a production build locally, run `npm run build`.

## Archive data

Archive content is currently maintained in [`src/data/entries.json`](src/data/entries.json). Each JSON object represents one archive entry, so editing this file changes the content shown in the archive without requiring a CMS. Entry images live in [`public/images/entries/`](public/images/entries/).

Structural and design changes belong in the Astro source code under [`src/`](src/). The TypeScript model remains in [`src/types.ts`](src/types.ts), and entry data is checked at build time by [`src/lib/entries.ts`](src/lib/entries.ts). Normal pushes to `main` automatically rebuild and deploy the site through GitHub Actions.

To add an entry:

1. Add its image to `public/images/entries/`. Use an image close to the physical card's 1.45:1 ratio, in landscape or portrait orientation.
2. Add a complete object to `src/data/entries.json`, following an existing record. Dates use `YYYY-MM-DD`; set `country` to the ISO 3166 alpha-3 code, for example `"country": "CHE"`.
3. Set `image` to its root-relative public path and set `orientation` to `"landscape"` or `"portrait"`.
4. Run `npm run build`. Entry, edition, and country pages are generated automatically.

`registryNote` is the free-text place for contextual and location information. A country is metadata and is not an identifier; more than one entry may share it. A reference may use empty strings when none exists.

### Country registry

Entries store only an ISO alpha-3 code. The corresponding country or area name and three-digit numeric code are resolved automatically from [`src/data/countries.json`](src/data/countries.json) during the static build. For example:

- Switzerland → `CHE` → `756`
- Canada → `CAN` → `124`
- Greece → `GRC` → `300`
- Brazil → `BRA` → `076`

The local registry is based on current ISO 3166-1 country codes and United Nations M49 data. Numeric codes are stored as three-character strings so leading zeros are preserved. Editors normally should not edit `countries.json` when adding entries; use an existing alpha-3 code in `entries.json`. If a genuinely new registry record is needed, add it centrally rather than duplicating country metadata in an entry. Invalid, unknown, or duplicate codes cause the build to fail.

## Archive identifiers

Permanent IDs follow `EA-[edition]-[sequence]`, for example `EA-01-001`. Edition and sequence are zero-padded. IDs must be unique and are never derived from country codes.

The included records and SVGs are clearly labelled development placeholders and should be replaced as contributions are registered.
