import {
  ICombination,
  IKeyboardListener,
  TCallback,
  TCombinationKey,
  TDownCallback,
  TUpCallback,
} from './addKeyboardListrener.types';

export const addKeyboardListeners = (
  combinations: ICombination[],
  downCallback: TDownCallback,
  upCallBack?: TUpCallback,
): IKeyboardListener => {
  function keyboardListener(event: KeyboardEvent): void {
    combinations.forEach((combination) => {
      const combinationKeys = Object.keys(combination) as TCombinationKey[];
      const doesMatch = combinationKeys.reduce((res, key) => {
        return event[key] !== combination[key] ? false : res;
      }, true);
      if (doesMatch) downCallback(event);
    });
  }

  function keyupListener(event: KeyboardEvent): void {
    upCallBack && upCallBack(event);
  }

  window.addEventListener('keydown', keyboardListener);
  window.addEventListener('keyup', keyupListener);
  const clear = (): void => {
    window.removeEventListener('keydown', keyboardListener);
    window.removeEventListener('keyup', keyupListener);
  };
  return {
    clear,
  };
};

export const addKeyboardListener = (
  combination: ICombination,
  callback: TCallback,
): IKeyboardListener => {
  function keyboardListener(event: KeyboardEvent): void {
    const combinationKeys = Object.keys(combination) as TCombinationKey[];
    const doesMatch = combinationKeys.reduce((res, key) => {
      return event[key] !== combination[key] ? false : res;
    }, true);
    if (doesMatch) callback(event);
  }

  window.addEventListener('keydown', keyboardListener);
  const clear = (): void => {
    window.removeEventListener('keydown', keyboardListener);
  };
  return {
    clear,
  };
};
