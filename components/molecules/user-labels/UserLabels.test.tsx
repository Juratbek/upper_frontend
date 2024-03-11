import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';

import { UserLabels } from './UserLabels';

describe('components/molecules/UserLabels', () => {
  it('render', () => {
    render(
      <ReduxWrapper>
        <QueryWrapper>
          <UserLabels />
        </QueryWrapper>
      </ReduxWrapper>,
    );
  });
});
