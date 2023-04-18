import { ICONS } from 'variables';

import { ITeamMember } from './TeamPage.types';

export const team: ITeamMember[] = [
  {
    name: "Jur'atbek",
    imgUrl: '/team/juratbek.jpg',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/jur-atbek-mahammadaliyev-b66396203',
        icon: ICONS.linkedIn,
        target: '_self',
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
        target: '_self',
      },
      {
        url: '/blogs/5',
        icon: ICONS.logoIcon,
        target: '_self',
      },
    ],
  },
  {
    name: 'Ayyubxon',
    imgUrl: '/team/ayyubxon.jpg',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/ayyubxon-kamoldinov/',
        icon: ICONS.linkedIn,
        target: '_blank',
      },
      {
        url: '/blogs/20',
        icon: ICONS.logoIcon,
        target: '_blank',
      },
    ],
  },
  {
    name: 'Musojon',
    imgUrl: '/team/musojon.jpg',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/musojon-tursunov/',
        icon: ICONS.linkedIn,
      },
      {
        url: '/blogs/207',
        icon: ICONS.logoIcon,
        target: '_self',
      },
    ],
  },
];
