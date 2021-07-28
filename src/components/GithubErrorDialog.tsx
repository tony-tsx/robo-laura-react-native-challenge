import {AxiosError} from 'axios';
import React, {useMemo} from 'react';
import {ErrorDialog} from './ErrorDialog';

export interface GithubErrorDialogProps {
  error: AxiosError;
  disableContainerStyle?: boolean;
  onRetryPress?: () => void;
}

export const GithubErrorDialog = ({
  error,
  onRetryPress,
  disableContainerStyle,
}: GithubErrorDialogProps) => {
  const status = useMemo(() => error.response?.status, [error.response]);

  if (status === 404) {
    return (
      <ErrorDialog
        disableContainerStyle={disableContainerStyle}
        error={error}
        title="Ops..."
        message="Resource not found."
      />
    );
  }

  if (status === 403) {
    return (
      <ErrorDialog
        disableContainerStyle={disableContainerStyle}
        error={error}
        title="Ops..."
        message="Github is hurt, try again later."
      />
    );
  }

  return (
    <ErrorDialog
      disableContainerStyle={disableContainerStyle}
      error={error}
      title="Ops..."
      message="Something wrong is not right, please try again later. "
      enableDebug
      enableRetry
      showStackError
      onRetryPress={onRetryPress}
    />
  );
};
