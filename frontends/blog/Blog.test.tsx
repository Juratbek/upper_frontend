import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';

import { BlogPage } from './Blog';
import { IBlogPageProps } from './Blog.types';

const mockProps: IBlogPageProps = {
  fullUrl: 'https://upper.uz/web/blogs/12',
  blog: {
    createdDate: '12.10.23',
    id: 12,
    imgUrl: 'https://image.upper.uz/123',
    name: 'Samandar',
    links: [],
    labels: [],
  },
  error: null,
};

const Page = (props: IBlogPageProps) => (
  <ReduxWrapper>
    <QueryWrapper>
      <BlogPage {...props} />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('BlogPage', () => {
  it('snapshot', () => {
    render(Page(mockProps));
    expect(document.body).toMatchSnapshot();
  });

  it('error UI snapshot', () => {
    mockProps.blog = null;
    mockProps.error = { status: 404, data: { code: 404, message: 'Blog topilmadi' } };
    render(Page(mockProps));
    expect(document.body).toMatchSnapshot();
  });
});
