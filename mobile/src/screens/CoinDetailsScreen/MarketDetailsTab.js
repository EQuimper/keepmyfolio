// @flow

import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import idx from 'idx';

import type { Coin_coin as Coin } from '../HomeScreen/__generated__/Coin_coin.graphql';
import type { Navigation, ThemeColorsData } from '../../types';

import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';
import MetaCard from './MetaCard';

const styles = StyleSheet.create({
  metaWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

type Props = {
  navigation: Navigation,
  screenProps: {
    theme: ThemeColorsData,
    coin: Coin,
  },
};

// TODO: Refactor code
class MarketDetailsTab extends Component<void, Props, void> {
  get _percent1hColor(): string {
    const _coin = idx(this.props.screenProps, _ => _.coin);
    const _percentChang1h = idx(_coin, _ => _.percentChange1h) || '0';

    if (getIfPercentNegative(_percentChang1h)) {
      return this.props.screenProps.theme.red;
    }

    return this.props.screenProps.theme.green;
  }

  get _percent24hColor(): string {
    const _coin = idx(this.props.screenProps, _ => _.coin);
    const _percentChang24h = idx(_coin, _ => _.percentChange24h) || '0';

    if (getIfPercentNegative(_percentChang24h)) {
      return this.props.screenProps.theme.red;
    }

    return this.props.screenProps.theme.green;
  }

  get _percent7dColor(): string {
    const _coin = idx(this.props.screenProps, _ => _.coin);
    const _percentChang7d = idx(_coin, _ => _.percentChange7d) || '0';

    if (getIfPercentNegative(_percentChang7d)) {
      return this.props.screenProps.theme.red;
    }

    return this.props.screenProps.theme.green;
  }

  render() {
    const { theme, coin } = this.props.screenProps;

    const _price = idx(coin, _ => _.priceUsd) || '0';
    const _marketCap = idx(coin, _ => _.marketCapUsd) || '0';
    const _priceBtc = idx(coin, _ => _.priceBtc) || '0';
    const _totalSuply = idx(coin, _ => _.totalSuply) || '0';
    const _volume = idx(coin, _ => _.volumeUsd24h) || '0';
    const _percentChang1h = idx(coin, _ => _.percentChange1h) || '0';
    const _percentChang24h = idx(coin, _ => _.percentChange24h) || '0';
    const _percentChang7d = idx(coin, _ => _.percentChange7d) || '0';

    return (
      <ScrollView contentContainerStyle={styles.metaWrapper}>
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
          textColor={this._percent1hColor}
          title="% CHANGE 1H"
          value={_percentChang1h}
        />
        <MetaCard
          backgroundColor={theme.tabBarColor}
          textColor={this._percent24hColor}
          title="% CHANGE 24H"
          value={_percentChang24h}
        />
        <MetaCard
          backgroundColor={theme.tabBarColor}
          textColor={this._percent7dColor}
          title="% CHANGE 7D"
          value={_percentChang7d}
        />
      </ScrollView>
    );
  }
}

export default MarketDetailsTab;
