export type Orientation = 'landscape' | 'portrait';

export interface EntryReferences {
  web?: string;
  instagram?: string;
  facebook?: string;
}

export interface Entry {
  id: string;
  edition: string;
  year: number;
  country: string;
  contributor: string;
  registryNote: string;
  references: EntryReferences;
  registeredAt: string;
  printRun: number;
  image: string;
  orientation: Orientation;
}

export interface Country {
  name: string;
  alpha3: string;
  numeric: string;
}
