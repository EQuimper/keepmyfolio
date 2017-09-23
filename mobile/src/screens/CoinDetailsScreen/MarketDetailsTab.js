// @flow

import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import idx from 'idx';
import { graphql, createRefetchContainer } from 'react-relay';

// ------------------------------------
// TYPES
// ------------------------------------
import type { MarketDetailsTab_coin as Coin } from './__generated__/MarketDetailsTab_coin.graphql';
import type { Navigation, ThemeColorsData, RelayType } from '../../types';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import MetaCard from './MetaCard';
// ------------------------------------
// UTILS
// ------------------------------------
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';
import { moneyThousand, thousandSpace } from '../../utils/helpers/formatNumber';
import { colors } from '../../utils/constants';
import { createRenderer } from '../../RelayUtils';

const styles = StyleSheet.create({
  metaWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
  },
});

type Props = {
  navigation: Navigation,
  screenProps: {
    theme: ThemeColorsData,
  },
  coin: Coin,
  relay: RelayType,
};

type State = {
  refreshing: boolean,
};

// TODO: Refactor code
class MarketDetailsTab extends Component<void, Props, State> {
  state = {
    refreshing: false,
  };

  _percent1hColor(): string {
    const _coin = idx(this.props, _ => _.coin);
    const _percentChang1h = idx(_coin, _ => _.percentChange1h) || '0';

    if (getIfPercentNegative(_percentChang1h)) {
      return this.props.screenProps.theme.red;
    }

    return this.props.screenProps.theme.green;
  }

  _percent24hColor(): string {
    const _coin = idx(this.props, _ => _.coin);
    const _percentChang24h = idx(_coin, _ => _.percentChange24h) || '0';

    if (getIfPercentNegative(_percentChang24h)) {
      return this.props.screenProps.theme.red;
    }

    return this.props.screenProps.theme.green;
  }

  _percent7dColor(): string {
    const _coin = idx(this.props, _ => _.coin);
    const _percentChang7d = idx(_coin, _ => _.percentChange7d) || '0';

    if (getIfPercentNegative(_percentChang7d)) {
      return this.props.screenProps.theme.red;
    }

    return this.props.screenProps.theme.green;
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.relay.refetch({ coinId: this.props.coin.id }, null, null, {
      force: true,
    });
    this.setState({ refreshing: false });
  };

  render() {
    const { coin } = this.props;
    const { theme } = this.props.screenProps;

    const _marketCap = thousandSpace(idx(coin, _ => _.marketCapUsd) || '0');
    const _percentChang1h = thousandSpace(
      idx(coin, _ => _.percentChange1h) || '0',
    );
    const _percentChang24h = thousandSpace(
      idx(coin, _ => _.percentChange24h) || '0',
    );
    const _percentChang7d = thousandSpace(
      idx(coin, _ => _.percentChange7d) || '0',
    );
    const _price = moneyThousand(idx(coin, _ => _.priceUsd) || '0');
    const _priceBtc = thousandSpace(idx(coin, _ => _.priceBtc) || '0');
    const _totalSuply = thousandSpace(idx(coin, _ => _.totalSuply) || '0');
    const _volume = thousandSpace(idx(coin, _ => _.volumeUsd24h) || '0');

    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <ScrollView
          contentContainerStyle={styles.metaWrapper}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={this.state.refreshing}
              tintColor={colors.primary}
            />
          }
        >
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={theme.textColor}
            title="Price USD"
            value={_price}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={theme.textColor}
            title="Market Cap"
            value={_marketCap}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={theme.textColor}
            title="Price BTC"
            value={_priceBtc}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={theme.textColor}
            title="Total Supply"
            value={_totalSuply}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={theme.textColor}
            title="VOLUME"
            value={_volume}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={this._percent1hColor()}
            title="% CHANGE 1H"
            value={_percentChang1h}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={this._percent24hColor()}
            title="% CHANGE 24H"
            value={_percentChang24h}
          />
          <MetaCard
            backgroundColor={theme.tabBarColor}
            textColor={this._percent7dColor()}
            title="% CHANGE 7D"
            value={_percentChang7d}
          />
        </ScrollView>
      </View>
    );
  }
}

const FragmentContainer = createRefetchContainer(
  MarketDetailsTab,
  graphql`
    fragment MarketDetailsTab_coin on Crypto {
      id
      priceUsd
      marketCapUsd
      priceBtc
      totalSuply
      volumeUsd24h
      percentChange1h
      percentChange24h
      percentChange7d
    }
  `,
  graphql`
    query MarketDetailsTabRefetchQuery($coinId: ID!) {
      coin: node(id: $coinId) {
        ...MarketDetailsTab_coin
      }
    }
  `,
);

export default createRenderer(FragmentContainer, {
  query: graphql`
    query MarketDetailsTabQuery($coinId: ID!) {
      coin: node(id: $coinId) {
        ...MarketDetailsTab_coin
      }
    }
  `,
  queriesParams: (props: Props) => ({
    coinId: props.navigation.state.params.coinId,
  }),
});
