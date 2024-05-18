export interface ISubmitQuizDto {
  articleId: number;
}

export type TQuizSubmissionColor = 'SUCCESS' | 'ERROR' | 'NORMAL' | 'RIGHT_ANSWER';

export interface IQuizSubmission {
  value: number;
  text: string;
  color: TQuizSubmissionColor;
}
