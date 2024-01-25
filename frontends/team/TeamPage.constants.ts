import { ICONS } from 'variables';

import { ITeamMember } from './TeamPage.types';

export const team: ITeamMember[] = [
  {
    name: "Jur'atbek",
    imgUrl: '/team/juratbek.jpg',
    position: 'Asoschi',
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
    position: 'Asoschi',
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
  {
    name: 'Musojon',
    imgUrl: '/team/musojon.jpg',
    position: 'Frontend Dasturchi',
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
  {
    name: "Og'abek Yusufov",
    imgUrl: '',
    position: 'Web Dizayner',
    links: [],
  },
  {
    name: 'Azimjon Nazarov',
    imgUrl: '',
    position: 'Backend Dasturchi',
    links: [],
  },
  {
    name: 'Sobirjon',
    imgUrl: '',
    position: 'Backend Dasturchi',
    links: [],
  },
];
