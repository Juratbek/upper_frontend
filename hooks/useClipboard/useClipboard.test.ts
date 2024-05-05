import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useClipboard } from './useClipboard';

vi.useFakeTimers();

describe('hooks/useClipboard', () => {
  it('render', () => {
    const { result } = renderHook(useClipboard);
    expect(result.current).toEqual({
      isCopied: false,
      isError: false,
      isLoading: false,
      writeText: expect.any(Function),
    });
  });

  it('writeText', async () => {
    const text = 'Text from clipboard';
    const mockWriteText = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: { writeText: mockWriteText },
    });
    const { result } = renderHook(useClipboard);
    await act(() => result.current.writeText(text));
    expect(mockWriteText).toHaveBeenCalledWith(text);

    expect(result.current).toEqual({
      isCopied: true,
      isError: false,
      isLoading: false,
      writeText: expect.any(Function),
    });
  });

  it('states should be cleared after 2 second', async () => {
    const text = 'Text from clipboard';
    const mockWriteText = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: { writeText: mockWriteText },
    });
    const { result } = renderHook(useClipboard);
    await act(() => result.current.writeText(text));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toEqual({
      isCopied: false,
      isError: false,
      isLoading: false,
      writeText: expect.any(Function),
    });
  });
});
