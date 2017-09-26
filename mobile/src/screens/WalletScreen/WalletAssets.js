// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';
// ------------------------------------
// TYPES
// ------------------------------------
import type { ThemeColorsData } from '../../types';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import WalletHeader from './WalletHeader';
import AssetItem from './AssetItem';
// ------------------------------------
// UTILS
// ------------------------------------
import { getWalletTotalAmount } from '../../selectors/wallet';
import { createRenderer } from '../../RelayUtils';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  screenProps: {
    theme: ThemeColorsData,
  },
  totalAmount: string,
};

type State = {
  isNeg: boolean,
};

class WalletAssets extends PureComponent<void, Props, State> {
  state = {
    isNeg: false,
  };

  render() {
    const { theme } = this.props.screenProps;
    const { totalAmount } = this.props;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <WalletHeader
          isNeg={this.state.isNeg}
          theme={theme}
          totalAssets={totalAmount}
          totalGain={8.99}
          totalPercent={0.25}
        />
        <AssetItem />
        <AssetItem />
        <AssetItem />
      </View>
    );
  }
}

const WalletAssetsConnected = connect((state, props) => ({
  totalAmount: getWalletTotalAmount(state, props),
}))(WalletAssets);

const FragmentContainer = createFragmentContainer(
  WalletAssetsConnected,
  graphql`
    fragment WalletAssets_viewer on Viewer {
      cryptos(first: $count, after: $cursor)
        @connection(key: "ModalCryptocurencie_cryptos") {
        edges {
          node {
            id
            priceUsd
            cryptoId
          }
        }
      }
    }
  `,
);

export default createRenderer(FragmentContainer, {
  query: graphql`
    query WalletAssetsQuery($count: Int!, $cursor: String) {
      viewer {
        ...WalletAssets_viewer
      }
    }
  `,
  queriesParams: () => ({
    count: 100,
    cursor: null,
  }),
});
