import React from 'react';
import { Provider } from 'react-redux';
import { UIManager } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppNavigation from './src/navigations';
import store from './src/store';
import { themes } from './src/utils/constants';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={themes.dark}>
          <AppNavigation />
        </ThemeProvider>
      </Provider>
    );
  }
}
