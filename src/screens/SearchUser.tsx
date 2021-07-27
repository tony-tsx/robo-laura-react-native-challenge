import {AxiosError} from 'axios';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInputWithDelay} from '../components/TextInputWithDelay';
import {api} from '../services/api';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

export const SearchUser = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [nicknameNotFound, setNicknameNotFound] = useState(false);
  const [, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChangeClearNickName = useCallback(() => {
    setLoading(true);
    setNickname(null);
    setNicknameNotFound(false);
  }, []);

  const handleChangeNickName = useCallback((maybeNickname: string) => {
    if (maybeNickname === '') {
      return setLoading(false);
    }
    api
      .get(`/users/${maybeNickname}`)
      .then(() => setNickname(maybeNickname))
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 404) {
          return setNicknameNotFound(true);
        }
        setNickname(maybeNickname);
        console.error(error);
      })
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
        <View style={styles.inputBar} />
        {nicknameNotFound && (
          <Text style={styles.notFound}>nickname not found</Text>
        )}
      </View>
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
    marginVertical: 15,
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
  notFound: {
    color: 'red',
    fontSize: 8,
    textAlign: 'center',
    marginVertical: 10,
  },
  nextIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  nextIcon: {
    fontSize: 16,
    color: 'black',
  },
  nextIconDisabled: {
    color: 'gray',
  },
});
