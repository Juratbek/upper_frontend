import { apiClient, TMutationHook, useMutation } from 'store/config';

import { IQuizSubmission, ISubmitQuizDto } from './quiz.types';

export const useSubmitQuiz: TMutationHook<IQuizSubmission[], ISubmitQuizDto> = () =>
  useMutation('submit-quiz', (block) => apiClient.post({ path: 'quiz/open/submit', body: block }));
