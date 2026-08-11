import rawEntries from '../data/entries.json';
import type { Entry } from '../types';
import { resolveCountry } from './countries';

const orientations = new Set(['landscape', 'portrait']);
const visibilities = new Set(['public', 'pending']);

function isOptionalString(value: unknown) {
  return value === undefined || typeof value === 'string';
}

function isEntry(value: unknown): value is Entry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Partial<Entry>;
  return Boolean(
    typeof entry.id === 'string' && /^EA-\d{2}-\d{3}$/.test(entry.id) &&
    typeof entry.edition === 'string' &&
    typeof entry.year === 'number' &&
    typeof entry.country === 'string' && /^[A-Z]{3}$/.test(entry.country) &&
    typeof entry.contributor === 'string' && typeof entry.registryNote === 'string' &&
    entry.references && typeof entry.references === 'object' &&
    isOptionalString(entry.references.web) &&
    isOptionalString(entry.references.instagram) &&
    isOptionalString(entry.references.facebook) &&
    typeof entry.registeredAt === 'string' && typeof entry.printRun === 'number' &&
    typeof entry.image === 'string' && entry.orientation && orientations.has(entry.orientation) &&
    entry.visibility && visibilities.has(entry.visibility)
  );
}

if (!Array.isArray(rawEntries) || !rawEntries.every(isEntry)) {
  throw new Error('Invalid entry data in src/data/entries.json');
}

for (const entry of rawEntries) resolveCountry(entry.country);

const ids = new Set(rawEntries.map((entry) => entry.id));
if (ids.size !== rawEntries.length) throw new Error('Archive entry IDs must be unique');

export const entries: Entry[] = rawEntries;

export function countryCode(entry: Entry) {
  const country = resolveCountry(entry.country);
  return `${country.alpha3} ${country.numeric}`;
}

export function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle.replace(/^@/, '')}/`;
}
