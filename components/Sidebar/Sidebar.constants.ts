import { ReadArticleSidebar } from 'frontends/article';
import { DocsSidebar } from 'frontends/docs';
import { TutorialSidebar as ReadTutorialSidebar } from 'frontends/tutorials';
import { UserArticlesSidebar } from 'frontends/user-articles/UserArticlesSidebar';
import { TutorialSidebar } from 'frontends/user-tutorials';

const CONTENT_URLS = {
  userArticles: '/user/articles/[id]',
  docs: '/docs*',
  createTutorial: '/user/tutorials*',
  readTutorial: '/tutorials*',
};

export const ADDITIONAL_CONTENT_URLS = {
  readArticle: '/articles/[id]',
};

export const SIDEBAR_CONTENTS = {
  [CONTENT_URLS.userArticles]: UserArticlesSidebar,
  [CONTENT_URLS.docs]: DocsSidebar,
  [CONTENT_URLS.createTutorial]: TutorialSidebar,
  [CONTENT_URLS.readTutorial]: ReadTutorialSidebar,
};

export const ADDITIONAL_SIDEBAR_CONTENTS = {
  [ADDITIONAL_CONTENT_URLS.readArticle]: ReadArticleSidebar,
};

export const SEARCH_RESULTS_SIZE = 5;
