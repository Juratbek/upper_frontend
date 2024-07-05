import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';

import { IArticlePageMainProps } from './article.types';
import { ArticlePageMain } from './article-page';

const mockArticle: IArticlePageMainProps['article'] = {
  author: {
    id: 10,
    imgUrl: 'https://images.upper.uz/19283',
    name: 'Samandar',
  },
  blocks: [{ data: { text: 'Vitest configuration', level: 1 }, id: 'aoiwf', type: 'header' }],
  id: 123,
  imgUrl: 'https://images.upper.uz/12312',
  status: 'PUBLISHED',
  tags: ['Java'],
  title: 'Vitest configuration',
};

const mockProps: IArticlePageMainProps = {
  article: mockArticle,
  error: null,
  title: mockArticle.title,
  fullUrl: 'https://upper.uz/web/articles/123',
};

const Page = (mockData: IArticlePageMainProps) => (
  <ReduxWrapper>
    <QueryWrapper>
      <ArticlePageMain {...mockData} />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('article page', () => {
  it('snapshot', () => {
    render(Page(mockProps));
    expect(document.body).toMatchSnapshot();
  });

  it('error UI snapshot', () => {
    mockProps.article = null;
    mockProps.error = {
      data: {
        code: 404,
        message: 'Maqola topilmadi',
      },
      status: 404,
    };
    render(Page(mockProps));

    expect(document.body).toMatchSnapshot();
  });
});
