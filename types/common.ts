import { FC } from 'react';

export interface ITabHeader {
  name: string;
  id: string;
  active?: boolean;
}

export interface ITabBody {
  [tabId: string]: FC;
}
