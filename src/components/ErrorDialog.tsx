import React from 'react';
import {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface ErrorDialogProps {
  error: Error;
  title: string;
  message?: string;
  enableDebug?: boolean;
  enableRetry?: boolean;
  disableContainerStyle?: boolean;
  showStackError?: boolean;
  onRetryPress?: () => void;
}
export const ErrorDialog = ({
  error,
  title,
  message,
  enableRetry = false,
  enableDebug = false,
  showStackError = false,
  disableContainerStyle = false,
  onRetryPress,
}: ErrorDialogProps) => {
  const handlePressRetryCall = useCallback(() => {
    onRetryPress?.();
  }, [onRetryPress]);
  return (
    <View style={disableContainerStyle ? [] : styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message ?? error.message}</Text>
      {enableRetry && (
        <View style={styles.retryContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handlePressRetryCall}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {enableDebug && __DEV__ && (
        <ScrollView style={styles.debugContainer}>
          <Text style={styles.debugTitle}>
            {error.name}: {error.message}
          </Text>
          {showStackError &&
            error.stack &&
            error.stack
              .split('\n')
              .map(line => <Text style={styles.debugLine}>{line}</Text>)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    fontSize: 18,
  },
  retryContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  retryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 5,
  },
  retryText: {
    fontFamily: 'Roboto-Light',
  },
  debugContainer: {},
  debugTitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  debugLine: {
    fontFamily: 'Roboto-Light',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
