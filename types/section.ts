export interface ITutorialArticle {
  id: string;
  name: string;
}

export interface ITutorialSection {
  id: string;
  name: string;
  articles: ITutorialArticle[];
  defaultFocused?: boolean;
}
