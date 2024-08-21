import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';
import { INotification } from 'types';
import { Override } from 'utils';
import { vi } from 'vitest';

import { Notifications } from './Notifications';

const mockArticle: INotification['article'] = {
  id: 1,
  title: 'Vitest mocking',
};

const mockAuthor: INotification['author'] = {
  id: 12,
  imgUrl: 'https://image.upper.uz/12',
  name: 'Aziz',
};

const mockNotifications: INotification[] = [
  {
    article: mockArticle,
    author: mockAuthor,
    createdDate: '12.10.2024',
    id: 10,
    status: 'UNREAD',
    type: 'ARTICLE_PUBLISHED',
  },
  {
    article: mockArticle,
    author: mockAuthor,
    createdDate: '12.10.2024',
    id: 11,
    status: 'UNREAD',
    type: 'ARTICLE_PUBLISHED',
  },
  {
    article: mockArticle,
    author: mockAuthor,
    createdDate: '12.10.2024',
    id: 12,
    status: 'READ',
    type: 'COMMENT',
  },
  {
    article: mockArticle,
    author: mockAuthor,
    createdDate: '12.10.2024',
    id: 13,
    status: 'UNREAD',
    type: 'LIKED',
  },
];

const mocks = vi.hoisted(() => ({
  useNotificationsList: vi.fn().mockReturnValue({ list: [], isPending: true, isLoading: true }),
}));

vi.mock('store/clients/notification', async (importOriginal) => {
  const original = await importOriginal<typeof import('store/clients/notification')>();

  return {
    ...original,
    useNotificationsList: mocks.useNotificationsList,
  };
});

const Component = (
  <ReduxWrapper>
    <QueryWrapper>
      <Notifications />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('Notifications page', () => {
  it('snapshot', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('renders notifications data from api', () => {
    mocks.useNotificationsList.mockReturnValue({
      isPending: false,
      isLoading: false,
      isSuccess: true,
      list: mockNotifications,
    });
    render(Component);

    expect(document.body).toMatchSnapshot();
  });

  it('renders with Fetch Next Page button', () => {
    mocks.useNotificationsList.mockReturnValue({
      isPending: false,
      isLoading: false,
      isSuccess: true,
      hasNextPage: true,
      list: mockNotifications,
    });
    render(Component);

    expect(document.body).toMatchSnapshot();
  });

  it('renders empty list UI', () => {
    mocks.useNotificationsList.mockReturnValue({
      isPending: false,
      isLoading: false,
      isSuccess: true,
      list: [],
    });
    render(Component);

    expect(document.body).toMatchSnapshot();
  });

  it('renders nothing if Notification component for notification type is not found', () => {
    const mockNotification: Override<INotification, { type: string }> = {
      article: mockArticle,
      author: mockAuthor,
      createdDate: '12.10.2024',
      id: 13,
      status: 'UNREAD',
      type: 'NOT_SUPPORTED',
    };

    mocks.useNotificationsList.mockReturnValue({
      isPending: false,
      isLoading: false,
      isSuccess: true,
      hasNextPage: false,
      list: [mockNotification],
    });
    render(Component);

    expect(document.body).toMatchSnapshot();
  });
});
