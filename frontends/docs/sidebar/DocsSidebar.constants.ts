import { IDocsSidebarLink } from './DocsSidebar.types';

export const DOCS_SIDEBAR_LINKS: IDocsSidebarLink[] = [
  {
    name: 'Maqola yozish',
    url: 'write-article',
    children: [
      {
        name: 'Kirish',
        url: 'introduction',
        children: [{ name: 'Tezkor boshlash', url: 'quick-start' }],
      },
      {
        name: 'Imkoniyatlar',
        url: 'features',
        children: [
          { name: 'Sarlavha', url: 'header' },
          { name: 'Matn', url: 'text' },
          { name: 'Rasm', url: 'image' },
          { name: 'Kod', url: 'code' },
          { name: 'Ro`yxat', url: 'list' },
          { name: 'Ajratuvchi', url: 'delimeter' },
          { name: 'Ogohlantiruvchi', url: 'alert' },
        ],
      },
      {
        name: 'Sozlamalar',
        url: 'settings',
        children: [
          { name: 'Teglar', url: 'tegs' },
          { name: 'Statuslar', url: 'statuses' },
          { name: 'Saqlash', url: 'save' },
          { name: 'Chop etish', url: 'publish' },
          { name: 'Bekor qilish', url: 'unpublish' },
          { name: 'O`chirish', url: 'delete' },
        ],
      },
    ],
  },
  {
    name: 'Blog yuritish',
    url: 'blogging',
    children: [
      {
        name: 'Sozlamalar',
        url: 'settings',
        children: [
          // {
          //   name: 'Siz haqingizda',
          //   url: 'about-you',
          // },
          {
            name: '"Hissa qo\'shish" hizmati',
            url: 'support',
          },
          // {
          //   name: 'Havfsizlik',
          //   url: 'security',
          // },
        ],
      },
    ],
  },
];
