import { TButtonColor } from 'components';
import { TArticleStatus } from 'types';

import { ARTICLE_ACTIONS } from './UserArticlesSidebar.constants';

export type TArticleAction =
  | typeof ARTICLE_ACTIONS.delete
  | typeof ARTICLE_ACTIONS.fullDelete
  | typeof ARTICLE_ACTIONS.publish
  | typeof ARTICLE_ACTIONS.republish
  | typeof ARTICLE_ACTIONS.restore
  | typeof ARTICLE_ACTIONS.unpublish;

export interface IArticleSidebarModalContents {
  [status: TArticleStatus]: {
    [action: TArticleAction]: {
      text: string;
      btn: {
        text: string;
        color?: TButtonColor;
      };
    };
  };
}

export interface IArticleSidebarContents {
  [status: TArticleStatus]: {
    text: string;
    action: TArticleAction;
    color?: TButtonColor;
  };
}
