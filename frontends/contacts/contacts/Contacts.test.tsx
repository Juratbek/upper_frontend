import { render } from '@testing-library/react';

import { Contacts } from './Contacts';

describe('Contacts', () => {
  it('snapshot', () => {
    render(<Contacts />);
    expect(document.body).toMatchSnapshot();
  });
});
