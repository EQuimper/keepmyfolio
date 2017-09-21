// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, ScrollView, View } from 'react-native';
// ------------------------------------
// TYPES
// ------------------------------------
import type { State as AppState, ThemeColorsData } from '../../types';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import PortfolioPie from '../../components/charts/PortfolioPie';
import WalletGraph from '../../components/charts/WalletGraph';
import WalletHeader from './WalletHeader';
// ------------------------------------
// UTILS
// ------------------------------------
import { getColorForWalletGraph } from '../../utils/helpers/getColorForWalletGraph';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollViewContentContainer: {
    paddingBottom: 5,
  },
  walletPieWrapper: {
    height: 250,
    width: '100%',
    marginTop: 5,
  },
  walletGraphWrapper: {
    height: 200,
    width: '100%',
    marginTop: 5,
  },
});

type DataProps = Array<{
  date: number,
  amount: number,
}>;

const data: DataProps = [];

for (let i = 0; i < 25; i++) {
  data.push({
    date: 2000 + i,
    amount: parseFloat((Math.random() * 100).toFixed(2)),
  });
}

type Props = {
  theme: ThemeColorsData,
  darkTheme: boolean,
};

type State = {
  isNeg: boolean,
  graphHistoryData: DataProps,
  selectedCryptoIndex: number,
  width: number,
};

class WalletScreen extends PureComponent<void, Props, State> {
  state = {
    isNeg: true,
    graphHistoryData: data,
    selectedCryptoIndex: 0,
    width: Dimensions.get('window').width,
  };

  get _getColor(): string {
    return getColorForWalletGraph(
      this.props.darkTheme,
      this.state.selectedCryptoIndex,
    );
  }

  _shuffle = () => {
    const newData = [];
    for (let i = 0; i < 25; i++) {
      newData.push({
        date: 2000 + i,
        amount: parseFloat((Math.random() * 100).toFixed(2)),
      });
    }

    return newData;
  };

  _onSelectCrypto = (index: number) => {
    this.setState({
      selectedCryptoIndex: index,
      graphHistoryData: this._shuffle(),
    });
  };

  render() {
    const { theme } = this.props;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <WalletHeader
            isNeg={this.state.isNeg}
            theme={theme}
            totalAssets={10256.34}
            totalGain={8.99}
            totalPercent={0.25}
          />
          <View
            style={[
              styles.walletPieWrapper,
              { backgroundColor: theme.tabBarColor },
            ]}
          >
            <PortfolioPie
              color={this._getColor}
              darkTheme={this.props.darkTheme}
              onSelectCrypto={this._onSelectCrypto}
            />
          </View>
          <View style={styles.walletGraphWrapper}>
            <WalletGraph
              color={this._getColor}
              darkTheme={this.props.darkTheme}
              data={this.state.graphHistoryData}
              theme={theme}
              width={this.state.width}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect((state: AppState) => ({
  theme: state.app.theme,
  darkTheme: state.app.darkTheme,
}))(WalletScreen);
