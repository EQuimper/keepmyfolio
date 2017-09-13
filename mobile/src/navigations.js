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
import CoinDetailsScreen from './screens/CoinDetailsScreen';
import AddCoinScreen from './screens/AddCoinScreen';
import WalletScreen from './screens/WalletScreen';
import SettingScreen from './screens/SettingScreen';

import { colors, themes } from './utils/constants';
import ButtonHeader from './components/commons/ButtonHeader';
import BackButton from './components/commons/BackButton';
import HighLightTab from './components/HighLightTab';

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
  backgroundColor: ${props => props.theme.tabBarColor};
  marginTop: -30;
`;

const AddCoinNavigator = StackNavigator(
  {
    AddCoin: {
      screen: AddCoinScreen,
      navigationOptions: () => ({
        headerTitle: 'Add an holding',
        headerTitleStyle: {
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: themes.dark.tabBarColor,
        },
        headerRight: null
      })
    }
  },
)

const WalletNavigator = StackNavigator(
  {
    Wallet: {
      screen: WalletScreen,
      navigationOptions: () => ({
        headerTitle: 'My Wallet',
        headerTitleStyle: {
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: themes.dark.tabBarColor,
        },
        headerRight: (
          <ButtonHeader side="right" onPress={() => null}>
            <Ionicons size={25} color={colors.lightGrey} name="ios-search-outline" />
          </ButtonHeader>
        )
      })
    }
  }
)

const SettingNavigator = StackNavigator(
  {
    Setting: {
      screen: SettingScreen,
      navigationOptions: () => ({
        headerTitle: 'Settings',
        headerTitleStyle: {
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: themes.dark.tabBarColor,
        },
        headerRight: null,
      })
    }
  }
)

const HomeNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'KeepMyFolio',
        headerTitleStyle: {
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: themes.dark.tabBarColor,
        },
        headerRight: (
          <ButtonHeader side="right" onPress={() => null}>
            <Ionicons size={25} color={colors.lightGrey} name="ios-search-outline" />
          </ButtonHeader>
        )
      })
    },
    CoinDetailsScreen: {
      screen: CoinDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.name,
        headerBackTitle: null,
        headerTitleStyle: {
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: themes.dark.tabBarColor,
        },
        headerLeft: <BackButton goBack={navigation.goBack} />,
        headerRight: (
          <ButtonHeader side="right" onPress={() => null}>
            <Ionicons size={25} color={colors.lightGrey} name="ios-search-outline" />
          </ButtonHeader>
        )
      })
    }
  },
  {
    headerMode: 'screen',
    cardStyle: {
      // backgroundColor: colors.tabBarColor,
      backgroundColor: themes.dark.tabBarColor
    }
  }
);

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <HighLightTab focused={focused}>
            <SimpleLineIcons
              size={TAB_ICON_SIZE}
              color={tintColor}
              name="home"
            />
          </HighLightTab>
        )
      })
    },
    Wallet: {
      screen: WalletNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <HighLightTab focused={focused}>
            <SimpleLineIcons
              size={TAB_ICON_SIZE}
              color={tintColor}
              name="wallet"
            />
          </HighLightTab>
        )
      })
    },
    AddCoin: {
      screen: AddCoinNavigator,
      navigationOptions: () => ({
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
        )
      })
    },
    Notifications: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <HighLightTab focused={focused}>
            <SimpleLineIcons
              size={TAB_ICON_SIZE}
              color={tintColor}
              name="bell"
            />
          </HighLightTab>
        )
      })
    },
    Settings: {
      screen: SettingNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <HighLightTab focused={focused}>
            <SimpleLineIcons
              size={TAB_ICON_SIZE}
              color={tintColor}
              name="settings"
            />
          </HighLightTab>
        )
      })
    }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    navigationOptions: {
      headerVisible: false
    },
    // initialRouteName: 'AddCoin',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightGrey,
      pressColor: colors.primary,
      style: {
        backgroundColor: themes.dark.tabBarColor,
        borderTopColor: themes.dark.tabBarColor,
        height: 50
      }
    }
  }
);

const AppMainNav = StackNavigator(
  {
    Tabs: {
      screen: Tabs
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Tabs',
    cardStyle: {
      // backgroundColor: colors.tabBarColor,
      backgroundColor: themes.dark.tabBarColor
    }
  }
);

type Props = {
  nav: NavigationState,
  dispatch: Function
};

class AppNavigator extends Component<void, Props, void> {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav
    });
    // if (!this.props.user.isAuthenticated) {
    //   return <AuthenticationScreen />;
    // }
    return <AppMainNav navigation={nav} />;
  }
}

export default connect((state: State) => ({
  nav: state.nav
}))(AppNavigator);

export const router = AppMainNav.router;
