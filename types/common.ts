import { IncomingMessage, ServerResponse } from 'http';
import { FC } from 'react';

export interface ITabHeader {
  name: string;
  id: string;
}

export interface ITabBody {
  [tabId: string]: FC;
}

export interface IIconProps {
  color?: string;
  variant?: 'outlined' | 'fulfilled';
  width?: number;
  height?: number;
  strokeWidth?: number;
  opacity?: number;
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
  type: string;
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
