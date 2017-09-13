// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import type { State as AppState, ThemeColorsData } from '../../types';

const Root = styled.View`
  flex: 1;
`;

const Title = styled.Text``;

type Props = {
  theme: ThemeColorsData,
};

class WalletScreen extends Component<void, Props, void> {
  render() {
    const { theme } = this.props;
    return (
      <Root style={{ backgroundColor: theme.cardBackground }}>
        <Title style={{ color: theme.textColor }}>Hello world</Title>
      </Root>
    );
  }
}

export default connect(
  (state: AppState) => ({
    theme: state.app.theme
  })
)(WalletScreen);
