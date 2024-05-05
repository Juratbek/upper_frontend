import { render, screen } from '@testing-library/react';
import { IArticleResult } from 'types';

import { Article } from './Article';

const mockArticle: IArticleResult = {
  id: 1,
  title: 'Article Title',
  content: 'some content',
};

describe('components/molecules/Article', () => {
  it('render', () => {
    render(<Article article={mockArticle} />);
    const link = screen.getByRole('link');

    expect(link).toHaveTextContent(mockArticle.title);
    expect(link).toHaveAttribute('href', `/web/user/articles/${mockArticle.id}`);
    expect(screen.getByRole('heading', { name: mockArticle.title })).toBeVisible();
    expect(screen.getByText(mockArticle.content!)).toBeVisible();
  });

  it('renders default header', () => {
    render(<Article article={{ ...mockArticle, title: '' }} />);
    const link = screen.getByRole('link');
    const defaultHeader = 'Sarlavha kiritilmagan';

    expect(link).toHaveTextContent(defaultHeader);
    expect(link).toHaveAttribute('href', `/web/user/articles/${mockArticle.id}`);
    expect(screen.getByRole('heading', { name: defaultHeader })).toBeVisible();
    expect(screen.getByText(mockArticle.content!)).toBeVisible();
  });
});
