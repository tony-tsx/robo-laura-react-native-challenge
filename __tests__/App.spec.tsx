import 'react-native';
import React from 'react';
import App from '../src/app';

import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import {UserRepositories} from '../src/screens/UserRepositories';
import {RepoListItemComponent} from '../src/components/RepoListItem';

afterEach(cleanup);

it('app flow using facebook nickname', async () => {
  const rendered = render(<App />);

  expect(rendered.toJSON()).toMatchSnapshot();

  const textInput = rendered.getByPlaceholderText('Search nickname');

  await act(async () => {
    await fireEvent.changeText(textInput, 'facebook');
  });

  expect(rendered.toJSON()).toMatchSnapshot();

  const touchableOpacity = await waitFor(() =>
    rendered.UNSAFE_getByProps({disabled: false}),
  );

  await act(async () => {
    await fireEvent.press(touchableOpacity);
  });

  await waitFor(() => rendered.UNSAFE_getByType(UserRepositories));

  await waitFor(() => rendered.UNSAFE_getAllByType(RepoListItemComponent));

  expect(rendered.toJSON()).toMatchSnapshot();
});
