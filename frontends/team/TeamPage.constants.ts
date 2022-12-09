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
        url: 'https://uppser.uz/blogs/2',
        icon: ICONS.blackLogo,
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
        url: 'https://upper.uz/blogs/2',
        icon: ICONS.blackLogo,
      },
    ],
  },
];
