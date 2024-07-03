import { render } from '@testing-library/react';
import { HomeIcon, NotificationIcon, WriteIcon } from 'components/icons';

import { Navigation } from './Navigation';
import { INavigation } from './Navigation.types';

const mock: INavigation[] = [
  {
    href: '/home',
    text: 'Home',
    icon: HomeIcon,
  },
  {
    href: '/notifications',
    text: 'Notifications',
    badge: '+9',
    icon: NotificationIcon,
  },
  {
    href: '/articles',
    text: 'Articles',
    icon: WriteIcon,
  },
];

describe('Navigation', () => {
  it('render', () => {
    render(<Navigation items={mock} />);
    expect(document.body).toMatchSnapshot();
  });
});
