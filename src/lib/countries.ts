import rawCountries from '../data/countries.json';
import type { Country } from '../types';

function isCountry(value: unknown): value is Country {
  if (!value || typeof value !== 'object') return false;
  const country = value as Partial<Country>;
  return Boolean(
    typeof country.name === 'string' && country.name.length > 0 &&
    typeof country.alpha3 === 'string' && /^[A-Z]{3}$/.test(country.alpha3) &&
    typeof country.numeric === 'string' && /^\d{3}$/.test(country.numeric)
  );
}

if (!Array.isArray(rawCountries) || !rawCountries.every(isCountry)) {
  throw new Error('Invalid country data in src/data/countries.json');
}

const alpha3Codes = new Set(rawCountries.map((country) => country.alpha3));
if (alpha3Codes.size !== rawCountries.length) {
  throw new Error('Country registry alpha-3 codes must be unique');
}

const numericCodes = new Set(rawCountries.map((country) => country.numeric));
if (numericCodes.size !== rawCountries.length) {
  throw new Error('Country registry numeric codes must be unique');
}

export const countries: Country[] = rawCountries;
const countriesByAlpha3 = new Map(countries.map((country) => [country.alpha3, country]));

export function resolveCountry(alpha3: string): Country {
  const country = countriesByAlpha3.get(alpha3);
  if (!country) {
    throw new Error(`Unknown ISO 3166 alpha-3 country code: ${alpha3}`);
  }
  return country;
}
