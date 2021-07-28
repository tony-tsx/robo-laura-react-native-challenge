import React, {useMemo, useState} from 'react';
import {StyleSheet, TextInput, FlatList, View, Text} from 'react-native';
import {IRepository} from '../interfaces/IRepository';
import {RepoListItem} from './RepoListItem';

export interface RepoListProps {
  repositories: IRepository[];
}

interface HeaderRepositoryListProps {
  search: string;
  setSearch: (search: string) => void;
}

export const RepoList = ({
  repositories: receiveRepositories,
}: RepoListProps) => {
  const [search, setSearch] = useState('');

  const repositories = useMemo(() => {
    const regex = RegExp(search, 'i');
    const searchByText = (
      ...strings: [string, ...(string | undefined | null)[]]
    ) => strings.some(string => string && regex.test(string));

    return receiveRepositories.filter(repository =>
      searchByText(repository.name),
    );
  }, [search, receiveRepositories]);

  return (
    <View>
      {/**
       * Why not use ListHeaderComponent?
       *
       * Simple when the search state changes the FlatList will render the component
       * function ListHeaderComponent again, causing it to have a small delay in the native part,
       * so when the state changes the virtual keyboard is removed because there is a small padding
       * in the native part.
       *
       * That way, removing it from within the FlatList react manages to improve the perspective natively.
       *
       * A way to fix this and use the ListHeaderComponent, one of the ideas would be to use passing value
       * by reference with a submit action. However I wanted to cause a real-time filtering effect.
       */}
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={setSearch}
          value={search}
          style={styles.searchInput}
          placeholder="Search for..."
          placeholderTextColor="grey"
        />
      </View>
      <FlatList
        data={repositories}
        keyExtractor={repo => `${repo.owner.id}.repos.${repo.id}`}
        renderItem={({item}) => <RepoListItem repo={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No public repository</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Roboto-Light',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'black',
    fontFamily: 'Roboto-Light',
  },
});
