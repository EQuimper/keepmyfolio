// @flow

import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator, TabBarTop } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type { State } from '../../types';

import MarketDetailsTab from './MarketDetailsTab';
import LineGraphDetails from './LineGraphDetails';
import { colors } from '../../utils/constants';

const TabsConnected = connect((state: State) => ({
  style: {
    backgroundColor: state.app.theme.tabBarColor,
    borderTopColor: state.app.theme.tabBarColor,
    height: 50,
  },
}))(TabBarTop);

export default TabNavigator(
  {
    MarketDetails: {
      screen: MarketDetailsTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo size={30} color={tintColor} name="grid" />
        ),
      }),
    },
    LineGraph: {
      screen: LineGraphDetails,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo size={30} color={tintColor} name="area-graph" />
        ),
      }),
    },
    BarGraph: {
      screen: MarketDetailsTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo size={30} color={tintColor} name="bar-graph" />
        ),
      }),
    },
    CandleGraph: {
      screen: MarketDetailsTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons size={30} color={tintColor} name="graphic-eq" />
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
