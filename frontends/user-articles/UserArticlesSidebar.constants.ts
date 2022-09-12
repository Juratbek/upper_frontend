import { ARTICLE_STATUSES } from 'variables/article';

import { IArticleSidebarContents, IArticleSidebarModalContents } from './UserArticlesSidebar.types';

export const ARTICLE_ACTIONS = {
  delete: 'delete',
  fullDelete: 'fullDelete',
  publish: 'publish',
  unpublish: 'unpublish',
  restore: 'restore',
  republish: 'republish',
};

export const ARTICLE_SIDEBAR_MODAL_CONTENTS: IArticleSidebarModalContents = {
  [ARTICLE_STATUSES.PUBLISHED]: {
    [ARTICLE_ACTIONS.delete]: {
      text: 'o`chirmoqchimisiz',
      btn: {
        text: 'O`chirish',
        color: 'outline-red',
      },
    },
    [ARTICLE_ACTIONS.unpublish]: {
      text: 'nashr qilishni bekor qilmoqchimisiz?',
      btn: {
        text: 'Nashrni bekor qilish',
        color: 'outline-dark',
      },
    },
  },
  [ARTICLE_STATUSES.SAVED]: {
    [ARTICLE_ACTIONS.delete]: {
      text: 'o`chirmoqchimisiz',
      btn: {
        text: 'O`chirish',
        color: 'outline-red',
      },
    },
    [ARTICLE_ACTIONS.publish]: {
      text: 'nashr qilmoqchimisiz',
      btn: {
        text: 'Nashr qilish',
      },
    },
  },
  [ARTICLE_STATUSES.DELETED]: {
    [ARTICLE_ACTIONS.fullDelete]: {
      text: 'o`chirmoqchimisiz',
      btn: {
        text: 'O`chirish',
        color: 'outline-red',
      },
    },
    [ARTICLE_ACTIONS.restore]: {
      text: 'tiklamoqchimisiz',
      btn: {
        text: 'Tiklash',
      },
    },
  },
  [ARTICLE_STATUSES.UNPUBLISHED]: {
    [ARTICLE_ACTIONS.delete]: {
      text: 'o`chirmoqchimisiz',
      btn: {
        text: 'O`chirish',
        color: 'outline-red',
      },
    },
    [ARTICLE_ACTIONS.republish]: {
      text: 'qayta nashr qilmoqchimisiz?',
      btn: {
        text: 'Qayta nashr qilish',
      },
    },
  },
};

export const ARTICLE_SIDEBAR_CONTENTS: IArticleSidebarContents = {
  [ARTICLE_STATUSES.PUBLISHED]: {
    text: 'Nashrni bekor qilish',
    action: ARTICLE_ACTIONS.unpublish,
    color: 'outline-dark',
  },
  [ARTICLE_STATUSES.SAVED]: {
    text: 'Nashr qilish',
    action: ARTICLE_ACTIONS.publish,
  },
  [ARTICLE_STATUSES.DELETED]: {
    text: 'Tiklash',
    action: ARTICLE_ACTIONS.restore,
  },
  [ARTICLE_STATUSES.UNPUBLISHED]: {
    text: 'Qayta nashr qilish',
    action: ARTICLE_ACTIONS.republish,
  },
};
