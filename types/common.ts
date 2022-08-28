import { FC } from 'react';
import { ACTION_TYPES, ICON_TYPES } from 'variables';

export interface ITabHeader {
  name: string;
  id: string;
  active?: boolean;
}

export interface ITabBody {
  [tabId: string]: FC;
}

export type TAction = typeof ACTION_TYPES.delete | typeof ACTION_TYPES.markAsRead;

export type TIcon =
  | typeof ICON_TYPES.delete
  | typeof ICON_TYPES.save
  | typeof ICON_TYPES.home
  | typeof ICON_TYPES.user
  | typeof ICON_TYPES.menuList
  | typeof ICON_TYPES.notification
  | typeof ICON_TYPES.pen
  | typeof ICON_TYPES.facebook
  | typeof ICON_TYPES.search
  | typeof ICON_TYPES.eye
  | typeof ICON_TYPES.telegram
  | typeof ICON_TYPES.google
  | typeof ICON_TYPES.github
  | typeof ICON_TYPES.comment
  | typeof ICON_TYPES.like
  | typeof ICON_TYPES.dislike
  | typeof ICON_TYPES.share
  | typeof ICON_TYPES.next
  | typeof ICON_TYPES.prev;

export interface IIcon {
  [name: TIcon]: FC<{ color?: string }>;
}

export type TClassName = string | undefined | Record<string, string>;

export interface IGetServerSideProps<T = Record<string, never>> {
  props?: T;
  redirect?: {
    destination: string;
  };
}
