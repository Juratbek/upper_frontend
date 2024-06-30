import { LinkedInIcon, LogoIcon } from 'components/icons';

import { ITeamMember } from './TeamPage.types';

export const team: ITeamMember[] = [
  {
    name: "Jur'atbek",
    imgUrl: '/team/juratbek.jpg',
    position: 'Asoschi',
    links: [
      {
        url: 'https://www.linkedin.com/in/jur-atbek-mahammadaliyev-b66396203',
        icon: LinkedInIcon,
      },
      {
        url: '/blogs/1',
        icon: LogoIcon,
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
        icon: LinkedInIcon,
      },
      {
        url: '/blogs/5',
        icon: LogoIcon,
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
        icon: LinkedInIcon,
      },
      {
        url: '/blogs/207',
        icon: LogoIcon,
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
