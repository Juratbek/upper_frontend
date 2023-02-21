import { ICONS } from 'variables';

import { ITeamMember } from './TeamPage.types';

export const team: ITeamMember[] = [
  {
    name: "Jur'atbek",
    imgUrl: '/team/jurat.jpeg',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/jur-atbek-mahammadaliyev-b66396203',
        icon: ICONS.linkedIn,
      },
      {
        url: '/blogs/1',
        icon: ICONS.logoIcon,
        target: '_self',
      },
    ],
  },
  {
    name: 'Samandar',
    imgUrl: '/team/samandar_1.jpg',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/boymurodov-samandar',
        icon: ICONS.linkedIn,
      },
      {
        url: '/blogs/5',
        icon: ICONS.logoIcon,
        target: '_self',
      },
    ],
  },
];
