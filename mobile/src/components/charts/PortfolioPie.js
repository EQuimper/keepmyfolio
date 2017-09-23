// @flow

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, View, ScrollView } from 'react-native';
import { Surface, Group } from 'react-native/Libraries/ART/ReactNativeART';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import AnimShape from './AnimShape';
// ------------------------------------
// UTILS
// ------------------------------------
import { getColorForWalletGraph } from '../../utils/helpers/getColorForWalletGraph';

const { width: WIDTH } = Dimensions.get('window');

const d3 = { scale, shape };

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  },
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  assetTitleWrapper: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },
  scroll: {
    flex: 0.6,
    paddingTop: 10,
  }
});

type Item = {
  number: number,
  name: string,
};

type Data = Array<Item>;

const data: Data = [
  { number: 8, name: 'BTC' },
  { number: 7, name: 'ETH' },
  { number: 12, name: 'MIOTA' },
  { number: 23, name: 'NEO' },
  { number: 42, name: 'OMG' },
  { number: 4, name: 'XRP' },
  { number: 4, name: 'TenX' },
];

const PIE_WIDTH = WIDTH / 2 - 10;

type State = {
  highlightedIndex: number,
  data: Data,
};

type Props = {
  darkTheme: boolean,
  onSelectCrypto: (index: number) => void,
  color: string,
};

class PortfolioPie extends PureComponent<void, Props, State> {
  state = {
    highlightedIndex: 0,
    data: [],
  };

  componentDidMount() {
    this._sortData();
  }

  _sortData = () => {
    const newData = [...data].sort((a, b) => b.number - a.number);

    this.setState({ data: newData });
  };

  _value = (item: Item) => item.number;

  _label = (item: Item) => item.name;

  _color = (index: number) =>
    getColorForWalletGraph(this.props.darkTheme, index);

  _createPieChart = (index: number) => {
    const arcs = d3.shape.pie().value(this._value)(this.state.data);

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
      color: this._color(index),
    };
  };

  _onPieItemSelected = (index: number) => {
    this.setState({
      ...this.state,
      highlightedIndex: index,
    });
    this.props.onSelectCrypto(index);
  };

  render() {
    const x = PIE_WIDTH / 2 + 15;
    const y = PIE_WIDTH / 2 + 15;

    return (
      <View style={styles.root}>
        <View style={styles.left}>
          <Surface height={PIE_WIDTH + 30} width={PIE_WIDTH + 30}>
            <Group x={x} y={y}>
              {this.state.data.map((item, index) => (
                <AnimShape
                  color={this._color(index)}
                  d={() => this._createPieChart(index)}
                  key={`pie_shape_${index}`}
                />
              ))}
            </Group>
          </Surface>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.scroll}>
          {this.state.data.map((item, index) => {
            const fontWeight =
              this.state.highlightedIndex === index ? '700' : '400';
            return (
              <TouchableOpacity
                disabled={index === this.state.highlightedIndex}
                key={index}
                onPress={() => this._onPieItemSelected(index)}
              >
                <View style={styles.assetTitleWrapper}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: this._color(index),
                        fontWeight,
                      },
                    ]}
                  >
                    {this._label(item)}: {this._value(item)}%
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default PortfolioPie;
