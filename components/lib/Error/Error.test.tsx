import { render, screen } from '@testing-library/react';

import { Error } from './Error';

describe('components/lib/Error', () => {
  it('renders Error component', () => {
    render(<Error show message='Some error happened' />);
    const error = screen.getByRole('error');
    expect(error).toBeVisible();
    expect(error).toHaveClass('error');
    expect(screen.getByText('Some error happened')).toBeVisible();
  });
  it('renders Error component', () => {
    render(<Error message='Some error happened' />);
    const error = screen.queryByRole('error');
    expect(error).toEqual(null);
  });
});
