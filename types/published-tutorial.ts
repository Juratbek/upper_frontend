import { IBlogSmall } from './blog';

export interface IPublishedTutorialMedim {
  id: number;
  name: string;
  imgUrl: string;
  publishedDate: string;
  author: IBlogSmall;
}
