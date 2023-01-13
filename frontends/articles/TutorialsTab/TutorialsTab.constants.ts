import { ILabel, ITutorialMedium } from 'types';

const mockLabels: ILabel[] = [
  {
    id: 1,
    name: 'Java',
  },
  {
    id: 1,
    name: 'JavaScript',
  },
];

export const MOCK_TUTORIALS: ITutorialMedium[] = [
  {
    id: 1,
    name: 'JavaScript tutorial for beginners',
    labels: mockLabels,
    status: 'SAVED',
    publishedDate: '10.01.2024',
  },
  {
    id: 1,
    name: 'JavaScript',
    labels: mockLabels,
    status: 'PUBLISHED',
    updatedDate: '10.01.2024',
  },
];
