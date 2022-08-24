import { UserArticlesSidebar } from 'frontends/user-articles/UserArticlesSidebarSidebar';
import { SidebarContent } from 'frontends/write-article';

const CONTENT_URLS = {
  writeArticle: '/write-article',
  userArticles: '/user/articles/[id]',
};

export const SIDEBAR_CONTENTS = {
  [CONTENT_URLS.writeArticle]: SidebarContent,
  [CONTENT_URLS.userArticles]: UserArticlesSidebar,
};
