// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { List, Map } from 'immutable';

/**
 * TYPES
 */
import type { State as AppState, ThemeColorsData } from '../../types';
import type { WalletPieTab_viewer as Viewer } from './__generated__/WalletPieTab_viewer.graphql';

/**
 * COMPONENTS
 */
import PortfolioPie from '../../components/charts/PortfolioPie';
import WalletGraph from '../../components/charts/WalletGraph';
import WalletHeader from './WalletHeader';

/**
 * UTILS
 */
import { getColorForWalletGraph } from '../../utils/helpers/getColorForWalletGraph';
import { createRenderer } from '../../RelayUtils';
import { getWalletTotalAmount, getPieData } from '../../selectors/wallet';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  walletPieWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 5,
  },
  walletGraphWrapper: {
    flex: 0.8,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
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
  totalAmount: string,
  totalPercent: string,
  totalAmountChange: string,
  viewer: Viewer,
  pieData: List<Map<string, { name: string, percent: string }>>,
};

type State = {
  graphHistoryData: DataProps,
  selectedCryptoIndex: number,
  width: number,
};

class WalletPieTab extends PureComponent<Props, State> {
  state = {
    graphHistoryData: data,
    selectedCryptoIndex: 0,
    width: Dimensions.get('window').width,
  };

  _getColor(): string {
    return getColorForWalletGraph(
      this.props.darkTheme,
      this.state.selectedCryptoIndex,
    );
  }

  // TODO: REMOVE IT WAS FOR DEMO
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
    const { theme, totalAmount, totalPercent, pieData, totalAmountChange } = this.props;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <WalletHeader
          theme={theme}
          totalAssets={totalAmount}
          totalGain={totalAmountChange}
          totalPercent={totalPercent}
        />
        <View
          style={[
            styles.walletPieWrapper,
            { backgroundColor: theme.tabBarColor },
          ]}
        >
          <PortfolioPie
            color={this._getColor()}
            darkTheme={this.props.darkTheme}
            data={pieData}
            onSelectCrypto={this._onSelectCrypto}
          />
        </View>
        <View style={styles.walletGraphWrapper}>
          <WalletGraph
            color={this._getColor()}
            darkTheme={this.props.darkTheme}
            data={this.state.graphHistoryData}
            theme={theme}
            width={this.state.width}
          />
        </View>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const _getWalletTotalAmount = getWalletTotalAmount();
  const _getPieData = getPieData();

  const mapStateToProps = (state: AppState, props) => ({
    theme: state.get('app').theme,
    darkTheme: state.get('app').darkTheme,
    pieData: _getPieData(state, props),
    totalAmount: _getWalletTotalAmount(state, props).totalAmount,
    totalPercent: _getWalletTotalAmount(state, props).totalPercentChange,
    totalAmountChange: _getWalletTotalAmount(state, props).totalAmountChange,
  })

  return mapStateToProps;
}

const WalletPieConnected = connect(makeMapStateToProps)(WalletPieTab);

const FragmentContainer = createFragmentContainer(
  WalletPieConnected,
  graphql`
    fragment WalletPieTab_viewer on Viewer {
      cryptos(first: $count, after: $cursor)
        @connection(key: "WalletPieTab_cryptos") {
        edges {
          node {
            id
            priceUsd
            cryptoId
            symbol
            percentChange24h
          }
        }
      }
    }
  `,
);

export default createRenderer(FragmentContainer, {
  query: graphql`
    query WalletPieTabQuery($count: Int!, $cursor: String) {
      viewer {
        ...WalletPieTab_viewer
      }
    }
  `,
  queriesParams: () => ({
    count: 100,
    cursor: null,
  }),
});
