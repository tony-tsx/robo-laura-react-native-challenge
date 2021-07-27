import React from 'react';
import {RepoList} from '../components/RepoList';
import {useRepositories} from '../hooks/useRepositories';
import {useUserNickname} from '../app/providers/User';
import {CustomActivityIndicator} from '../components/CustomActivityIndicator';

export const UserRepositories = () => {
  const {data: repositories, isValidating} = useRepositories(useUserNickname());

  if (isValidating) {
    return <CustomActivityIndicator />;
  }

  return <RepoList repositories={repositories ?? []} />;
};
