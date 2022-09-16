import { TButtonColor } from 'components';
import { TArticleStatus } from 'types';

export type TArticleAction =
  | 'delete'
  | 'fullDelete'
  | 'publish'
  | 'republish'
  | 'restore'
  | 'unpublish'
  | 'save';

export interface IUserArticleModalContent {
  text: string;
  btn: {
    text: string;
    color?: TButtonColor;
    status?: TArticleStatus;
  };
}

export interface IArticleSidebarAction {
  text: string;
  action: TArticleAction;
  color?: TButtonColor;
  shouldOpenModal?: boolean;
}
