// @flow

import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { UIManager, AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist-immutable';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import AppNavigation from './navigations';
import Loading from './components/Loading';
// ------------------------------------
// UTILS
// ------------------------------------
import store from './store';
import {
  persistWhitelist,
  subsetOfAppReducer,
} from './utils/constants';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type State = {
  isReady: boolean,
};

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
        transforms: [subsetOfAppReducer],
      },
      () => {
        this.setState({ isReady: true });
      },
    ).purge();
  }

  render() {
    if (!this.state.isReady) {
      return <Loading />;
    }
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

export default App;
