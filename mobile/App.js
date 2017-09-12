import React from 'react';
import { Provider } from 'react-redux';
import { UIManager, View, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppNavigation from './src/navigations';
import store from './src/store';
import { themes } from './src/utils/constants';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

<App>
</App>

<Hello></Hello>

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={themes.dark}>
          <View style={styles.root}>
            <StatusBar barStyle="light-content" />
            <AppNavigation />
          </View>
        </ThemeProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
