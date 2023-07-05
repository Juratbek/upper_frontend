import { IQuizData } from 'components/Editor';

export interface ISubmitQuizDto extends IQuizData {
  articleId: number;
}

export type TQuizSubmissionColor = 'SUCCESS' | 'ERROR' | 'NORMAL' | 'RIGHT_ANSWER';

export interface IQuizSubmission {
  value: number;
  text: string;
  color: TQuizSubmissionColor;
}
