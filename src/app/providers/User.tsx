import React, {createContext} from 'react';
import {useContext} from 'react';
import {useMemo} from 'react';
import {PropsWithChildren} from 'react';

export const UserContext = createContext({} as UserContext);

export interface UserContext {
  nickname: string;
}

export interface UserProviderProps {
  nickname: string;
}

export const UserProvider = ({
  nickname,
  children,
}: PropsWithChildren<UserProviderProps>) => {
  const provider = useMemo(() => ({nickname}), [nickname]);

  return <UserContext.Provider value={provider} children={children} />;
};

export const useUserNickname = () => {
  const {nickname} = useContext(UserContext);

  return nickname;
};
