import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useBeforeUnload } from './useBeforeUnload';

describe('hooks/useBeforeUnload', () => {
  it('adds event listener', () => {
    const windowListenerSpy = vi.spyOn(window, 'addEventListener');
    const windowRemoveListenerSpy = vi.spyOn(window, 'removeEventListener');
    renderHook(useBeforeUnload);
    expect(windowListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    expect(windowRemoveListenerSpy).not.toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    const windowRemoveListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(useBeforeUnload);
    unmount();
    expect(windowRemoveListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });
});
