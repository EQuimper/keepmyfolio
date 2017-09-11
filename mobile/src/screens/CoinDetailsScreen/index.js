// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  background-color: ${props => props.theme.cardBackground};
`;

const Title = styled.Text`

`;

class CoinDetailsScreen extends Component {
  render() {
    return (
      <Root>
        <Title>Hello world</Title>
      </Root>
    )
  }
}

export default CoinDetailsScreen;
