import { render } from '@testing-library/react';

import { Delimiter } from './Delimiter.tool';

describe('Delimiter tool', () => {
  it('snapshot', () => {
    render(<Delimiter />);
    expect(document.body).toMatchSnapshot();
  });
});
