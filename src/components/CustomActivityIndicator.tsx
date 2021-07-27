import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export interface CustomActivityIndicatorProps {}

export const CustomActivityIndicator = ({}: CustomActivityIndicatorProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#00ff0060" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
