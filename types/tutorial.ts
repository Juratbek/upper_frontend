import { ITutorialSection } from './section';

export type TTutorialStatus = 'PUBLISHED' | 'SAVED';

export interface ITutorialMedium {
  id: number;
  name: string;
  status: TTutorialStatus;
  publishedDate?: string;
  updatedDate?: string;
}

export interface ITutorial extends ITutorialMedium {
  sections: ITutorialSection[];
  imgUrl: string;
}
