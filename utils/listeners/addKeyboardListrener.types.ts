export type TKey = 'Enter' | 'Escape';

export interface ICombination {
  key: TKey;
  ctrlKey?: boolean;
  metaKey?: boolean;
}

export interface IKeyboardListener {
  clear: () => void;
}

export type TCombinationKey = keyof ICombination;

export type TCallback = (event: KeyboardEvent) => void;
