import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import {IRepository} from '../interfaces/IRepository';
import moment from 'moment';
import Octicons from 'react-native-vector-icons/Octicons';
import shortNumber from 'short-number';

export interface RepoListItemProps {
  repo: IRepository;
}

export const RepoListItemComponent = ({repo}: RepoListItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.tinyInfoContainer}>
          <View style={styles.tinyInfoIconContainer}>
            <Octicons name="star" style={styles.tinyInfoIcon} />
            <Text style={styles.tinyInfoText}>
              {shortNumber(repo.stargazers_count)}
            </Text>
          </View>
          <View style={styles.tinyInfoIconContainer}>
            <Octicons name="eye" style={styles.tinyInfoIcon} />
            <Text style={styles.tinyInfoText}>
              {shortNumber(repo.watchers)}
            </Text>
          </View>
          <View style={styles.tinyInfoIconContainer}>
            <Octicons name="repo-forked" style={styles.tinyInfoIcon} />
            <Text style={styles.tinyInfoText}>
              {shortNumber(repo.forks_count)}
            </Text>
          </View>
          <View style={styles.tinyInfoIconContainer}>
            <Octicons name="git-branch" style={styles.tinyInfoIcon} />
            <Text style={styles.tinyInfoText}>{repo.default_branch}</Text>
          </View>
          <Text style={styles.lastUpdateAt}>
            {moment(repo.updated_at).calendar()}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{repo.name}</Text>
        </View>
        <View>
          {repo.description && (
            <Text style={styles.description}>{repo.description}</Text>
          )}
        </View>
        {repo.language && (
          <Text style={styles.repoLanguage}>{repo.language.toLowerCase()}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const RepoListItem = memo(RepoListItemComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    fontFamily: 'Roboto-Light',
    marginTop: 10,
  },
  title: {
    fontFamily: 'Roboto-Light',
  },
  lastUpdateAt: {
    fontFamily: 'Roboto-Light',
    fontSize: 10,
    marginLeft: 'auto',
  },
  tinyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tinyInfoIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  tinyInfoIcon: {
    marginRight: 2,
    fontSize: 12,
  },
  tinyInfoText: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
  },
  repoLanguage: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    marginTop: 10,
  },
});
