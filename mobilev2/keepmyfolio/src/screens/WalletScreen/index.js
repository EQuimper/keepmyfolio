// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';

import type { State as AppState, ThemeColorsData } from '../../types';

import WalletHeader from './WalletHeader';
import PortfolioPie from '../../components/charts/PortfolioPie';
import WalletGraph from '../../components/charts/WalletGraph';
import { getColorForWalletGraph } from '../../utils/helpers/getColorForWalletGraph';

const { width: WIDTH } = Dimensions.get('window');

const Root = styled.View`flex: 1;`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 5,
  },
})`

`;

const WalletPieWrapper = styled.View`
  height: 250;
  width: 100%;
  marginTop: 5;
`;

const WalletGraphWrapper = styled.View`
  height: 200;
  width: 100%;
  marginTop: 5;
`;

type DataProps = Array<{
  date: number,
  amount: number,
}>;

const data: DataProps = [];

for (let i = 0; i < 25; i++) {
  data.push({
    date: 2000 + i,
    amount: parseFloat((Math.random() * 100).toFixed(2)),
  });
}

type Props = {
  theme: ThemeColorsData,
  darkTheme: boolean,
};

type State = {
  isNeg: boolean,
  graphHistoryData: DataProps,
  selectedCryptoIndex: number,
};

class WalletScreen extends Component<void, Props, State> {
  state = {
    isNeg: true,
    graphHistoryData: data,
    selectedCryptoIndex: 0,
  };

  get _getColor(): string {
    return getColorForWalletGraph(
      this.props.darkTheme,
      this.state.selectedCryptoIndex,
    );
  }

  _shuffle = () => {
    const newData = [];
    for (let i = 0; i < 25; i++) {
      newData.push({
        date: 2000 + i,
        amount: parseFloat((Math.random() * 100).toFixed(2)),
      });
    }

    return newData;
  };

  _onSelectCrypto = (index: number) => {
    this.setState({
      selectedCryptoIndex: index,
      graphHistoryData: this._shuffle(),
    });
  };

  render() {
    const { theme } = this.props;
    return (
      <Root style={{ backgroundColor: theme.cardBackground }}>
        <ScrollView>
          <WalletHeader
            theme={theme}
            isNeg={this.state.isNeg}
            totalAssets={10256.34}
            totalGain={8.99}
            totalPercent={0.25}
          />
          <WalletPieWrapper style={{ backgroundColor: theme.tabBarColor }}>
            <PortfolioPie
              color={this._getColor}
              darkTheme={this.props.darkTheme}
              onSelectCrypto={this._onSelectCrypto}
            />
          </WalletPieWrapper>
          <WalletGraphWrapper>
            <WalletGraph
              width={WIDTH}
              color={this._getColor}
              data={this.state.graphHistoryData}
              theme={theme}
              darkTheme={this.props.darkTheme}
            />
          </WalletGraphWrapper>
        </ScrollView>
      </Root>
    );
  }
}

export default connect((state: AppState) => ({
  theme: state.app.theme,
  darkTheme: state.app.darkTheme,
}))(WalletScreen);
