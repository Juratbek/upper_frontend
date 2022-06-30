interface IAuthor {
  id: number;
  imgUrl: string;
  name: string;
}

interface ILabel {
  id: number;
  name: string;
}

export interface IArticleProps {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  author: IAuthor;
  labels: ILabel[];
}
