import { render, screen } from '@testing-library/react';

import { UploadingIcon } from '../Uploading';

describe('Uploading icon', () => {
  it('renders the icon', () => {
    render(<UploadingIcon />);
    const icon = screen.getByRole('icon');
    expect(icon).toMatchSnapshot();
  });
});
