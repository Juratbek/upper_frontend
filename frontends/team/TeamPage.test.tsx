import { render } from '@testing-library/react';
import { ReduxWrapper } from 'tests';

import { TeamPage } from './TeamPage';

const Component = (
  <ReduxWrapper>
    <TeamPage />
  </ReduxWrapper>
);

describe('Team page', () => {
  it('snapshot', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });
});
