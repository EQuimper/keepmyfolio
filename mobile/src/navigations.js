// @flow

import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import type { State, NavigationState } from './types';

import HomeScreen from './screens/HomeScreen';

import { colors } from './utils/constants';

const TAB_ICON_SIZE = 25;

const AddButon = styled.View`
  height: 50;
  width: 50;
  borderRadius: 25;
  backgroundColor: ${colors.primary};
  justifyContent: center;
  alignItems: center;
`;

const OuterAddButton = styled.View`
  justifyContent: center;
  alignItems: center;
  height: 65;
  width: 65;
  borderRadius: ${65 / 2};
  backgroundColor: ${colors.tabBarColor};
  marginTop: -30;
`;

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons size={TAB_ICON_SIZE} color={tintColor} name="home" />
        ),
      }),
    },
    Wallet: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons
            size={TAB_ICON_SIZE}
            color={tintColor}
            name="wallet"
          />
        ),
      }),
    },
    AddCoin: {
      screen: HomeScreen,
      navigationOptions: () => ({
        // headerTitle: 'Home',
        tabBarIcon: () => (
          <OuterAddButton>
            <AddButon>
              <Ionicons
                size={TAB_ICON_SIZE}
                color={colors.white}
                name="md-add"
              />
            </AddButon>
          </OuterAddButton>
        ),
      }),
    },
    Notifications: {
      screen: HomeScreen,
      navigationOptions: () => ({
        // headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            size={TAB_ICON_SIZE}
            color={tintColor}
            name="md-notifications-outline"
          />
        ),
      }),
    },
    Settings: {
      screen: HomeScreen,
      navigationOptions: () => ({
        // headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons
            size={TAB_ICON_SIZE}
            color={tintColor}
            name="settings"
          />
        ),
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightGrey,
      style: {
        backgroundColor: colors.tabBarColor,
        borderTopColor: colors.tabBarColor,
        height: 50,
      },
    },
  },
);

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        headerTitle: 'KeepMyFolio',
        headerStyle: {
          backgroundColor: colors.white,
        },
      },
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.white,
    },
  },
);

type Props = {
  nav: NavigationState,
  dispatch: Function,
};

class AppNavigator extends Component<void, Props, void> {
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
