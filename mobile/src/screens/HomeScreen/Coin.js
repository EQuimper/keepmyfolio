// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';
import idx from 'idx';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../utils/constants';
import { CoinMarket } from '../../utils/api';
import type { Navigation } from '../../types';
import type { Coin_coin as CoinData } from './__generated__/Coin_coin.graphql';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';

const Root = styled.TouchableOpacity`
  height: 130;
  width: 100%;
  backgroundColor: ${props => props.theme.cardBackground};
  alignSelf: center;
  flexDirection: row;
  padding: 5px;
  position: relative;
`;

const TitleWrapper = styled.View`
  flex: 0.4;
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
  color: #fff;
  textAlign: center;
  marginTop: 5;
`;

const PercentText = styled.Text`
  color: ${props => (props.isNeg ? colors.red : colors.green)};
`;

const ContentWrapper = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`;

const TotalWrapper = styled.View`
  alignItems: center;
  flexDirection: row;
`;

const HoldingText = styled.Text`
  position: absolute;
  bottom: 5;
  color: #fff;
  left: 10;
`;

const PriceUsdText = styled.Text`
  position: absolute;
  bottom: 5;
  right: 10;
  color: #fff;
`;

const TotalText = styled.Text`
  fontSize: 15;
  color: ${props => {
    if (props.normal) {
      return '#fff';
    } else if (props.isNeg) {
      return colors.red;
    }
    return colors.green;
  }};
`;

const MetaWrapper = styled.View`
  flex: 0.4;
  alignItems: center;
  justifyContent: center;
`;

type Props = {
  coin: CoinData,
  navigation: Navigation,
};

class Coin extends Component<void, Props, void> {
  _onNavigationPress = () => {
    this.props.navigation.navigate('CoinDetailsScreen', { name: this.props.coin.name });
  }

  render() {
    if (this.props.coin == null) {
      return null;
    }

    const isNeg = getIfPercentNegative(
      idx(this.props, _ => _.coin.percentChange1h)
    );

    return (
      <Root onPress={this._onNavigationPress}>
        <TitleWrapper>
          <CoinIcon
            resizeMode="contain"
            source={{
              uri: CoinMarket.getImage(
                idx(this.props, _ => _.coin.cryptoId),
                32
              )
            }}
          />
          <Title>{this.props.coin.symbol}</Title>
        </TitleWrapper>
        <ContentWrapper>
          <TotalWrapper>
            <TotalText normal>
              <TotalText style={{ color: colors.lightGrey }}>
                Total:
              </TotalText>{' '}
              $100.00{' '}
            </TotalText>
            <Ionicons
              name={isNeg ? 'ios-arrow-round-down' : 'ios-arrow-round-up'}
              color={isNeg ? colors.red : colors.green}
              size={25}
            />
          </TotalWrapper>
          <TotalText isNeg={isNeg}>$7.60</TotalText>
        </ContentWrapper>
        <MetaWrapper>
          <Ionicons
            name={isNeg ? 'ios-trending-down' : 'ios-trending-up'}
            color={isNeg ? colors.red : colors.green}
            size={25}
          />
          <PercentText isNeg={isNeg}>
            {parseFloat(this.props.coin.percentChange1h).toFixed(2)}%
          </PercentText>
        </MetaWrapper>
        <HoldingText>
          <HoldingText style={{ color: colors.lightGrey }}>
            Holdings:
          </HoldingText>{' '}
          {(20.00).toFixed(2)}
        </HoldingText>
        <PriceUsdText>
          <PriceUsdText style={{ color: colors.lightGrey }}>Price:</PriceUsdText> ${parseFloat(this.props.coin.priceUsd).toFixed(2)}
        </PriceUsdText>
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
      priceUsd
    }
  `
);
