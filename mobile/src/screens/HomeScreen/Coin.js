// @flow

import React, { PureComponent } from 'react';
import idx from 'idx';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Map } from 'immutable';
// ------------------------------------
// TYPES
// ------------------------------------
import type { Navigation, ThemeColorsData, HoldingData } from '../../types';
import type { Coin_coin as CoinData } from './__generated__/Coin_coin.graphql';
// ------------------------------------
// UTILS
// ------------------------------------
import { CoinMarket } from '../../utils/api';
import { colors } from '../../utils/constants';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';
import { moneyThousand } from '../../utils/helpers/formatNumber';

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

type IconProps = {
  color?: string,
  name?: string,
  size: number,
};

type Props = {
  coin: CoinData,
  navigation: Navigation,
  theme: ThemeColorsData,
  entities?: Map<string, HoldingData>,
};

type State = {
  isNeg: boolean,
};

class Coin extends PureComponent<void, Props, State> {
  state = {
    isNeg: this._getIfNeg(),
  };

  _getIfNeg(): boolean {
    const _percentChange1h = idx(this.props, _ => _.coin.percentChange1h) || '0';

    return getIfPercentNegative(_percentChange1h);
  }

  _getPercentChange1h(): any {
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

  _getImage(): string {
    return CoinMarket.getImage(idx(this.props, _ => _.coin.cryptoId), 32);
  }

  _getIconPercent() {
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

  // TODO: USE RESELECT
  _getHolding(): number {
    if (this.props.entities == null) {
      return 0;
    }

    const totalAmount: number = this.props.entities.reduce(
      (prev, current) => prev + parseFloat(current.amountOfCoin),
      0,
    );

    return totalAmount;
  }

  // TODO: USE RESELECT
  _getTotal(): string {
    const coin = idx(this.props, _ => _.coin);
    const priceUsd = idx(coin, _ => _.priceUsd);

    return moneyThousand(this._getHolding() * parseFloat(priceUsd));
  }

  // TODO: USE RESELECT
  _getAmountChange(): string {
    const coin = idx(this.props, _ => _.coin);
    const percentChange = idx(coin, _ => _.percentChange1h);
    const priceUsd = idx(coin, _ => _.priceUsd);

    const totalDollarUserHave: number = this._getHolding() * parseFloat(priceUsd);

    return moneyThousand((totalDollarUserHave * parseFloat(percentChange)) / 100);
  }

  _getIconArrow() {
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

  _getPrice(): string {
    return moneyThousand(this.props.coin.priceUsd);
  }

  _onNavigationPress = () => {
    this.props.navigation.navigate('CoinDetailsScreen', {
      coinId: this.props.coin.id,
      name: this.props.coin.name,
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
              uri: this._getImage(),
            }}
            style={styles.coinIcon}
          />
          <Text style={[styles.title, { color: theme.textColor }]}>
            {this.props.coin.symbol}
          </Text>
        </View>
        {this.props.entities ? (
          <View style={styles.contentWrapper}>
            <View style={styles.totalWrapper}>
              <Text style={[styles.totalText, { color: theme.textColor }]}>
                <Text style={[styles.totalText, { color: colors.lightGrey }]}>
                  Total:
                </Text>{' '}
                ${this._getTotal()}{' '}
              </Text>
              {this._getIconArrow()}
            </View>
            <Text
              style={[
                styles.totalText,
                { color: this.state.isNeg ? colors.red : colors.green },
              ]}
            >
              ${this._getAmountChange()}
            </Text>
          </View>
        ) : (
          <View style={styles.contentWrapper} />
        )}

        <View style={styles.metaWrapper}>
          {this._getIconPercent()}
          {this._getPercentChange1h()}
        </View>
        <Text style={[styles.holdingText, { color: theme.textColor }]}>
          <Text style={[styles.holdingText, { color: colors.lightGrey }]}>
            Holdings:
          </Text>{' '}
          {this._getHolding()}
        </Text>
        <Text style={[styles.priceUsdText, { color: theme.textColor }]}>
          <Text style={[styles.priceUsdText, { color: colors.lightGrey }]}>
            Price:
          </Text>{' '}
          {this._getPrice()}
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
