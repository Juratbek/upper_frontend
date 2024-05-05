import { render, screen } from '@testing-library/react';

import { TabButton } from './TabButton';

describe('components/lib/TabButton', () => {
  it('render', () => {
    render(<TabButton>Click me</TabButton>);
    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn).toBeVisible();
  });
});
