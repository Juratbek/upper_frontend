import { IBlogSmall } from './blog';
import { ITutorialSection } from './section';

export interface IPublishedTutorialSmall {
  id: number;
  name: string;
  imgUrl: string;
  publishedDate: string;
  labels: string[];
}
export interface IPublishedTutorialMedim {
  id: number;
  name: string;
  imgUrl: string;
  publishedDate: string;
  author: IBlogSmall;
}

export interface IPublishedTutorial extends IPublishedTutorialMedim {
  id: number;
  name: string;
  author: IBlogSmall;
  sections: ITutorialSection[];
}
