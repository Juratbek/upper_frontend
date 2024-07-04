import { render } from '@testing-library/react';

import { NotFound } from './NotFound';

describe('404', () => {
  it('snapshot', () => {
    render(<NotFound />);
    expect(document.body).toMatchSnapshot();
  });
});
