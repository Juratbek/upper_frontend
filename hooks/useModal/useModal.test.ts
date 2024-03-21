import { act, renderHook } from '@testing-library/react';

import { useModal } from './useModal';

describe('hooks/useModal', () => {
  it('render default value', () => {
    const { result } = renderHook(useModal);
    expect(result.current).toEqual([
      false,
      expect.any(Function),
      { open: expect.any(Function), close: expect.any(Function) },
    ]);
  });

  it('toggles state', () => {
    const { result } = renderHook(useModal);
    const { current } = result;
    let [isOpen, toggle] = current;
    expect(isOpen).toEqual(false);
    act(toggle);
    [isOpen, toggle] = result.current;
    expect(isOpen).toEqual(true);
    act(toggle);
    [isOpen] = result.current;
    expect(isOpen).toEqual(false);
  });

  it('opens/closes modal', () => {
    const { result } = renderHook(useModal);
    const { current } = result;
    let [isOpen, , { close, open }] = current;
    expect(isOpen).toEqual(false);
    act(open);
    [isOpen, , { close, open }] = result.current;
    expect(isOpen).toEqual(true);
    act(close);
    [isOpen] = result.current;
    expect(isOpen).toEqual(false);
  });
});
