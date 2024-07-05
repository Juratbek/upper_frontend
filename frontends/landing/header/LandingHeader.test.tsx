import { render } from '@testing-library/react';
import { QueryWrapper, ReduxWrapper } from 'tests';
import { vi } from 'vitest';

import { LandingHeader } from './LandingHeader';

const mocks = vi.hoisted(() => ({
  useDevice: vi.fn().mockReturnValue({ isMobile: false, isTablet: false }),
}));

vi.mock('hooks', async (importOriginal) => {
  const original = await importOriginal<typeof import('hooks')>();

  return {
    ...original,
    useDevice: mocks.useDevice,
  };
});

const Component = (
  <ReduxWrapper>
    <QueryWrapper>
      <LandingHeader />
    </QueryWrapper>
  </ReduxWrapper>
);

describe('Landing page header', () => {
  it('renders desktop header by default', () => {
    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('renders tablet header for tablets', () => {
    mocks.useDevice.mockReturnValue({ isMobile: false, isTablet: true });

    render(Component);
    expect(document.body).toMatchSnapshot();
  });

  it('renders mobile header for mobiles', () => {
    mocks.useDevice.mockReturnValue({ isMobile: true, isTablet: false });

    render(Component);
    expect(document.body).toMatchSnapshot();
  });
});
