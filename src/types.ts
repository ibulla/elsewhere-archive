export type Orientation = 'landscape' | 'portrait';

export interface Entry {
  id: string;
  edition: string;
  year: number;
  country: string;
  contributor: string;
  registryNote: string;
  reference: {
    label: string;
    url: string;
  };
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
