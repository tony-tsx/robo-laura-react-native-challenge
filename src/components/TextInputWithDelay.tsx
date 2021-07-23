import React, {forwardRef, useCallback, useRef} from 'react';
import {TextInputProps, TextInput} from 'react-native';

export interface TextInputWithDelayProps extends TextInputProps {
  ms: number;
  onChangeTextWithoutDelay?(text: string): void;
}

export const TextInputWithDelay = forwardRef<
  TextInput,
  TextInputWithDelayProps
>(({onChangeText, ms, onChangeTextWithoutDelay, ...props}, ref) => {
  const timeout = useRef(NaN);

  const clearCurrentTimeout = useCallback(() => {
    if (!isNaN(timeout.current)) {
      clearTimeout(timeout.current);
    }
  }, []);

  const setCurrentTimeout = useCallback((current: number) => {
    Object.assign(timeout, {current});
  }, []);

  const createTimeoutFlow = useCallback(
    (fn: () => void) => {
      clearCurrentTimeout();
      setCurrentTimeout(setTimeout(fn, ms) as unknown as number);
    },
    [clearCurrentTimeout, setCurrentTimeout, ms],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeTextWithoutDelay?.(text);
      createTimeoutFlow(() => {
        onChangeText?.(text);
      });
    },
    [createTimeoutFlow, onChangeTextWithoutDelay, onChangeText],
  );

  return <TextInput ref={ref} onChangeText={handleChangeText} {...props} />;
});
