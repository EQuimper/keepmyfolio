// @flow

import React, { Component } from 'react';
import {
  ART,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import styled from 'styled-components/native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';

import AnimShape from './AnimShape';
import { pieChartColors } from '../../utils/constants';

const { Surface, Group } = ART;

const { width: WIDTH } = Dimensions.get('window');

const d3 = { scale, shape };

const Root = styled.View`
  flex: 1;
  flexDirection: row;
`;

const Left = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const AssetTitleWrapper = styled.View`
  height: 40;
  justifyContent: center;
  alignItems: center;
`;

const Right = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25
  }
})`
  flex: 0.6;
  paddingTop: 10;
`;

type Item = {
  number: number,
  name: string
};

type Data = Array<Item>;

const data: Data = [
  { number: 8, name: 'BTC' },
  { number: 7, name: 'ETH' },
  { number: 12, name: 'MIOTA' },
  { number: 23, name: 'NEO' },
  { number: 42, name: 'OMG' },
  { number: 4, name: 'XRP' },
  { number: 4, name: 'TenX' }
];

const PIE_WIDTH = WIDTH / 2 - 10;

function getColor(darkTheme: boolean, index: number) {
  const _theme = darkTheme ? 'dark' : 'light';
  const _index = index % pieChartColors[_theme].length;
  return pieChartColors[_theme][_index];
}

type State = {
  highlightedIndex: number
};

type Props = {
  darkTheme: boolean
};

class PortfolioPie extends Component<void, Props, State> {
  state = {
    highlightedIndex: 0
  };

  _value = (item: Item) => item.number;

  _label = (item: Item) => item.name;

  _color = (index: number) => getColor(this.props.darkTheme, index);

  _createPieChart = (index: number) => {
    const arcs = d3.shape.pie().value(this._value)(data);

    const hightlightedArc = d3.shape
      .arc()
      .outerRadius(PIE_WIDTH / 2 + 10)
      .padAngle(0.05)
      .innerRadius(30);

    const arc = d3.shape
      .arc()
      .outerRadius(PIE_WIDTH / 2)
      .padAngle(0.05)
      .innerRadius(30);

    const arcData = arcs[index];

    const path =
      this.state.highlightedIndex === index
        ? hightlightedArc(arcData)
        : arc(arcData);

    return {
      path,
      color: this._color(index)
    };
  };

  _onPieItemSelected = (index: number) => {
    this.setState({
      ...this.state,
      highlightedIndex: index
    });
  };

  render() {
    const x = PIE_WIDTH / 2 + 15;
    const y = PIE_WIDTH / 2 + 15;

    return (
      <Root>
        <Left>
          <Surface width={PIE_WIDTH + 30} height={PIE_WIDTH + 30}>
            <Group x={x} y={y}>
              {data.map((item, index) => (
                <AnimShape
                  key={`pie_shape_${index}`} // eslint-disable-line
                  color={this._color(index)}
                  d={() => this._createPieChart(index)}
                />
              ))}
            </Group>
          </Surface>
        </Left>
        <Right>
          {data.map((item, index) => {
            const fontWeight =
              this.state.highlightedIndex === index ? '700' : '400';
            return (
              <TouchableOpacity
                key={index} // eslint-disable-line
                onPress={() => this._onPieItemSelected(index)}
              >
                <AssetTitleWrapper>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: this._color(index),
                        fontWeight
                      }
                    ]}
                  >
                    {this._label(item)}: {this._value(item)}%
                  </Text>
                </AssetTitleWrapper>
              </TouchableOpacity>
            );
          })}
        </Right>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal'
  }
});

export default PortfolioPie;
