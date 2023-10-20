import { ICONS } from 'variables';

import { ITeamMember } from './TeamPage.types';

export const team: ITeamMember[] = [
  {
    name: "Jur'atbek",
    imgUrl: '/team/juratbek.jpg',
    position: 'CEO',
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
    position: 'Lead Software Engineer',
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
    name: 'Ayyubxon',
    imgUrl: '/team/ayyubxon.jpg',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/ayyubxon-kamoldinov/',
        icon: ICONS.linkedIn,
      },
      {
        url: '/blogs/20',
        icon: ICONS.logoIcon,
        target: '_self',
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
  {
    name: 'Shahzod',
    imgUrl:
      'https://media.licdn.com/dms/image/C4D03AQGgn61ucuORPw/profile-displayphoto-shrink_800_800/0/1646602440521?e=1703116800&v=beta&t=zaYUYq_oy3FTMDD2wgTmqiDDWHkg8wzG-08Q43W89-c',
    position: 'Software Development Engineer',
    links: [
      {
        url: 'https://www.linkedin.com/in/shakhzod-bobolov',
        icon: ICONS.linkedIn,
      },
      {
        url: '/blogs/233',
        icon: ICONS.logoIcon,
        target: '_self',
      },
    ],
  },
];
