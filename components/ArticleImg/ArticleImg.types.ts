export interface IArticleImgProps {
  imgUrl: string;
  size?: TArticleImgSize;
  className?: string;
}

export type TArticleImgSize = 'small' | 'medium';
