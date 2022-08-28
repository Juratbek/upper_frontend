import { ArticleImg, Divider, SearchInput } from 'components';
import { Author } from 'components/Author/Author';
import { useClickOutside } from 'hooks';
import { FC, useState } from 'react';
import { IBlogSmall } from 'types';

import classes from './SidebarSearch.module.scss';
import { IArticle } from './SidebarSearch.types';

const blogs: IBlogSmall[] = [
  {
    id: 1,
    name: 'Blog',
    imgUrl: '',
  },
  {
    id: 2,
    name: 'Blog',
    imgUrl: '',
  },
  {
    id: 3,
    name: 'Blog',
    imgUrl: '',
  },
];

const articles: IArticle[] = [
  {
    id: 1,
    title: 'Title',
  },
  {
    id: 2,
    title: 'Title',
  },
  {
    id: 3,
    title: 'Title',
  },
];

export const SidebarSearch: FC = () => {
  const [isResultsContainerOpen, setIsResultsContainerOpen] = useState<boolean>(false);

  const openResultsContainer = (): void => {
    setIsResultsContainerOpen(true);
  };

  const ref = useClickOutside(() => {
    setIsResultsContainerOpen(false);
  });

  return (
    <div className={classes.container} ref={ref}>
      <SearchInput onFocus={openResultsContainer} />
      <div className={`${classes['results-container']} ${!isResultsContainerOpen && 'd-none'}`}>
        <h4 className='m-0'>Bloglar</h4>
        <Divider />
        <div>
          {blogs.map((blog) => (
            <div key={blog.id} className={classes.blog}>
              <Author {...blog} />
            </div>
          ))}
        </div>
        <h4 className='m-0'>Maqolalar</h4>
        <Divider />
        {articles.map((article) => (
          <div key={article.id} className={classes.article}>
            <ArticleImg imgUrl='' size='micro' className={classes.img} />
            <h4 className='m-0'>{article.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
