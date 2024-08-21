import { render, screen } from '@testing-library/react';

import { UploadSuccessIcon } from '../UploadSuccess';

describe('UploadSuccess icon', () => {
  it('renders the icon', () => {
    render(<UploadSuccessIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
