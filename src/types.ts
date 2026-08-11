export type Orientation = 'landscape' | 'portrait';
export type EntryVisibility = 'public' | 'pending';

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
  visibility: EntryVisibility;
}

export interface Country {
  name: string;
  alpha3: string;
  numeric: string;
}
