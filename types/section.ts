export interface ITutorialArticle {
  id: string;
  name: string;
  defaultFocused?: boolean;
  new?: boolean;
  articleId?: number;
}

export interface ITutorialSection {
  id: string;
  name: string;
  articles: ITutorialArticle[];
  defaultFocused?: boolean;
  new?: boolean;
}
