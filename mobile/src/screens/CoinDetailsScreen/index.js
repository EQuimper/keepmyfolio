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

import CoinDetailsTabs from './CoinDetailsTabs';

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
    const { coin } = navigation.state.params;
    // const { timeSelect } = this.state;

    const screenProps = {
      theme,
      coin,
    };
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <CoinDetailsTabs screenProps={screenProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default connect((state: AppState) => ({
  theme: state.app.theme,
}))(CoinDetailsScreen);
