// @flow

import React from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';

import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';

import { CoinMarket } from '../../utils/api';

const Root = styled.TouchableOpacity`
  height: 50;
  width: 100%;
  justifyContent: center;
  alignItems: center;
  flexDirection: row;
  backgroundColor: ${props => props.theme.cardBackground};
`;

const CryptoName = styled.Text`
  color: #fff;
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
  onSelectPress: Function
};

function CryptoItem({ coin, onSelectPress }: Props) {
  return (
    <Root onPress={() => onSelectPress(coin)}>
      <IconWrapper>
        <CoinIcon source={{ uri: CoinMarket.getImage(coin.cryptoId, 32) }} />
      </IconWrapper>
      <TextWrapper>
        <CryptoName>{coin.name}</CryptoName>
      </TextWrapper>
    </Root>
  );
}

export default createFragmentContainer(
  CryptoItem,
  graphql`
    fragment CryptoItem_coin on Crypto {
      name
      cryptoId
      priceUsd
    }
  `
);
