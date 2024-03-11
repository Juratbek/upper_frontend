import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useUrlParams } from './useUrlParams';

const { mockPush, pathname, query } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  pathname: '/web',
  query: { tag: 'JavaScript' },
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    query,
    push: mockPush,
    pathname,
    isReady: true,
  })),
}));

describe('hooks/useUrlParams', () => {
  it('returns labels param from url query', async () => {
    const {
      result: { current },
    } = renderHook(useUrlParams);
    const label = current.getParam('tag');
    expect(label).toEqual('JavaScript');
  });

  it("returns undefined if param doesn't exist in url query", () => {
    const {
      result: { current },
    } = renderHook(useUrlParams);
    const label = current.getParam('label');
    expect(label).toEqual(undefined);
  });

  it('calls mock push on setParam', () => {
    const {
      result: { current },
    } = renderHook(useUrlParams);
    current.setParam('tag', 'Java');
    expect(mockPush).toHaveBeenCalledWith({
      pathname,
      query: { ...query, tag: 'Java' },
    });
  });

  it('calls mock push on setParams', () => {
    const {
      result: { current },
    } = renderHook(useUrlParams);
    const params = { label: 'Java', userId: '1' };
    current.setParams(params);
    expect(mockPush).toHaveBeenCalledWith({
      pathname,
      query: { ...query, ...params },
    });
  });
});
