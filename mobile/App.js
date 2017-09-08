import React from 'react';
import { Provider } from 'react-redux';
import { UIManager } from 'react-native';

import AppNavigation from './src/navigations';
import store from './src/store';
import RelayProvider from './src/relay-environment';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RelayProvider>
          <AppNavigation />
        </RelayProvider>
      </Provider>
    );
  }
}
