import { Button, Divider, SidebarArticle, SidebarBlog } from 'components';
import { useAppDispatch } from 'store';
import { open } from 'store/loginModal/loginModalSlice';
import { IArticleResult, IBlog, ILabel } from 'types';

import classes from './Sidebar.module.css';

const author: IBlog = {
  id: 1,
  name: 'Samandar',
  imgUrl: 'awda',
};

const labels: ILabel[] = [
  {
    name: 'JavaScript',
    id: 1,
  },
  {
    name: 'TypeScript',
    id: 2,
  },
];

const articles: IArticleResult[] = [
  {
    id: 1,
    title: 'Article title Lorem Ipsum is simply dummy',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
  {
    id: 2,
    title: 'Article title',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
  {
    id: 3,
    title: 'Article title',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
];

const blogs: IBlog[] = [
  {
    id: 1,
    name: 'Samandar Boymurodov',
    imgUrl: 'url',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    articlesCount: 100,
    followersCount: 20,
  },
  {
    id: 2,
    name: 'Blog 2',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articlesCount: 100,
    followersCount: 20,
  },
  {
    id: 3,
    name: 'Blog 3',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articlesCount: 100,
    followersCount: 20,
  },
];

export const Sidebar = (): JSX.Element => {
  const dispath = useAppDispatch();

  const loginHandler = (): void => {
    dispath(open());
  };

  return (
    <div className={classes.sidebar}>
      <div className='d-flex justify-content-around'>
        <Button color='outline-dark' onClick={loginHandler}>
          Kirish
        </Button>
        <Button className='float-right'>Ro`yxatdan o`tish</Button>
      </div>
      <Divider className='my-2' />
      <h2>Siz uchun maqolalar</h2>
      {articles.map((article, index) => (
        <div key={article.id}>
          <SidebarArticle {...article} />
          {index !== articles.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
        </div>
      ))}
      <Divider className='my-2' />
      <h2>Kuzatib boring</h2>
      {blogs.map((blog, index) => (
        <div key={blog.id}>
          <SidebarBlog {...blog} />
          {index !== articles.length - 1 && <Divider className='my-2 w-75 mx-auto' />}
        </div>
      ))}
    </div>
  );
};
