import { TArticleStatus } from 'types';
import { ARTICLE_STATUSES } from 'variables/article';

import {
  IArticleSidebarAction,
  IUserArticleModalContent,
  TArticleAction,
} from './UserArticlesSidebar.types';

export const ARTICLE_ACTIONS: Record<TArticleAction, TArticleAction> = {
  delete: 'delete',
  publish: 'publish',
  restore: 'restore',
  save: 'save',
};

export const ARTICLE_SIDEBAR_MODAL_CONTENTS: Record<TArticleAction, IUserArticleModalContent> = {
  delete: {
    text: 'o`chirmoqchimisiz',
    btn: {
      text: 'O`chirish',
      status: ARTICLE_STATUSES.DELETED,
      color: 'outline-red',
    },
  },
  publish: {
    text: 'nashr qilmoqchimisiz',
    btn: {
      text: 'Nashr qilish',
      status: ARTICLE_STATUSES.PUBLISHED,
    },
  },
  restore: {
    text: 'tiklamoqchimisiz',
    btn: {
      text: 'Tiklash',
      status: ARTICLE_STATUSES.SAVED,
    },
  },
  save: {
    text: 'saqlamoqchimisiz',
    btn: {
      text: 'Saqlash',
    },
  },
};

export const ARTICLE_SIDEBAR_ACTIONS: Record<TArticleAction, IArticleSidebarAction> = {
  delete: {
    text: 'O`chirish',
    action: ARTICLE_ACTIONS.delete,
    color: 'outline-red',
    shouldOpenModal: true,
  },
  publish: {
    text: 'Nashr qilish',
    action: ARTICLE_ACTIONS.publish,
    shouldOpenModal: true,
  },
  restore: {
    text: 'Tiklash',
    action: ARTICLE_ACTIONS.restore,
    shouldOpenModal: true,
  },
  save: {
    text: 'Saqlash',
    action: ARTICLE_ACTIONS.save,
  },
};

export const ARTICLE_SIDEBAR_BUTTONS: Record<TArticleStatus, IArticleSidebarAction[]> = {
  SAVED: [
    ARTICLE_SIDEBAR_ACTIONS.delete,
    ARTICLE_SIDEBAR_ACTIONS.publish,
    ARTICLE_SIDEBAR_ACTIONS.save,
  ],
  PUBLISHED: [ARTICLE_SIDEBAR_ACTIONS.delete, ARTICLE_SIDEBAR_ACTIONS.save],
  DELETED: [ARTICLE_SIDEBAR_ACTIONS.restore],
};
