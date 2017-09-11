// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';
import idx from 'idx';
import { Ionicons } from '@expo/vector-icons';

// import { colors } from '../../utils/constants';
import { CoinMarket } from '../../utils/api';
import type { Coin_coin as CoinData } from './__generated__/Coin_coin.graphql';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';

const Root = styled.View`
  height: 130;
  width: 100%;
  backgroundColor: #fff;
  alignSelf: center;
  flexDirection: row;
  paddingHorizontal: 5;
`;

const TitleWrapper = styled.View`
  flex: 0.3;
  justifyContent: center;
  alignItems: center;
`;

const CoinIcon = styled.Image`
  height: 30;
  width: 30;
`;

const Title = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  textAlign: center;
  marginTop: 5;
`;

const PercentText = styled.Text`
  color: ${props => (props.isNeg ? 'red' : 'green')};
`;

const ContentWrapper = styled.View`flex: 1;`;

const MetaWrapper = styled.View`
  flex: 0.4;
  alignItems: center;
  justifyContent: center;
`;

type Props = {
  coin: CoinData,
};

class Coin extends Component<void, Props, void> {
  render() {
    if (this.props.coin == null) {
      return null;
    }

    const isNeg = getIfPercentNegative(
      idx(this.props, _ => _.coin.percentChange1h),
    );

    return (
      <Root>
        <TitleWrapper>
          <CoinIcon
            resizeMode="contain"
            source={{
              uri: CoinMarket.getImage(
                idx(this.props, _ => _.coin.cryptoId),
                32,
              ),
            }}
          />
          <Title>{this.props.coin.symbol}</Title>
        </TitleWrapper>
        <ContentWrapper />
        <MetaWrapper>
          <Ionicons
            name={isNeg ? 'ios-trending-down' : 'ios-trending-up'}
            color={isNeg ? 'red' : 'green'}
            size={25}
          />
          <PercentText
            isNeg={isNeg}
          >
            {parseFloat(this.props.coin.percentChange1h).toFixed(2)}%
          </PercentText>
        </MetaWrapper>
      </Root>
    );
  }
}

export default createFragmentContainer(
  Coin,
  graphql`
    fragment Coin_coin on Crypto {
      name
      cryptoId
      percentChange1h
      symbol
    }
  `,
);
