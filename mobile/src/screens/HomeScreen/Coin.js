// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';

import { colors } from '../../utils/constants';
import type { CoinMarketCapData } from '../../types';

const Root = styled.View`
  height: 150;
  width: 90%;
  backgroundColor: ${colors.darkGray};
  alignSelf: center;
  borderRadius: 14;
  flexDirection: row;
`;

const TitleWrapper = styled.View`
  flex: 0.3;
  justifyContent: center;
  alignItems: center;
`;

const Title = styled.Text``;

const ContentWrapper = styled.View`flex: 1;`;

type Props = {
  data: CoinMarketCapData,
};

class Coin extends Component<void, Props, void> {
  render() {
    return (
      <Root>
        <TitleWrapper>
          <Title>{this.props.coin.name}</Title>
        </TitleWrapper>
        <ContentWrapper />
      </Root>
    );
  }
}

export default createFragmentContainer(
  Coin,
  graphql`
    fragment Coin_coin on Crypto {
      name
    }
  `
)
