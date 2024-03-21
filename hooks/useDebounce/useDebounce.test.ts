import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useDebounce } from './useDebounce';

vi.useFakeTimers();

describe('hooks/useDebounce', () => {
  it('debounces a value', () => {
    const value = 'Debounced value';
    const { result } = renderHook(() => useDebounce(value));
    expect(result.current).toEqual('');
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toEqual(value);
  });

  it('debounces a value in given time', () => {
    const value = 'Debounced value';
    const { result } = renderHook(() => useDebounce(value, 1000));
    expect(result.current).toEqual('');
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toEqual(value);
  });
});
