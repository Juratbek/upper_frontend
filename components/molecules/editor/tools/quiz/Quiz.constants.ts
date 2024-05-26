import { IconQuestion } from '@codexteam/icons';

import { ITool } from '../tool.types';
import { QuizSettings } from './Quiz.settings';
import { Quiz } from './Quiz.tool';
import { IQuizData } from './Quiz.types';

export const QuizTool: ITool = {
  block: Quiz,
  toolbar: {
    icon: IconQuestion,
    text: "So'rovnoma",
  },
  settings: QuizSettings,
  shortcuts: ['s'],
  initialData: {
    question: '',
    answers: [],
    type: 'singleSelect',
    variants: [
      { text: '', value: 1 },
      { text: '', value: 2 },
    ],
  } as IQuizData,
};
