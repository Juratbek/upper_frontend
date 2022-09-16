import { DocsSidebar } from 'frontends/docs';
import { UserArticlesSidebar } from 'frontends/user-articles/UserArticlesSidebar';
import { SidebarContent } from 'frontends/write-article';

const CONTENT_URLS = {
  writeArticle: '/write-article',
  userArticles: '/user/articles/[id]',
  docs: '/docs*',
};

export const SIDEBAR_CONTENTS = {
  [CONTENT_URLS.writeArticle]: SidebarContent,
  [CONTENT_URLS.userArticles]: UserArticlesSidebar,
  [CONTENT_URLS.docs]: DocsSidebar,
};
