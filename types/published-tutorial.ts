import { IBlogSmall } from './blog';
import { ITutorialSection } from './section';

export interface IPublishedTutorialSmall {
  id: number;
  name: string;
  imgUrl: string;
  publishedDate: string;
  labels: string[];
}
export interface IPublishedTutorialMedium {
  id: number;
  name: string;
  imgUrl: string;
  publishedDate: string;
  author: IBlogSmall;
}

export interface IPublishedTutorial extends IPublishedTutorialMedium {
  id: number;
  name: string;
  author: IBlogSmall;
  sections: ITutorialSection[];
}
