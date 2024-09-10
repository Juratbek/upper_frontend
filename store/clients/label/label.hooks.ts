import { apiClient, useQuery } from 'store/config';
import { ILabel } from 'types';

export const useSearchLabels = (search: string) =>
  useQuery<ILabel[]>({
    queryKey: ['search-labels', search],
    queryFn: () => apiClient.get(`label/search?query=${search}`),
    enabled: search?.trim().length > 2,
  });
