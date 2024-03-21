import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

const mockPush = vi.fn();

vi.doMock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('hooks/useAppRouter', () => {
  it('render', async () => {
    const { useAppRouter } = await import('./useAppRouter');
    const { result } = renderHook(useAppRouter);
    result.current.push('/user/articles');
    expect(mockPush).toHaveBeenCalledWith('/web/user/articles');
  });
});
