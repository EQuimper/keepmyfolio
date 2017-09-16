// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';
import idx from 'idx';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../utils/constants';
import { CoinMarket } from '../../utils/api';
import type { Navigation, ThemeColorsData } from '../../types';
import type { Coin_coin as CoinData } from './__generated__/Coin_coin.graphql';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';

const Root = styled.TouchableOpacity`
  height: 130;
  width: 100%;
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
  left: 10;
`;

const PriceUsdText = styled.Text`
  position: absolute;
  bottom: 5;
  right: 10;
`;

const TotalText = styled.Text`fontSize: 15;`;

const MetaWrapper = styled.View`
  flex: 0.4;
  alignItems: center;
  justifyContent: center;
`;

function getIfNeg(props): boolean {
  const percentChange1h = idx(props, _ => _.coin.percentChange1h) || 'null';

  return getIfPercentNegative(percentChange1h);
}

type IconProps = {
  name?: string,
  size: number,
  color?: string,
};

type Props = {
  coin: CoinData,
  navigation: Navigation,
  theme: ThemeColorsData,
};

type State = {
  isNeg: boolean,
};

class Coin extends Component<void, Props, State> {
  state = {
    isNeg: getIfNeg(this.props),
  };

  get _getPercentChange1h(): any {
    let str: string;
    const style = {};

    if (this.props.coin.percentChange1h == null) {
      str = 'No Value :(';
      style.color = this.props.theme.textColor;
    } else {
      str = `${parseFloat(this.props.coin.percentChange1h).toFixed(2)}%`;
    }

    return (
      <PercentText isNeg={this.state.isNeg} style={style}>
        {str}
      </PercentText>
    );
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
      name: this.props.coin.name,
    });
  };

  render() {
    if (this.props.coin == null) {
      return null;
    }

    const { theme } = this.props;

    return (
      <Root
        onPress={this._onNavigationPress}
        style={{ backgroundColor: theme.cardBackground }}
      >
        <TitleWrapper>
          <CoinIcon
            resizeMode="contain"
            source={{
              uri: this._getImage,
            }}
          />
          <Title style={{ color: theme.textColor }}>
            {this.props.coin.symbol}
          </Title>
        </TitleWrapper>
        <ContentWrapper>
          <TotalWrapper>
            <TotalText style={{ color: theme.textColor }}>
              <TotalText style={{ color: colors.lightGrey }}>
                Total:
              </TotalText>{' '}
              $100.00{' '}
            </TotalText>
            {this._getIconArrow}
          </TotalWrapper>
          <TotalText
            style={{ color: this.state.isNeg ? colors.red : colors.green }}
          >
            $7.60
          </TotalText>
        </ContentWrapper>
        <MetaWrapper>
          {this._getIconPercent}
          {this._getPercentChange1h}
        </MetaWrapper>
        <HoldingText style={{ color: theme.textColor }}>
          <HoldingText style={{ color: colors.lightGrey }}>
            Holdings:
          </HoldingText>{' '}
          {(20.0).toFixed(2)}
        </HoldingText>
        <PriceUsdText style={{ color: theme.textColor }}>
          <PriceUsdText style={{ color: colors.lightGrey }}>
            Price:
          </PriceUsdText>{' '}
          {this._getPrice}
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
  `,
);
