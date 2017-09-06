// @flow

import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';

import type { State, NavigationState } from './types';

import HomeScreen from './screens/HomeScreen';

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      // activeTintColor: colors.PRIMARY,
      // inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        // backgroundColor: colors.WHITE,
        height: 50,
        // paddingVertical: 5,
      },
    },
  },
);

const AppMainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTitle: 'KeepMyFolio',
    },
  },
});

type Props = {
  nav: NavigationState,
  dispatch: Function,
};

class AppNavigator extends Component<Props> {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    // if (!this.props.user.isAuthenticated) {
    //   return <AuthenticationScreen />;
    // }
    return <AppMainNav navigation={nav} />;
  }
}

export default connect((state: State) => ({
  nav: state.nav,
}))(AppNavigator);

export const router = AppMainNav.router;
