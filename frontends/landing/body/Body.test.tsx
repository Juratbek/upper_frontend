import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';
import { IPublishedArticleItem } from 'types';
import { vi } from 'vitest';

import { Body } from './Body';

const mockAuthor: IPublishedArticleItem['author'] = {
  id: 12,
  imgUrl: 'https://image.upper.uz/12',
  name: "Jur'atbek",
};

const mockArticles: IPublishedArticleItem[] = [
  {
    id: 1,
    imgUrl: 'https://image.upper.uz/1',
    title: 'Published article',
    author: mockAuthor,
  },
  {
    id: 2,
    imgUrl: 'https://image.upper.uz/2',
    title: 'Second published article',
    author: mockAuthor,
  },
  {
    id: 3,
    imgUrl: '',
    title: 'Third published article',
    author: mockAuthor,
  },
];

const mocks = vi.hoisted(() => ({
  usePublishedArticlesList: vi.fn().mockReturnValue({
    fetchNextPage: vi.fn(),
    list: [],
    hasNextPage: false,
    isLoading: true,
    isPending: true,
  }),
}));

vi.mock('store/clients/published-article', () => ({
  usePublishedArticlesList: mocks.usePublishedArticlesList,
}));

const Component = (
  <ReduxWrapper>
    <QueryWrapper>
      <Body />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('Landing page Body', () => {
  it('snapshot', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('snapshot with articles returned by backend', () => {
    mocks.usePublishedArticlesList.mockReturnValue({
      list: mockArticles,
      fetchNextPage: vi.fn(),
      isLoading: false,
      isPending: false,
      isSuccess: true,
      hasNextPage: true,
    });

    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('snapshot with empty articles returned by backend', () => {
    mocks.usePublishedArticlesList.mockReturnValue({
      list: [],
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isLoading: false,
      isPending: false,
      isSuccess: true,
    });

    render(Component);
    expect(document.body).toMatchSnapshot();
  });
});
