// @flow

import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { UIManager, AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { persistStore } from 'redux-persist';

import AppNavigation from './navigations';
import store from './store';
import { themes, persistWhitelist, subsetOfAppReducer } from './utils/constants';
import Loading from './components/Loading';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type State = {
  isReady: boolean,
};

// TODO: Remove themeprovider
class App extends PureComponent<void, {}, State> {
  state = {
    isReady: false,
  };

  componentDidMount() {
    persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: persistWhitelist,
        transforms: [
          subsetOfAppReducer
        ]
      },
      () => {
        this.setState({ isReady: true });
      }
    )
  }

  render() {
    if (!this.state.isReady) {
      return <Loading />;
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

export default App;
