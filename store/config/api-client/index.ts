import { BASE_URL } from 'store/apis/config';

import Client from './api-client';

const apiClient = new Client({ baseUrl: BASE_URL });

export default apiClient;
