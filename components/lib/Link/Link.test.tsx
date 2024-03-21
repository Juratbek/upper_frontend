import { render, screen } from '@testing-library/react';

import { Link } from './Link';

describe('components/lib/Link', () => {
  it('render', () => {
    render(<Link href='/about'>a link</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/web/about');
    expect(link).toContainHTML('a link');
  });
});
