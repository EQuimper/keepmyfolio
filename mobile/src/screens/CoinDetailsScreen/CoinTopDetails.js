// @flow

import React, { Component } from 'react';
import idx from 'idx';
import { Image, View, StyleSheet, Text } from 'react-native';

import type { Coin_coin as Coin } from '../HomeScreen/__generated__/Coin_coin.graphql';
import type { ThemeColorsData, TimeSelect } from '../../types';

import { CoinMarket } from '../../utils/api';
import { colors } from '../../utils/constants';
import TimeButton from './TimeButton';

const titleEls = ['1d', '7d', '1m', '6m', '1y'];

type Props = {
  coin: Coin,
  theme: ThemeColorsData,
  timeSelect: TimeSelect,
  selectTime: (timeSelect: TimeSelect) => void,
};

class CoinTopDetails extends Component<void, Props, void> {
  get _getImage(): string {
    return CoinMarket.getImage(idx(this.props, _ => _.coin.cryptoId), 32);
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
    // const { theme } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.buttonsWrapper}>
          {titleEls.map(this._renderTimeButtons)}
        </View>
        <View style={styles.infoWrapper}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{ uri: this._getImage }} />
          </View>
          <View style={{ flex: 70 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 40,
  },
  img: {
    height: 50,
    width: 50,
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
