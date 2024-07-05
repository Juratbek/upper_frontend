import { render } from '@testing-library/react';
import { ReduxWrapper } from 'tests';
import { vi } from 'vitest';

import { LogosBox } from './LogosBox';

const mocks = vi.hoisted(() => ({ useDevice: vi.fn().mockReturnValue({ isDesktop: true }) }));

vi.mock('hooks', () => ({
  useDevice: mocks.useDevice,
}));

describe('LogosBox', () => {
  it('snapshot', () => {
    render(
      <ReduxWrapper>
        <LogosBox />
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('snapshot for non-desktop devices', () => {
    mocks.useDevice.mockReturnValue({ isDesktop: false });

    render(
      <ReduxWrapper>
        <LogosBox />
      </ReduxWrapper>,
    );

    expect(document.body).toMatchSnapshot();
  });
});
