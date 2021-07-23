import {api} from '../services/api';

export const fetcher = (url: string) =>
  api.get(url).then(response => response.data);
