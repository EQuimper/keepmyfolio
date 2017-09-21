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
          <Entypo color={tintColor} name="grid" size={30} />
        ),
      }),
    },
    LineGraph: {
      screen: LineGraphDetails,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo color={tintColor} name="area-graph" size={30} />
        ),
      }),
    },
    BarGraph: {
      screen: MarketDetailsTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo color={tintColor} name="bar-graph" size={30} />
        ),
      }),
    },
    CandleGraph: {
      screen: MarketDetailsTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons color={tintColor} name="graphic-eq" size={30} />
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
