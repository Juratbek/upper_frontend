import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';

import { LandingPage } from './LandingPage';

const Landing = (
  <ReduxWrapper>
    <QueryWrapper>
      <LandingPage />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('Landing page content', () => {
  it('snapshot', () => {
    render(Landing);
    expect(document.body).toMatchSnapshot();
  });
});
