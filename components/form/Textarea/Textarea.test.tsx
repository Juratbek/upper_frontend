import { render } from '@testing-library/react';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('snapshot', () => {
    render(<Textarea />);
    expect(document.body).toMatchSnapshot();
  });
});
