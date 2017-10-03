// @flow

import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator, TabBarTop } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * TYPES
 */
import type { State } from '../../types';

/**
 * COMPONENTS
 */
import WalletPieTab from './WalletPieTab';
import WalletAssets from './WalletAssets';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';

const ICON_SIZE = 30;

const TabsConnected = connect((state: State) => ({
  style: {
    backgroundColor: state.get('app').theme.tabBarColor,
    borderTopColor: state.get('app').theme.tabBarColor,
    height: 50,
  },
}))(TabBarTop);

export default TabNavigator(
  {
    WalletAssets: {
      screen: WalletAssets,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo color={tintColor} name="list" size={ICON_SIZE} />
        ),
      }),
    },
    WalletPie: {
      screen: WalletPieTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            color={tintColor}
            name="chart-pie"
            size={ICON_SIZE}
          />
        ),
      }),
    },
  },
  {
    lazy: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabsConnected,
    tabBarPosition: 'top',
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: colors.primary,
      },
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightGrey,
      pressColor: colors.primary,
      showIcon: true,
      showLabel: false,
    },
  },
);
