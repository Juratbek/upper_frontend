import { TButtonColor } from 'components';
import { TArticleStatus } from 'types';

export type TArticleAction = 'delete' | 'publish' | 'restore' | 'save';

export interface IUserArticleModalContent {
  text: string;
  btn: {
    text: string;
    color?: TButtonColor;
    status?: TArticleStatus;
    shouldValidate?: boolean;
  };
}

export interface IArticleSidebarAction {
  text: string;
  action: TArticleAction;
  color?: TButtonColor;
  shouldOpenModal?: boolean;
}
