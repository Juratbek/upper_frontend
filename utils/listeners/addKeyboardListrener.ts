import {
  ICombination,
  IKeyboardListener,
  TCallback,
  TCombinationKey,
} from './addKeyboardListrener.types';

export const addKeyboardListener = (
  combinations: ICombination[],
  callback: TCallback,
): IKeyboardListener => {
  function keyboardListener(event: KeyboardEvent): void {
    combinations.forEach((combination) => {
      const combinationKeys = Object.keys(combination) as TCombinationKey[];
      const doesMatch = combinationKeys.reduce((res, key) => {
        return event[key] !== combination[key] ? false : res;
      }, true);
      if (doesMatch) callback(event);
    });
  }

  window.addEventListener('keydown', keyboardListener);
  const clear = (): void => {
    window.removeEventListener('keydown', keyboardListener);
  };
  return {
    clear,
  };
};
