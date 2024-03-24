import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { addKeyboardListener, addKeyboardListeners } from './addKeyboardListener';

describe('addKeyboardListener', () => {
  it('calls callback on key press', () => {
    const mockFn = vi.fn();
    addKeyboardListener({ key: 'Enter' }, mockFn);
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("doesn't call callback on key press without ctrl or meta key", () => {
    const mockFn = vi.fn();
    addKeyboardListener({ key: 'Enter', ctrlKey: true }, mockFn);
    fireEvent.keyDown(window, { key: 'Enter', ctrlKey: false });
    expect(mockFn).not.toHaveBeenCalled();

    addKeyboardListener({ key: 'Enter', metaKey: true }, mockFn);
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("doesn't call callback after clearing it", () => {
    const mockFn = vi.fn();
    const { clear } = addKeyboardListener({ key: 'Enter' }, mockFn);
    clear();

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockFn).not.toHaveBeenCalled();
  });
});

describe('addKeyboardListeners', () => {
  it('calls callback on key press', () => {
    const mockFn = vi.fn();
    addKeyboardListeners([{ key: 'Enter' }], mockFn);
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("doesn't call callback on key press without ctrl or meta key", () => {
    const mockFn = vi.fn();
    addKeyboardListeners([{ key: 'Enter', ctrlKey: true }], mockFn);
    fireEvent.keyDown(window, { key: 'Enter', ctrlKey: false });
    expect(mockFn).not.toHaveBeenCalled();

    addKeyboardListeners([{ key: 'Enter', metaKey: true }], mockFn);
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("doesn't call callback after clearing it", () => {
    const mockFn = vi.fn();
    const { clear } = addKeyboardListeners([{ key: 'Enter' }], mockFn);
    clear();

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(mockFn).not.toHaveBeenCalled();
  });
});
