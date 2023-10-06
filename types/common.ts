import { IncomingMessage, ServerResponse } from 'http';
import { FC } from 'react';
import { ICONS } from 'variables';

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

export type TIcon = keyof typeof ICONS;

export interface IIconProps {
  color?: string;
  width?: number;
  height?: number;
}

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
