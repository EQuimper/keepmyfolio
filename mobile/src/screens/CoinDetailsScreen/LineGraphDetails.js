// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import type { Navigation, ThemeColorsData, TimeSelect } from '../../types';

import CoinDetailsLine from '../../components/charts/CoinDetailsLine';
import CoinTopDetails from './CoinTopDetails';

function getFake(length?: number = 20): Array<number> {
  return Array.from({ length }).map(() => Math.floor(Math.random() * 100) + 1);
}

const VALUES = {
  '1d': [...getFake()],
  '7d': [...getFake()],
  '1m': [...getFake()],
  '6m': [...getFake()],
  '1y': [...getFake()],
  ALL: [...getFake()],
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  screenProps: {
    theme: ThemeColorsData,
  },
  navigation: Navigation,
};

type State = {
  timeSelect: TimeSelect,
};

class LineGraphDetails extends Component<void, Props, State> {
  state = {
    timeSelect: '1d',
  };

  _selectTime = (timeSelect: TimeSelect) => this.setState({ timeSelect });

  render() {
    const { theme } = this.props.screenProps;
    const { timeSelect } = this.state;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <CoinTopDetails
          selectTime={this._selectTime}
          theme={theme}
          timeSelect={timeSelect}
        />
        <CoinDetailsLine theme={theme} values={VALUES[timeSelect]} />
      </View>
    );
  }
}

export default LineGraphDetails;
