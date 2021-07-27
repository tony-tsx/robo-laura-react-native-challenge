import useSWR from 'swr';
import {fetcher} from '../helpers/fetcher';
import {IRepository} from '../interfaces/IRepository';

export const useRepositories = (nickname: string | null) => {
  return useSWR<IRepository[]>(
    nickname ? `/users/${nickname}/repos` : null,
    fetcher,
  );
};
