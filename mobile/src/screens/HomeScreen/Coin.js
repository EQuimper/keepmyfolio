// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';

import { colors } from '../../utils/constants';
import BTC from '../../../assets/crypto-svg/BTC';
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

const Title = styled.Text`

`;

const ContentWrapper = styled.View`
  flex: 1;
`;

type Props = {
  data: CoinMarketCapData,
};

class Coin extends Component {
  state = {  }

  props: Props;

  render() {
    return (
      <Root>
        <TitleWrapper>
          <Title>{this.props.data.name}</Title>
          <BTC height={50} width={50} />
        </TitleWrapper>
        <ContentWrapper />
      </Root>
    );
  }
}

export default Coin;
