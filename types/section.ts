export interface IArticle {
  id: string;
  name: string;
}

export interface ISection {
  id: string;
  name: string;
  articles: IArticle[];
  defaultFocused?: boolean;
}
