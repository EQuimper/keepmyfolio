// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// ------------------------------------
// TYPES
// ------------------------------------
import type {
  State as AppState,
  ThemeColorsData,
  TimeSelect,
} from '../../types';
import type { Coin_coin as Coin } from '../HomeScreen/__generated__/Coin_coin.graphql';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import CoinDetailsTabs from './CoinDetailsTabs';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  navigation: {
    state: {
      params: {
        coin: Coin,
      },
    },
  },
  theme: ThemeColorsData,
};

type State = {
  timeSelect: TimeSelect,
};
// TODO: Remove this unused component or keep it for passing theme
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
      coinId: coin.id
      // coin,
    };
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <CoinDetailsTabs screenProps={screenProps} />
      </View>
    );
  }
}

export default connect((state: AppState) => ({
  theme: state.app.theme,
}))(CoinDetailsScreen);
