import { FC } from 'react';
import { ACTION_TYPES, ICON_TYPES } from 'variables';

export interface ITabHeader {
  name: string;
  id: string;
  active?: boolean;
  private?: boolean;
  defaultSelected?: boolean;
}

export interface ITabBody {
  [tabId: string]: FC;
}

export type TAction = typeof ACTION_TYPES.delete | typeof ACTION_TYPES.markAsRead;

export type TIcon = keyof typeof ICON_TYPES;

export type TIconComponent = ({ color }: { color?: string }) => JSX.Element;

export type TClassName = string | undefined | Record<string, string> | boolean;

export interface IGetServerSideProps<T = Record<string, never>> {
  props?: T;
  redirect?: {
    destination: string;
  };
}

export type TAuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface ILink {
  type: TIcon;
  link: string;
}

export interface ITag {
  id: number;
  name: string;
}
