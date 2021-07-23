import React from 'react';
import {FlatList, View} from 'react-native';
import {IRepo} from '../interfaces/IRepo';
import {RepoListItem} from './RepoListItem';

export interface RepoListProps {
  repos: IRepo[];
}

export const RepoList = ({repos}: RepoListProps) => {
  return (
    <View>
      <FlatList
        data={repos}
        keyExtractor={repo => `${repo.owner.id}.repos.${repo.id}`}
        renderItem={({item}) => <RepoListItem repo={item} />}
      />
    </View>
  );
};
