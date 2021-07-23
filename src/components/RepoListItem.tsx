import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {IRepo} from '../interfaces/IRepo';

export interface RepoListItemProps {
  repo: IRepo;
}

export const RepoListItemComponent = ({repo}: RepoListItemProps) => {
  return (
    <View>
      <Text>{repo.name}</Text>
    </View>
  );
};

export const RepoListItem = memo(RepoListItemComponent);
