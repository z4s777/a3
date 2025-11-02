export enum AppCategory {
  Game = 'game',
  App = 'app',
  Software = 'software'
}

export interface AppItem {
  id: string;
  name: string;
  category: AppCategory;
  iconUrl: string;
  downloads: number;
  version: string;
  uploadDate: string;
  description: string;
}

export type SortOption = 'downloads' | 'date' | 'name';
