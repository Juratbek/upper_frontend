import { act, fireEvent, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useShortCut } from './useShortCut';

describe('hooks/useShortCut', () => {
  it('adds event listeners', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(useShortCut);

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));
  });

  it('removes event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(useShortCut);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));
  });

  it('changes return value on keydown and keyup', () => {
    const { result } = renderHook(() => useShortCut('A'));
    expect(result.current).toEqual(false);

    act(() => fireEvent.keyDown(window, { key: 'A', code: 'KeyA', metaKey: true }));
    expect(result.current).toEqual(true);

    act(() => fireEvent.keyUp(window));
    expect(result.current).toEqual(false);
  });

  it('changes return value on keydown and keyup', () => {
    const { result } = renderHook(() => useShortCut('A'));
    expect(result.current).toEqual(false);

    act(() => fireEvent.keyDown(window, { key: 'A', code: 'KeyA', ctrlKey: true }));
    expect(result.current).toEqual(true);

    act(() => fireEvent.keyUp(window));
    expect(result.current).toEqual(false);
  });

  it("doesn't change return value on keydown and keyup if key doesn't match", () => {
    const { result } = renderHook(() => useShortCut('B'));
    expect(result.current).toEqual(false);

    act(() => fireEvent.keyDown(window, { key: 'A', code: 'KeyA', ctrlKey: true }));
    expect(result.current).toEqual(false);
  });
});
