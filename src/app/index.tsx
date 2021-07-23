import {AxiosError} from 'axios';
import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {RepoList} from '../components/RepoList';
import {TextInputWithDelay} from '../components/TextInputWithDelay';
import {useRepos} from '../hooks/useRepos';
import {api} from '../services/api';

const App = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const {data: repos, ...anothers} = useRepos(nickname);

  const handleClearNickName = useCallback(() => setNickname(null), []);

  const handleChangeNickName = useCallback((maybeNickname: string) => {
    api
      .get(`/users/${maybeNickname}`)
      .then(() => setNickname(maybeNickname))
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 404) {
          return Alert.alert('user not found');
        }
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(JSON.stringify({anothers}, null, 2));
  }, [anothers]);

  return (
    <View>
      <View>
        <TextInputWithDelay
          ms={600}
          style={styles.input}
          placeholder="Insert nick name"
          textContentType="nickname"
          autoCapitalize="none"
          onChangeText={handleChangeNickName}
          onChangeTextWithoutDelay={handleClearNickName}
        />
      </View>
      <View>
        <RepoList repos={repos ?? []} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
  },
});

export default App;
