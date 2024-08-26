import { fireEvent, render, screen } from '@testing-library/react';
import { PopularLabels } from 'constants/labels';
import { vi } from 'vitest';

import { TopLabel } from '../user-labels';
import { Labels } from './Labels';

vi.mock('react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react')>();
  return {
    ...mod,
    useRef: () => ({
      current: {
        scrollWidth: 100,
        clientWidth: 99,
      },
    }),
  };
});

const mockSelect = vi.fn();
const labels = [TopLabel, ...PopularLabels];

const component = <Labels activeLabel='Top' onSelect={mockSelect} labels={labels} />;

describe('components/molecules/Labels', () => {
  it('render', () => {
    render(component);

    labels.forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeVisible();
    });

    const activeBtn = screen.getByRole('button', { name: TopLabel });
    expect(activeBtn).toHaveClass('primary');
  });

  it('calls mock fn on label click', () => {
    render(component);

    labels.forEach((label, index) => {
      const btn = screen.getByRole('button', { name: label });
      fireEvent.click(btn);
      expect(mockSelect).toHaveBeenCalledTimes(index + 1);
    });
  });
});
