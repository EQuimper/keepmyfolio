// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { UIManager, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'styled-components';
import { persistStore } from 'redux-persist';

import AppNavigation from './src/navigations';
import store from './src/store';
import { themes, persistWhitelist } from './src/utils/constants';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type State = {
  isReady: boolean
};

// TODO: Remove themeprovider

export default class App extends Component<void, {}, State> {
  state = {
    isReady: false,
  }

  componentDidMount() {
    persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: persistWhitelist
      },
      () => {
        this.setState({ isReady: true });
      }
    )
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={themes.dark}>
          <AppNavigation />
        </ThemeProvider>
      </Provider>
    );
  }
}
