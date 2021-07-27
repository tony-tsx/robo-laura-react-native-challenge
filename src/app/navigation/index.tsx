import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchUser} from '../../screens/SearchUser';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {UserAccount} from '../../screens/UserAccount';
import {UserRepositories} from '../../screens/UserRepositories';
import {useMemo} from 'react';
import {UserProvider} from '../providers/User';

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
  const route = useRoute<RouteProp<Record<keyof any, any>, string>>();
  const navigation = useNavigation();
  const nickname = useMemo(() => route.params?.nickname, [route]);

  if (!nickname) {
    navigation.navigate('SearchUser');
    return null;
  }

  return (
    <UserProvider nickname={nickname}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontFamily: 'Roboto-Light',
          },
          indicatorStyle: {
            backgroundColor: 'black',
            height: 0.5,
          },
        }}>
        <Tab.Screen name="Repositories" component={UserRepositories} />
        <Tab.Screen name="Account" component={UserAccount} />
      </Tab.Navigator>
    </UserProvider>
  );
};

const Stack = createStackNavigator();

export const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SearchUser"
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="SearchUser" component={SearchUser} />
      <Stack.Screen name="User" component={Tabs} />
    </Stack.Navigator>
  </NavigationContainer>
);
