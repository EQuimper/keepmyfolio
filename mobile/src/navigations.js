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
// ------------------------------------
// TYPES
// ------------------------------------
import type {
  State,
  NavigationState,
  ThemeColorsData,
  Navigation,
} from './types';
// ------------------------------------
// SCREENS
// ------------------------------------
import AddCoinScreen from './screens/AddCoinScreen';
import CoinDetailsTabs from './screens/CoinDetailsScreen/CoinDetailsTabs';
import WalletTabs from './screens/WalletScreen/WalletTabs';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import SettingScreen from './screens/SettingScreen';
import WalletScreen from './screens/WalletScreen';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import AddButtonTab from './components/AddButtonTab';
import BackButton from './components/commons/BackButton';
import ButtonSearch from './components/ButtonSearch';
import HighLightTab from './components/HighLightTab';
// ------------------------------------
// UTILS
// ------------------------------------
import { colors } from './utils/constants';

const TAB_ICON_SIZE = 25;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const TabBarBottomConnected = connect((state: State) => ({
  style: {
    backgroundColor: state.get('app').theme.tabBarColor,
    borderTopColor: state.get('app').theme.tabBarColor,
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
    screen: WalletTabs,
    navigationOptions: (props: NavProps) => ({
      headerTitle: 'My Wallet',
      headerTitleStyle: {
        color: props.screenProps.theme.headerTitleColor,
      },
      headerStyle: {
        backgroundColor: props.screenProps.theme.tabBarColor,
      },
      // headerRight: <ButtonSearch />
    }),
  },
}, {
  cardStyle: {
    backgroundColor: '#161C36',
    // backgroundColor: 'transparent',
    // shadowColor: 'transparent'
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

const CoinDetailsNavigator = StackNavigator(
  {
    CoinDetailsScreen: {
      screen: CoinDetailsTabs,
    }
  },
  {
    headerMode: 'null',
    cardStyle: {
      backgroundColor: '#161C36',
      // backgroundColor: 'transparent',
      // shadowColor: 'transparent'
    },
  }
)

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
        headerRight: <ButtonSearch />,
      }),
    },
    CoinDetailsScreen: {
      screen: CoinDetailsNavigator,
      navigationOptions: (props: NavProps) => ({
        headerTitle: props.navigation.state.params.name,
        headerBackTitle: null,
        headerTitleStyle: {
          color: props.screenProps.theme.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: props.screenProps.theme.tabBarColor,
        },
        headerLeft: <BackButton goBack={props.navigation.goBack} />,
      }),
    },
  },
  {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: '#161C36',
      // backgroundColor: 'transparent',
      // shadowColor: 'transparent'
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
              color={tintColor}
              name="home"
              size={TAB_ICON_SIZE}
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
              color={tintColor}
              name="wallet"
              size={TAB_ICON_SIZE}
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
            <Ionicons color={colors.white} name="md-add" size={TAB_ICON_SIZE} />
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
              color={tintColor}
              name="bell"
              size={TAB_ICON_SIZE}
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
              color={tintColor}
              name="settings"
              size={TAB_ICON_SIZE}
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
      backgroundColor: '#161C36',
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

export default connect((state: State) => ({
  nav: state.get('nav'),
  theme: state.get('app').theme,
  darkTheme: state.get('app').darkTheme,
}))(AppNavigator);

export const router = AppMainNav.router;
