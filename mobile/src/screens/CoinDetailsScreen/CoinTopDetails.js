// @flow

import React, { Component } from 'react';
import idx from 'idx';
import { View, StyleSheet, ScrollView } from 'react-native';

import type { Coin_coin as Coin } from '../HomeScreen/__generated__/Coin_coin.graphql';
import type { ThemeColorsData, TimeSelect } from '../../types';

import { colors } from '../../utils/constants';
import TimeButton from './TimeButton';
import MetaCard from './MetaCard';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';

const titleEls = ['1d', '7d', '1m', '6m', '1y', 'ALL'];

const styles = StyleSheet.create({
  root: {
    flex: 45,
  },
  buttonsWrapper: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  metaWrapper: {
    flexDirection: 'row',
    flex: 80,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 10
  },
  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
});

type Props = {
  coin: Coin,
  theme: ThemeColorsData,
  timeSelect: TimeSelect,
  selectTime: (timeSelect: TimeSelect) => void,
};

class CoinTopDetails extends Component<void, Props, void> {
  get _percent1hColor(): string {
    const _coin = idx(this.props, _ => _.coin);
    const _percentChang1h = idx(_coin, _ => _.percentChange1h) || '0';

    if (getIfPercentNegative(_percentChang1h)) {
      return this.props.theme.red;
    }

    return this.props.theme.green;
  }

  get _percent24hColor(): string {
    const _coin = idx(this.props, _ => _.coin);
    const _percentChang24h = idx(_coin, _ => _.percentChange24h) || '0';

    if (getIfPercentNegative(_percentChang24h)) {
      return this.props.theme.red;
    }

    return this.props.theme.green;
  }

  get _percent7dColor(): string {
    const _coin = idx(this.props, _ => _.coin);
    const _percentChang7d = idx(_coin, _ => _.percentChange7d) || '0';

    if (getIfPercentNegative(_percentChang7d)) {
      return this.props.theme.red;
    }

    return this.props.theme.green;
  }

  _renderTimeButtons = (title: string) => {
    let isActive: boolean = false;

    if (title === this.props.timeSelect) {
      isActive = true;
    }

    return (
      <TimeButton
        selectTime={this.props.selectTime}
        key={title}
        isActive={isActive}
        title={title}
        titleColor={this.props.theme.textColor}
      />
    );
  };

  render() {
    const { theme, coin } = this.props;

    const _price = idx(coin, _ => _.priceUsd) || '0';
    const _marketCap = idx(coin, _ => _.marketCapUsd) || '0';
    const _priceBtc = idx(coin, _ => _.priceBtc) || '0';
    const _totalSuply = idx(coin, _ => _.totalSuply) || '0';
    const _volume = idx(coin, _ => _.volumeUsd24h) || '0';
    const _percentChang1h = idx(coin, _ => _.percentChange1h) || '0';
    const _percentChang24h = idx(coin, _ => _.percentChange24h) || '0';
    const _percentChang7d = idx(coin, _ => _.percentChange7d) || '0';

    return (
      <View style={styles.root}>
        <View style={styles.buttonsWrapper}>
          {titleEls.map(this._renderTimeButtons)}
        </View>
        <View style={styles.infoWrapper}>
          <ScrollView contentContainerStyle={styles.metaWrapper}>
            <MetaCard
              textColor={theme.textColor}
              backgroundColor={theme.tabBarColor}
              title="Price USD"
              value={_price}
            />
            <MetaCard
              textColor={theme.textColor}
              backgroundColor={theme.tabBarColor}
              title="Market Cap"
              value={_marketCap}
            />
            <MetaCard
              textColor={theme.textColor}
              backgroundColor={theme.tabBarColor}
              title="Price BTC"
              value={_priceBtc}
            />
            <MetaCard
              textColor={theme.textColor}
              backgroundColor={theme.tabBarColor}
              title="Total Supply"
              value={_totalSuply}
            />
            <MetaCard
              textColor={theme.textColor}
              backgroundColor={theme.tabBarColor}
              title="VOLUME"
              value={_volume}
            />
            <MetaCard
              textColor={this._percent1hColor}
              backgroundColor={theme.tabBarColor}
              title="% CHANGE 1H"
              value={_percentChang1h}
            />
            <MetaCard
              textColor={this._percent24hColor}
              backgroundColor={theme.tabBarColor}
              title="% CHANGE 24H"
              value={_percentChang24h}
            />
            <MetaCard
              textColor={this._percent7dColor}
              backgroundColor={theme.tabBarColor}
              title="% CHANGE 7D"
              value={_percentChang7d}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CoinTopDetails;
