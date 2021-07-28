import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {useUserNickname} from '../app/providers/User';
import {useUserAccountDetails} from '../hooks/useUserAccountDetails';
import Octicons from 'react-native-vector-icons/Octicons';
import {useCallback} from 'react';
import {CustomActivityIndicator} from '../components/CustomActivityIndicator';
import {GithubErrorDialog} from '../components/GithubErrorDialog';

export const UserAccount = () => {
  const {data, isValidating, error} = useUserAccountDetails(useUserNickname());
  const handlerPressOpenBlog = useCallback(() => {
    if (data?.blog) {
      Linking.openURL(data.blog);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {isValidating ? (
        <CustomActivityIndicator />
      ) : error ? (
        <GithubErrorDialog disableContainerStyle error={error} />
      ) : (
        <>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{uri: data.avatar_url}} />
          </View>
          <TouchableOpacity
            style={styles.nameContainer}
            disabled={!data.bio}
            onPress={handlerPressOpenBlog}>
            <Text style={styles.name}>{data.name}</Text>
            {data.bio && <Octicons name="link" style={styles.blogIcon} />}
          </TouchableOpacity>
          {data.bio && <Text style={styles.bio}>{data.bio}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Roboto-Light',
    fontSize: 30,
    marginVertical: 10,
  },
  blogIcon: {
    fontSize: 30,
    marginHorizontal: 10,
    color: 'blue',
  },
  bio: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
    marginVertical: 10,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
