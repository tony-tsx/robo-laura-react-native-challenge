import {AxiosError} from 'axios';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInputWithDelay} from '../components/TextInputWithDelay';
import {api} from '../services/api';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

export const SearchUser = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigation = useNavigation();

  const handleChangeClearNickName = useCallback(() => {
    setLoading(true);
    setNickname(null);
    setError(null);
  }, []);

  const handleChangeNickName = useCallback((maybeNickname: string) => {
    if (maybeNickname === '') {
      return setLoading(false);
    }
    api
      .get(`/users/${maybeNickname}`)
      .then(() => setNickname(maybeNickname))
      .catch(setError)
      .finally(setLoading.bind(null, false));
  }, []);

  const handlePressGoToUser = useCallback(() => {
    if (!nickname) {
      return;
    }
    navigation.navigate('User', {nickname});
  }, [navigation, nickname]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Robo Laura</Text>
        <Text style={styles.subtitle}>React Native Challenge</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInputWithDelay
          style={styles.input}
          ms={600}
          placeholder="Search nickname"
          textContentType="nickname"
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={handleChangeNickName}
          onChangeTextWithoutDelay={handleChangeClearNickName}
        />
        <TouchableOpacity
          style={styles.nextIconContainer}
          disabled={!nickname}
          onPress={handlePressGoToUser}>
          <Octicons
            name="chevron-right"
            style={[
              styles.nextIcon,
              !nickname ? styles.nextIconDisabled : undefined,
            ]}
          />
        </TouchableOpacity>
        <View
          style={[styles.inputBar, error ? styles.inputBarError : undefined]}
        />
      </View>
      {error && (
        <Text style={styles.error}>
          {error?.response?.status === 404
            ? 'nickname not found.'
            : error?.response?.status === 403
            ? 'github is hurt, try again later.'
            : 'something is right is wrong, try again later.'}
        </Text>
      )}
      <View>
        <Text style={styles.title}>About</Text>
        <Text style={styles.subtitle}>Github rest api integration</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    fontWeight: '100',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    marginVertical: 15,
  },
  inputContainer: {
    marginTop: 15,
    position: 'relative',
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 0,
    fontFamily: 'Roboto-Light',
    color: 'black',
    textAlign: 'center',
  },
  inputBar: {
    height: 1,
    backgroundColor: 'gray',
  },
  inputBarError: {
    backgroundColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    marginVertical: 10,
  },
  nextIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },
  nextIcon: {
    fontSize: 16,
    color: 'black',
  },
  nextIconDisabled: {
    color: '#CCC',
  },
});
