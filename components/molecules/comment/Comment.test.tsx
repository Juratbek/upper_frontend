import { render, screen } from '@testing-library/react';
import { IComment } from 'types';
import { THEME_COLORS } from 'variables';
import { vi } from 'vitest';

import { Comment } from './Comment';

const mockComment: IComment = {
  id: 12,
  date: new Date().toString(),
  text: 'Ajoyib maqola',
  author: {
    id: 1,
    imgUrl: 'https://domain.com/mockimage.png',
    name: 'Aziz',
  },
};

vi.mock('hooks', () => ({ useTheme: () => ({ themeColors: THEME_COLORS.light }) }));

describe('components/molecules/Comment', () => {
  it('render', () => {
    render(<Comment {...mockComment} />);
    const avatar = screen.getByRole('img');
    expect(avatar).toBeVisible();

    const authorLink = screen.getByRole('link');
    expect(authorLink).toHaveTextContent(mockComment.author.name);

    const date = screen.getByText('Hozirgina');
    expect(date).toBeVisible();

    const commentText = screen.getByText(mockComment.text);
    expect(commentText).toBeVisible();
  });
});
