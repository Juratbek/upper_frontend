import { CheckboxIcon, QuizIcon, RadioInputIcon } from './icons';

export const TYPES = {
  singleSelect: 'singleSelect',
  multiSelect: 'multiSelect',
};

export const settings = [
  {
    name: 'Single Select',
    type: TYPES.singleSelect,
    icon: RadioInputIcon,
  },
  {
    name: 'Multi Select',
    type: TYPES.multiSelect,
    icon: CheckboxIcon,
  },
];

export const Toolbox = {
  title: 'Quiz',
  icon: QuizIcon,
};
