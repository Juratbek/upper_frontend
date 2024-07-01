import { render, screen } from '@testing-library/react';

import { UploadErrorIcon } from '../UploadError';

describe('UploadError icon', () => {
  it('renders the icon', () => {
    render(<UploadErrorIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
