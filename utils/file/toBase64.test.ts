import { vi } from 'vitest';

import { toBase64 } from './toBase64';

describe('toBase64', () => {
  it('should convert a file to base64', async () => {
    const file = new File(['file contents'], 'filename.txt', { type: 'text/plain' });
    const result = await toBase64(file);

    const regex = new RegExp('data:text/plain;base64,');
    expect(result).toMatch(regex);
  });

  it('should reject with an error if file reading fails', async () => {
    // Create a mock File object
    const file = new File(['file contents'], 'filename.txt', { type: 'text/plain' });

    // Override FileReader.prototype.readAsDataURL to simulate an error
    const readAsDataURL = vi.fn().mockImplementation(() => {
      throw new Error('Read error');
    });
    FileReader.prototype.readAsDataURL = readAsDataURL;

    // Call the toBase64 function and expect it to reject with an error
    await expect(toBase64(file)).rejects.toThrow('Read error');
  });
});
