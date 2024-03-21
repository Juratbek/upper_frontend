import { render, screen } from '@testing-library/react';
import { ReduxWrapper } from 'tests';

import { NoArticle } from './NoArticle';

describe('components/molecules/NoArticle', () => {
  it('render', () => {
    render(
      <ReduxWrapper>
        <NoArticle label='Java' />
      </ReduxWrapper>,
    );
    const heading = screen.getByRole('heading', { name: /Java/i });
    expect(heading).toBeVisible();

    expect(screen.getByText('Java mavzusida maqolalar yozing va bilim ulashing')).toBeVisible();
  });
});
