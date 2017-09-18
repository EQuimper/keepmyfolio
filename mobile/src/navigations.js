// @flow

import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
  TabBarBottom,
} from 'react-navigation';
import { StatusBar, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import type {
  State,
  NavigationState,
  ThemeColorsData,
  Navigation,
} from './types';

import HomeScreen from './screens/HomeScreen';
import CoinDetailsScreen from './screens/CoinDetailsScreen';
import AddCoinScreen from './screens/AddCoinScreen';
import WalletScreen from './screens/WalletScreen';
import SettingScreen from './screens/SettingScreen';
import NotificationScreen from './screens/NotificationScreen';

import { colors } from './utils/constants';
import ButtonHeader from './components/commons/ButtonHeader';
import BackButton from './components/commons/BackButton';
import HighLightTab from './components/HighLightTab';
import AddButtonTab from './components/AddButtonTab';

const TAB_ICON_SIZE = 25;

const TabBarBottomConnected = connect((state: State) => ({
  style: {
    backgroundColor: state.app.theme.tabBarColor,
    borderTopColor: state.app.theme.tabBarColor,
    height: 50,
  },
}))(TabBarBottom);

type NavProps = {
  screenProps: {
    theme: ThemeColorsData,
    darkTheme: boolean,
  },
  navigation: Navigation,
};

const AddCoinNavigator = StackNavigator({
  AddCoin: {
    screen: AddCoinScreen,
    navigationOptions: (props: NavProps) => ({
      headerTitle: 'Add an holding',
      headerTitleStyle: {
        color: props.screenProps.theme.headerTitleColor,
      },
      headerStyle: {
        backgroundColor: props.screenProps.theme.tabBarColor,
      },
      headerRight: null,
    }),
  },
});

const WalletNavigator = StackNavigator({
  Wallet: {
    screen: WalletScreen,
    navigationOptions: (props: NavProps) => ({
      headerTitle: 'My Wallet',
      headerTitleStyle: {
        color: props.screenProps.theme.headerTitleColor,
      },
      headerStyle: {
        backgroundColor: props.screenProps.theme.tabBarColor,
      },
      headerRight: (
        <ButtonHeader side="right" onPress={() => null}>
          <Ionicons size={25} color={colors.lightGrey} name="ios-search" />
        </ButtonHeader>
      ),
    }),
  },
});

const SettingNavigator = StackNavigator({
  Setting: {
    screen: SettingScreen,
    navigationOptions: (props: NavProps) => ({
      headerTitle: 'Settings',
      headerTitleStyle: {
        color: props.screenProps.theme.headerTitleColor,
      },
      headerStyle: {
        backgroundColor: props.screenProps.theme.tabBarColor,
      },
      headerRight: null,
    }),
  },
});

const HomeNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: (props: NavProps) => ({
        headerTitle: 'KeepMyFolio',
        headerTitleStyle: {
          color: props.screenProps.theme.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: props.screenProps.theme.tabBarColor,
        },
        headerRight: (
          <ButtonHeader side="right" onPress={() => null}>
            <Ionicons size={25} color={colors.lightGrey} name="ios-search" />
          </ButtonHeader>
        ),
      }),
    },
    CoinDetailsScreen: {
      screen: CoinDetailsScreen,
      navigationOptions: (props: NavProps) => ({
        headerTitle: props.navigation.state.params.coin.name,
        headerBackTitle: null,
        headerTitleStyle: {
          color: props.screenProps.theme.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: props.screenProps.theme.tabBarColor,
        },
        headerLeft: <BackButton goBack={props.navigation.goBack} />,
        headerRight: (
          <ButtonHeader side="right" onPress={() => null}>
            <Ionicons size={25} color={colors.lightGrey} name="ios-search" />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: colors.darkGray,
    },
  },
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
        ),
      }),
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
        ),
      }),
    },
    AddCoin: {
      screen: AddCoinNavigator,
      navigationOptions: (props: NavProps) => ({
        tabBarIcon: () => (
          <AddButtonTab backgroundColor={props.screenProps.theme.tabBarColor}>
            <Ionicons size={TAB_ICON_SIZE} color={colors.white} name="md-add" />
          </AddButtonTab>
        ),
      }),
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <HighLightTab focused={focused}>
            <SimpleLineIcons
              size={TAB_ICON_SIZE}
              color={tintColor}
              name="bell"
            />
          </HighLightTab>
        ),
      }),
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
        ),
      }),
    },
  },
  {
    // TODO: remove this :)
    // initialRouteName: 'Wallet',
    lazy: false,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    // TODO: check for it
    animationEnabled: true,
    navigationOptions: {
      headerVisible: false,
    },
    tabBarComponent: TabBarBottomConnected,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightGrey,
      pressColor: colors.primary,
    },
  },
);

const AppMainNav = StackNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Tabs',
    cardStyle: {
      backgroundColor: colors.darkGray,
    },
  },
);

type BarStyleProps = 'light-content' | 'dark-content';

type Props = {
  nav: NavigationState,
  dispatch: Function,
  theme: ThemeColorsData,
  darkTheme: boolean,
};

class AppNavigator extends Component<void, Props, void> {
  get _getBarStyle(): BarStyleProps {
    if (this.props.darkTheme) {
      return 'light-content';
    }

    return 'dark-content';
  }

  render() {
    const screenProps = {
      theme: this.props.theme,
      darkTheme: this.props.darkTheme,
    };

    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    // if (!this.props.user.isAuthenticated) {
    //   return <AuthenticationScreen />;
    // }
    return (
      <View style={styles.root}>
        <StatusBar barStyle={this._getBarStyle} />
        <AppMainNav navigation={nav} screenProps={screenProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default connect((state: State) => ({
  nav: state.nav,
  theme: state.app.theme,
  darkTheme: state.app.darkTheme,
}))(AppNavigator);

export const router = AppMainNav.router;
