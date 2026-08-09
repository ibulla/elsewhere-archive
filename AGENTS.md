# ELSEWHERE ARCHIVE — implementation rules

## Architecture

- Keep the site a small, static Astro and TypeScript project.
- Entries are file-based records in `src/data/entries.json`; images live in `public/images/entries/`.
- Do not add a database, CMS, authentication, Supabase, React, Tailwind, or another framework without an explicit change in project scope.
- Keep entry validation and TypeScript types in place. Archive IDs, not countries, uniquely identify entries.
- Use ISO 3166 alpha-3 and numeric country codes. Store any location context in `registryNote`; do not introduce a separate location field.

## Images

- Contribution images represent physical cards with an approximate 1.45:1 ratio in either orientation.
- Never crop contribution images. Use intrinsic proportions and `object-fit: contain` where object fitting is needed.
- Archive layouts must accommodate both portrait and landscape objects without forcing identical boxes.

## Design

- Preserve a restrained, typographic, black-and-white institutional archive / museum registry character.
- Prioritise generous whitespace, systematic archive IDs and ISO country identifiers, and dominant artwork imagery.
- Use square edges, minimal borders, and no shadows, gradients, decorative UI, stock imagery, or unnecessary animation.
- Keep the header to the simple `ELSEWHERE ARCHIVE` identity and restrained navigation.
- Maintain excellent desktop and mobile layouts. Avoid introducing client-side JavaScript unless necessary.

## Content model

Every entry supports: `id`, `edition`, `year`, `country.name`, `country.alpha3`, `country.numeric`, `contributor`, `registryNote`, `reference.label`, `reference.url`, `registeredAt`, `printRun`, `image`, and `orientation` (`landscape` or `portrait`).
