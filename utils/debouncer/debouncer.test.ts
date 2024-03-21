import { act } from '@testing-library/react';
import { vi } from 'vitest';

import { debouncer } from './debouncer';

vi.useFakeTimers();

describe('utils/debouncer', () => {
  it('debounces a value', () => {
    const debounce = debouncer<string>(500);

    const value = 'Some value';
    const mockCallback = vi.fn();

    debounce(value, mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(500));

    expect(mockCallback).toHaveBeenCalled();
  });

  it('debounces a value', () => {
    const debounce = debouncer<string>(500);

    const value = 'Some value';
    const mockOnClear = vi.fn();

    debounce(value, vi.fn(), { onClear: mockOnClear, ms: 2000 });
    expect(mockOnClear).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(500));

    debounce(value, vi.fn(), { onClear: mockOnClear, ms: 2000 });
    expect(mockOnClear).toHaveBeenCalled();
  });
});
