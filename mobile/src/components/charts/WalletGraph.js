// @flow

import React, { Component } from 'react';
import { Surface, Group } from 'react-native/Libraries/ART/ReactNativeART';
import styled from 'styled-components/native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';

import type { ThemeColorsData } from '../../types';

import AnimShape from './AnimShape';

const d3 = {
  shape,
  scale,
};

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

type GraphEl = {
  date: number,
  amount: number,
};

type DataProps = Array<GraphEl>;

type Props = {
  theme: ThemeColorsData,
  darkTheme: boolean,
  data: DataProps,
  color: string,
  width: number,
};

type State = {
  width: number,
};

class WalletGraph extends Component<void, Props, State> {
  state = {
    width: this.props.width,
  };

  _yValue = (item: GraphEl) => -item.amount;

  _xValue = (item: GraphEl, index: number) => index * 15;

  _createArea = () => {
    const area = d3.shape
      .area()
      .x((d, index) => this._xValue(d, index))
      .y1(d => this._yValue(d))
      .curve(d3.shape.curveNatural)(this.props.data);

    return { path: area };
  };

  render() {
    const { theme } = this.props;

    const HEIGHT = this.state.width / 2;

    return (
      <Root style={{ backgroundColor: theme.tabBarColor }}>
        <Surface width={this.state.width} height={HEIGHT}>
          <Group x={5} y={HEIGHT - 50}>
            <AnimShape d={this._createArea} color={this.props.color} />
          </Group>
        </Surface>
      </Root>
    );
  }
}

export default WalletGraph;
