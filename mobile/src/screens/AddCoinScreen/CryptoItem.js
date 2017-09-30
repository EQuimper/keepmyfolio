// @flow

import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { withHandlers } from 'recompose';

/**
 * TYPES
 */
import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';
import type { ThemeColorsData } from '../../types';

/**
 * UTILS
 */
import { CoinMarket } from '../../utils/api';

const IMAGE_SIZE = 30;

const styles = StyleSheet.create({
  root: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cryptoName: {
    marginLeft: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  coinIcon: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});

type Props = {
  coin: Coin,
  selectPress: (coin: Coin) => Coin,
  onSelectPress: (coin: Coin) => Coin,
  theme: ThemeColorsData,
};

function CryptoItem({ coin, selectPress, theme }: Props) {
  return (
    <TouchableOpacity
      onPress={selectPress}
      style={[styles.root, { backgroundColor: theme.cardBackground }]}
    >
      <View style={styles.iconWrapper}>
        <Image
          source={{ uri: CoinMarket.getImage(coin.cryptoId, 32) }}
          style={styles.coinIcon}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.cryptoName, { color: theme.textColor }]}>
          {coin.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const CryptoItemEnhance = withHandlers({
  selectPress: (props: Props) => () => props.onSelectPress(props.coin),
})(CryptoItem);

export default createFragmentContainer(
  CryptoItemEnhance,
  graphql`
    fragment CryptoItem_coin on Crypto {
      name
      id
      cryptoId
      priceUsd
    }
  `,
);
