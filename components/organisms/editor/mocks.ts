import { vi } from 'vitest';

import { IEditorAPI } from './context';

export const mockApi: IEditorAPI = {
  addBlock: vi.fn(),
  addBlocks: vi.fn(),
  hideInlineToolbar: vi.fn(),
  mergeWithPrevBlock: vi.fn(),
  moveBlockDown: vi.fn(),
  removeBlock: vi.fn(),
  setBlock: vi.fn(),
  showInlineToolbar: vi.fn(),
  moveBlockUp: vi.fn(),
};
