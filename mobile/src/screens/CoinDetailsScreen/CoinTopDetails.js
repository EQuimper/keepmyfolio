// @flow

import React, { Component } from 'react';
import idx from 'idx';
import { Image, View, StyleSheet } from 'react-native';

import type { Coin_coin as Coin } from '../HomeScreen/__generated__/Coin_coin.graphql';
import type { ThemeColorsData, TimeSelect } from '../../types';

import { CoinMarket } from '../../utils/api';
import { colors } from '../../utils/constants';
import TimeButton from './TimeButton';
import MetaCard from './MetaCard';

const titleEls = ['1d', '7d', '1m', '6m', '1y'];

const IMG_HEIGHT = 64;

type Props = {
  coin: Coin,
  theme: ThemeColorsData,
  timeSelect: TimeSelect,
  selectTime: (timeSelect: TimeSelect) => void,
};

class CoinTopDetails extends Component<void, Props, void> {
  get _getImage(): string {
    return CoinMarket.getImage(
      idx(this.props, _ => _.coin.cryptoId),
      IMG_HEIGHT,
    );
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

    return (
      <View style={styles.root}>
        <View style={styles.buttonsWrapper}>
          {titleEls.map(this._renderTimeButtons)}
        </View>
        <View style={styles.infoWrapper}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{ uri: this._getImage }} />
          </View>
          <View style={styles.metaWrapper}>
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
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 45,
  },
  img: {
    height: IMG_HEIGHT,
    width: IMG_HEIGHT,
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
  },
  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  imgWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CoinTopDetails;
