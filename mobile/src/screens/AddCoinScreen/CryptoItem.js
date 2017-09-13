// @flow

import React from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';
import { withHandlers } from 'recompose';

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
  selectPress: (coin: Coin) => Coin,
  onSelectPress: (coin: Coin) => Coin
};

function CryptoItem ({ coin, selectPress }: Props) {
  return (
    <Root onPress={() => selectPress(coin)}>
      <IconWrapper>
        <CoinIcon source={{ uri: CoinMarket.getImage(coin.cryptoId, 32) }} />
      </IconWrapper>
      <TextWrapper>
        <CryptoName>{coin.name}</CryptoName>
      </TextWrapper>
    </Root>
  );
}

const enhance = withHandlers({
  selectPress: (props: Props) => () => props.onSelectPress(props.coin)
})(CryptoItem);

export default createFragmentContainer(
  enhance,
  graphql`
    fragment CryptoItem_coin on Crypto {
      name
      cryptoId
      priceUsd
    }
  `
);
