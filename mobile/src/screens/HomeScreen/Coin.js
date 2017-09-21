// @flow

import React, { PureComponent } from 'react';
import idx from 'idx';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Ionicons from 'react-native-vector-icons/Ionicons';
// ------------------------------------
// TYPES
// ------------------------------------
import type { Navigation, ThemeColorsData } from '../../types';
import type { Coin_coin as CoinData } from './__generated__/Coin_coin.graphql';
// ------------------------------------
// UTILS
// ------------------------------------
import { CoinMarket } from '../../utils/api';
import { colors } from '../../utils/constants';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';

const COIN_ICON_SIZE = 30;

const styles = StyleSheet.create({
  coinIcon: {
    height: COIN_ICON_SIZE,
    width: COIN_ICON_SIZE,
  },
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  holdingText: {
    bottom: 5,
    left: 10,
    position: 'absolute',
  },
  metaWrapper: {
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
  },
  priceUsdText: {
    bottom: 5,
    position: 'absolute',
    right: 10,
  },
  root: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: 130,
    padding: 5,
    position: 'relative',
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 15,
  },
  totalWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

function getIfNeg(props): boolean {
  const percentChange1h = idx(props, _ => _.coin.percentChange1h) || 'null';

  return getIfPercentNegative(percentChange1h);
}

type IconProps = {
  color?: string,
  name?: string,
  size: number,
};

type Props = {
  coin: CoinData,
  navigation: Navigation,
  theme: ThemeColorsData,
};

type State = {
  isNeg: boolean,
};

class Coin extends PureComponent<void, Props, State> {
  state = {
    isNeg: getIfNeg(this.props),
  };

  get _getPercentChange1h(): any {
    let str: string;
    const style = {};

    const color: string = this.state.isNeg ? colors.red : colors.green;

    if (this.props.coin.percentChange1h == null) {
      str = 'No Value :(';
      style.color = this.props.theme.textColor;
    } else {
      str = `${parseFloat(this.props.coin.percentChange1h).toFixed(2)}%`;
      style.color = color;
    }

    return <Text style={style}>{str}</Text>;
  }

  get _getImage(): string {
    return CoinMarket.getImage(idx(this.props, _ => _.coin.cryptoId), 32);
  }

  get _getIconPercent() {
    if (this.props.coin.percentChange1h == null) {
      return null;
    }

    const props: IconProps = {
      size: 25,
    };

    if (this.state.isNeg) {
      props.name = 'ios-trending-down';
      props.color = colors.red;
    } else {
      props.name = 'ios-trending-up';
      props.color = colors.green;
    }

    return <Ionicons {...props} />;
  }

  get _getIconArrow() {
    const props: IconProps = {
      size: 25,
    };

    if (this.state.isNeg) {
      props.name = 'ios-arrow-round-down';
      props.color = colors.red;
    } else {
      props.name = 'ios-arrow-round-up';
      props.color = colors.green;
    }

    return <Ionicons {...props} />;
  }

  get _getPrice(): string {
    return `$${parseFloat(this.props.coin.priceUsd).toFixed(2)}`;
  }

  _onNavigationPress = () => {
    this.props.navigation.navigate('CoinDetailsScreen', {
      coinId: this.props.coin.id,
      name: this.props.coin.name
    });
  };

  render() {
    if (this.props.coin == null) {
      return null;
    }

    const { theme } = this.props;

    return (
      <TouchableOpacity
        onPress={this._onNavigationPress}
        style={[styles.root, { backgroundColor: theme.cardBackground }]}
      >
        <View style={styles.titleWrapper}>
          <Image
            resizeMode="contain"
            source={{
              uri: this._getImage,
            }}
            style={styles.coinIcon}
          />
          <Text style={[styles.title, { color: theme.textColor }]}>
            {this.props.coin.symbol}
          </Text>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.totalWrapper}>
            <Text style={[styles.totalText, { color: theme.textColor }]}>
              <Text style={[styles.totalText, { color: colors.lightGrey }]}>
                Total:
              </Text>{' '}
              $100.00{' '}
            </Text>
            {this._getIconArrow}
          </View>
          <Text
            style={[
              styles.totalText,
              { color: this.state.isNeg ? colors.red : colors.green },
            ]}
          >
            $7.60
          </Text>
        </View>
        <View style={styles.metaWrapper}>
          {this._getIconPercent}
          {this._getPercentChange1h}
        </View>
        <Text style={[styles.holdingText, { color: theme.textColor }]}>
          <Text style={[styles.holdingText, { color: colors.lightGrey }]}>
            Holdings:
          </Text>{' '}
          {(20.0).toFixed(2)}
        </Text>
        <Text style={[styles.priceUsdText, { color: theme.textColor }]}>
          <Text style={[styles.priceUsdText, { color: colors.lightGrey }]}>
            Price:
          </Text>{' '}
          {this._getPrice}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default createFragmentContainer(
  Coin,
  graphql`
    fragment Coin_coin on Crypto {
      id
      name
      cryptoId
      percentChange1h
      symbol
      priceUsd
      priceBtc
      marketCapUsd
      totalSuply
      volumeUsd24h
    }
  `,
);
