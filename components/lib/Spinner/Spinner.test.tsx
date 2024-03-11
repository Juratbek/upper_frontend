import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner';

describe('components/lib/Spinner', () => {
  it('render', () => {
    render(<Spinner />);
    expect(screen.getByRole('spinner')).toBeVisible();
  });
});
