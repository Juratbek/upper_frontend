import { TArticleStatus } from 'types';
import { ARTICLE_STATUSES } from 'variables/article';

import {
  IArticleSidebarAction,
  IUserArticleModalContent,
  TArticleAction,
} from './UserArticlesSidebar.types';

export const ARTICLE_ACTIONS: Record<TArticleAction, TArticleAction> = {
  delete: 'delete',
  fullDelete: 'fullDelete',
  publish: 'publish',
  unpublish: 'unpublish',
  restore: 'restore',
  republish: 'republish',
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
  fullDelete: {
    text: 'keshdan o`chirmoqchimisiz',
    btn: {
      text: 'O`chirish',
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
  unpublish: {
    text: 'nashrni bekor qilmoqchimisiz',
    btn: {
      text: 'Nashrni bekor qilish',
      status: ARTICLE_STATUSES.UNPUBLISHED,
      color: 'outline-red',
    },
  },
  restore: {
    text: 'tiklamoqchimisiz',
    btn: {
      text: 'Tiklash',
      status: ARTICLE_STATUSES.SAVED,
    },
  },
  republish: {
    text: 'qayta nashr qilmoqchimisiz',
    btn: {
      text: 'Qayta nashr qilish',
      status: ARTICLE_STATUSES.PUBLISHED,
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
  fullDelete: {
    text: 'O`chirish',
    action: ARTICLE_ACTIONS.fullDelete,
    color: 'outline-red',
    shouldOpenModal: true,
  },
  publish: {
    text: 'Nashr qilish',
    action: ARTICLE_ACTIONS.publish,
    shouldOpenModal: true,
  },
  unpublish: {
    text: 'Nashrni bekor qilish',
    action: ARTICLE_ACTIONS.unpublish,
    color: 'outline-dark',
    shouldOpenModal: true,
  },
  restore: {
    text: 'Tiklash',
    action: ARTICLE_ACTIONS.restore,
    shouldOpenModal: true,
  },
  republish: {
    text: 'Qayta nashr qilish',
    action: ARTICLE_ACTIONS.republish,
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
  PUBLISHED: [
    ARTICLE_SIDEBAR_ACTIONS.delete,
    ARTICLE_SIDEBAR_ACTIONS.publish,
    ARTICLE_SIDEBAR_ACTIONS.save,
  ],
  UNPUBLISHED: [
    ARTICLE_SIDEBAR_ACTIONS.delete,
    ARTICLE_SIDEBAR_ACTIONS.republish,
    ARTICLE_SIDEBAR_ACTIONS.save,
  ],
  DELETED: [],
};
