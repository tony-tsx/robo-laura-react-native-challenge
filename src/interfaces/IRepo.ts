import {IUser} from './IUser';

export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  owner: IUser;
  description: string | null;
  language: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers: number;
  forks_count: number;
  default_branch: string;
}
