// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import type { State as AppState, ThemeColorsData } from '../../types';

import WalletHeader from './WalletHeader';
import PortfolioPie from '../../components/charts/PortfolioPie';

const Root = styled.View`flex: 1;`;

const WalletPieWrapper = styled.View`
  height: 250;
  width: 100%;
  marginTop: 5;
`

type Props = {
  theme: ThemeColorsData,
  darkTheme: boolean,
};

type State = {
  isNeg: boolean
};

class WalletScreen extends Component<void, Props, State> {
  state = {
    isNeg: true
  };

  render() {
    const { theme } = this.props;
    return (
      <Root style={{ backgroundColor: theme.cardBackground }}>
        <WalletHeader
          theme={theme}
          isNeg={this.state.isNeg}
          totalAssets={10256.34}
          totalGain={8.99}
          totalPercent={0.25}
        />
        <WalletPieWrapper style={{ backgroundColor: theme.tabBarColor }}>
          <PortfolioPie darkTheme={this.props.darkTheme} />
        </WalletPieWrapper>
      </Root>
    );
  }
}

export default connect((state: AppState) => ({
  theme: state.app.theme,
  darkTheme: state.app.darkTheme
}))(WalletScreen);
