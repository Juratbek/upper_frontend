import { MutationOptions } from '@tanstack/react-query';
import { apiClient, useMutation } from 'store/config';
import { IResponseError } from 'types';

import { IQuizSubmission, ISubmitQuizDto } from './quiz.types';

export const useSubmitQuiz = (
  options: MutationOptions<IQuizSubmission[], IResponseError<IQuizSubmission[]>, ISubmitQuizDto>,
) =>
  useMutation<IQuizSubmission[], IResponseError<IQuizSubmission[]>, ISubmitQuizDto>({
    ...options,
    mutationFn: (block) => apiClient.post({ path: 'quiz/open/submit', body: block }),
  });
