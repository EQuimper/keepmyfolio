// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { connect } from 'react-redux';

/**
 * TYPES
 */
import type { ThemeColorsData } from '../../types';

/**
 * COMPONENTS
 */
import WalletHeader from './WalletHeader';
import AssetItem from './AssetItem';
import { NameText } from '../../components/commons/Typographie';

/**
 * TYPES
 */
import type { WalletAssets_viewer as Viewer } from './__generated__/WalletAssets_viewer.graphql';

/**
 * UTILS
 */
import { createRenderer } from '../../RelayUtils';
import { getWalletTotalAmount } from '../../selectors/wallet';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    color: colors.lightGrey,
  },
  titleWrapper: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  titleItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    paddingBottom: 5,
  },
  scroll: {
    marginTop: 5,
  }
});

type Props = {
  screenProps: {
    theme: ThemeColorsData,
  },
  totalAmount: string,
  totalPercent: string,
  totalAmountChange: string,
  viewer: Viewer,
};

class WalletAssets extends PureComponent<Props, {}> {
  state = {};
  render() {
    const { theme } = this.props.screenProps;
    const { viewer, totalAmount, totalPercent, totalAmountChange } = this.props;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <WalletHeader
          cryptos={viewer.cryptos}
          theme={theme}
          totalAssets={totalAmount}
          totalGain={totalAmountChange}
          totalPercent={totalPercent}
        />
        <View
          style={[styles.titleWrapper, { backgroundColor: theme.tabBarColor }]}
        >
          <View style={styles.titleItem}>
            <NameText style={styles.title}>Name</NameText>
          </View>
          <View style={styles.titleItem}>
            <NameText style={styles.title}>Holdings</NameText>
          </View>
          <View style={styles.titleItem}>
            <NameText style={styles.title}>Cost</NameText>
          </View>
          <View style={styles.titleItem}>
            <NameText style={styles.title}>Value</NameText>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.list} style={styles.scroll}>
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
          <AssetItem theme={theme} />
        </ScrollView>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const _getWalletTotalAmount = getWalletTotalAmount();

  const mapStateToProps = (state, props) => ({
    totalAmount: _getWalletTotalAmount(state, props).totalAmount,
    totalPercent: _getWalletTotalAmount(state, props).totalPercentChange,
    totalAmountChange: _getWalletTotalAmount(state, props).totalAmountChange,
  });

  return mapStateToProps;
};

const WalletAssetsConnected = connect(makeMapStateToProps)(WalletAssets);

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
