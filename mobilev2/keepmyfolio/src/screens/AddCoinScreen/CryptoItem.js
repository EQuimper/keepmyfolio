// @flow

import React from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';
import { withHandlers } from 'recompose';

import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';
import type { ThemeColorsData } from '../../types';

import { CoinMarket } from '../../utils/api';

const Root = styled.TouchableOpacity`
  height: 50;
  width: 100%;
  justifyContent: center;
  alignItems: center;
  flexDirection: row;
`;

const CryptoName = styled.Text`
  marginLeft: 10;
`;

const IconWrapper = styled.View`
  justifyContent: center;
  alignItems: center;
  flex: 0.4;
`;

const TextWrapper = styled.View`
  justifyContent: center;
  alignItems: flex-start;
  flex: 1;
`;

const CoinIcon = styled.Image`
  height: 30;
  width: 30;
`;

type Props = {
  coin: Coin,
  selectPress: (coin: Coin) => Coin,
  onSelectPress: (coin: Coin) => Coin,
  theme: ThemeColorsData
};

function CryptoItem ({ coin, selectPress, theme }: Props) {
  return (
    <Root onPress={selectPress} style={{ backgroundColor: theme.cardBackground }}>
      <IconWrapper>
        <CoinIcon source={{ uri: CoinMarket.getImage(coin.cryptoId, 32) }} />
      </IconWrapper>
      <TextWrapper>
        <CryptoName style={{ color: theme.textColor }}>{coin.name}</CryptoName>
      </TextWrapper>
    </Root>
  );
}

const CryptoItemEnhance = withHandlers({
  selectPress: (props: Props) => () => props.onSelectPress(props.coin)
})(CryptoItem);

export default createFragmentContainer(
  CryptoItemEnhance,
  graphql`
    fragment CryptoItem_coin on Crypto {
      name
      cryptoId
      priceUsd
    }
  `
);
