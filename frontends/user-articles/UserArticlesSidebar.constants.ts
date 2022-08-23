import { ARTICLE_STATUSES } from 'variables/article';

export const ARTICLE_SIDEBAR_CONTENTS = {
  [ARTICLE_STATUSES.PUBLISHED]: {
    text: 'Bekor qilish',
    callback: console.log,
  },
  [ARTICLE_STATUSES.DRAFT]: {
    text: 'Chop etish',
    callback: console.log,
  },
  [ARTICLE_STATUSES.DELETED]: {
    text: 'Tiklash',
    callback: console.log,
  },
  [ARTICLE_STATUSES.UNPUBLISHED]: {
    text: 'Qayta nashr qilish',
    callback: console.log,
  },
};

export const ARTICLE_ACTION_BUTTONS = {
  PUBLISH: 'PUBLISH',
  SAVE: 'SAVE',
  DELETE: 'DELETE',
  UNPUBLISH: 'UNPUBLISH',
};

export const ARTICLE_STATUS_BUTTONS = {
  [ARTICLE_ACTION_BUTTONS.UNPUBLISH]: [ARTICLE_STATUSES.PUBLISHED],
};

export {};
