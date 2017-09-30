// @flow

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import { Surface, Group } from 'react-native/Libraries/ART/ReactNativeART';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import AnimShape from './AnimShape';
// ------------------------------------
// UTILS
// ------------------------------------
import { getColorForWalletGraph } from '../../utils/helpers/getColorForWalletGraph';
import { colors } from '../../utils/constants';

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
    paddingLeft: 10,
  },
  contentContainerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },
  scroll: {
    flex: 0.5,
    paddingTop: 10,
  },
});

type Item = {
  percent: string,
  name: string,
};

const PIE_WIDTH = WIDTH / 2 - 10;

type State = {
  highlightedIndex: number,
};

type Props = {
  darkTheme: boolean,
  onSelectCrypto: (index: number) => void,
  color: string,
  data: Array<{ name: string, percent: string }>,
};

class PortfolioPie extends PureComponent<void, Props, State> {
  state = {
    highlightedIndex: 0,
    data: this.props.data,
  };

  _value = (item: Item) => item.percent;

  _label = (item: Item) => item.name;

  _color = (index: number) =>
    getColorForWalletGraph(this.props.darkTheme, index);

  _createPieChart = (index: number) => {
    const arcs = d3.shape.pie().value(this._value)(this.props.data);

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

  _createEmptyPieChart = () => {
    const arcs = d3.shape.pie().value(100)([100]);

    const arc = d3.shape
      .arc()
      .outerRadius(PIE_WIDTH / 2)
      .padAngle(0.05)
      .innerRadius(30);

    const arcData = arcs[0];

    const path = arc(arcData);

    return {
      path,
      color: colors.lightGrey,
    };
  };

  _onPieItemSelected = (index: number) => {
    this.setState({
      highlightedIndex: index,
    });
    this.props.onSelectCrypto(index);
  };

  _animShape = (item, index) => {
    const _createPieChart = () => this._createPieChart(index);
    return (
      <AnimShape
        color={this._color(index)}
        d={_createPieChart}
        key={`pie_shape_${index}`}
      />
    );
  };

  render() {
    const x = PIE_WIDTH / 2 + 15;
    const y = PIE_WIDTH / 2 + 15;

    // TODO: Design an empty pie

    const { data } = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.left}>
          <Surface height={PIE_WIDTH + 30} width={PIE_WIDTH + 30}>
            {data.length === 0 ? (
              <Group x={x} y={y}>
                <AnimShape
                  color={colors.lightGrey}
                  d={this._createEmptyPieChart}
                  key={`pie_shape_1`}
                />
              </Group>
            ) : (
              <Group x={x} y={y}>
                {data.map(this._animShape)}
              </Group>
            )}
          </Surface>
        </View>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.scroll}
        >
          {data.map((item, index) => {
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
