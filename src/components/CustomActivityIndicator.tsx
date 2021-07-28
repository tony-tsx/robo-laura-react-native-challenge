import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export interface CustomActivityIndicatorProps {}

export const CustomActivityIndicator = ({}: CustomActivityIndicatorProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#00000080" animating />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
