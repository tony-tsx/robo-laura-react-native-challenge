import {IUser} from './IUser';

export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  owner: IUser;
  description: string | null;
}
