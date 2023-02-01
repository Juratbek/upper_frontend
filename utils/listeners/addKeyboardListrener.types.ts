export type TKey = 'Enter' | 'Escape';

export interface ICombination {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
}

export interface IKeyboardListener {
  clear: () => void;
}

export type TCombinationKey = keyof ICombination;

export type TCallback = (event: KeyboardEvent) => void;
export type TDownCallback = (event: KeyboardEvent) => void;
export type TUpCallback = (event: KeyboardEvent) => void;
