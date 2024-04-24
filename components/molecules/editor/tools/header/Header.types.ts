export type THeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface IHeaderData {
  level?: THeaderLevel;
  text: string;
  alignment?: 'center' | 'right';
  placeholder?: string;
}
