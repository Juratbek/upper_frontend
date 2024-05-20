import { IconCheck, IconDotCircle } from '@codexteam/icons';

import { IBlockNode } from '../../instance/Editor.types';
import { IToolbarSetting } from '../tool.types';
import { IQuizData } from './Quiz.types';

export const QuizSettings: IToolbarSetting[] = [
  {
    icon: IconCheck,
    text: "Ko'p javobli",
    onClick: ({ setBlock, hoveredBlock }) => {
      if (!hoveredBlock) return;
      const { id, type, data } = hoveredBlock as IBlockNode<IQuizData>;
      setBlock<IQuizData>({ id, type, data: { ...data, type: 'multiSelect' } });
    },
    active: ({ hoveredBlock }) => (hoveredBlock?.data as IQuizData).type === 'multiSelect',
  },
  {
    icon: IconDotCircle,
    text: 'Yakka javobli',
    onClick: ({ setBlock, hoveredBlock }) => {
      if (!hoveredBlock) return;
      const { id, type, data } = hoveredBlock as IBlockNode<IQuizData>;
      setBlock<IQuizData>({ id, type, data: { ...data, answers: [], type: 'singleSelect' } });
    },
    active: ({ hoveredBlock }) => (hoveredBlock?.data as IQuizData).type === 'singleSelect',
  },
];
