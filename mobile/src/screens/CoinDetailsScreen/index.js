// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import type {
  State as AppState,
  ThemeColorsData,
  TimeSelect,
} from '../../types';
import type { Coin_coin as Coin } from '../HomeScreen/__generated__/Coin_coin.graphql';

import CoinDetailsLine from '../../components/charts/CoinDetailsLine';
import CoindDetailsCandle from '../../components/charts/CoindDetailsCandle';
import CoinTopDetails from './CoinTopDetails';
import { colors } from '../../utils/constants';

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

type Props = {
  theme: ThemeColorsData,
  navigation: {
    state: {
      params: {
        coin: Coin,
      },
    },
  },
};

type State = {
  timeSelect: TimeSelect,
};

class CoinDetailsScreen extends PureComponent<void, Props, State> {
  state = {
    timeSelect: '1d',
  };

  _selectTime = (timeSelect: TimeSelect) => this.setState({ timeSelect });

  render() {
    const { theme, navigation } = this.props;
    const { timeSelect } = this.state;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <CoinTopDetails
          selectTime={this._selectTime}
          timeSelect={timeSelect}
          coin={navigation.state.params.coin}
          theme={theme}
        />

        <CoinDetailsLine values={VALUES[this.state.timeSelect]} theme={theme} />
        <View style={styles.bottomWrapper} />
      </View>
    );
  }
}

// <CoinDetailsLine values={VALUES[this.state.timeSelect]} theme={theme} />

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bottomWrapper: {
    flex: 25,
    backgroundColor: colors.primaryLight,
  },
});

export default connect((state: AppState) => ({
  theme: state.app.theme,
}))(CoinDetailsScreen);

// <CoindDetailsCandle />
