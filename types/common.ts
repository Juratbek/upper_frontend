import { IncomingMessage, ServerResponse } from 'http';
import { FC } from 'react';
import { ICON_TYPES } from 'variables';

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

export type TIcon = keyof typeof ICON_TYPES;

export type TIconComponent = (params: {
  color?: string;
  width?: number;
  height?: number;
}) => JSX.Element;

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

export type TFn = (...args: unknown[]) => unknown;

export type TNoop = () => void;

export interface IServerSideContext {
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  };
  res: ServerResponse;
}
