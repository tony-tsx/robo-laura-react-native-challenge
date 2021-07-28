import React from 'react';
import {RepoList} from '../components/RepoList';
import {useRepositories} from '../hooks/useRepositories';
import {useUserNickname} from '../app/providers/User';
import {CustomActivityIndicator} from '../components/CustomActivityIndicator';
import {StyleSheet, View} from 'react-native';
import {GithubErrorDialog} from '../components/GithubErrorDialog';

export const UserRepositories = () => {
  const {
    data: repositories,
    isValidating,
    revalidate,
    error,
  } = useRepositories(useUserNickname());

  return (
    <View style={styles.container}>
      {isValidating ? (
        <CustomActivityIndicator />
      ) : error ? (
        <GithubErrorDialog error={error} onRetryPress={revalidate} />
      ) : (
        <RepoList repositories={repositories ?? []} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
