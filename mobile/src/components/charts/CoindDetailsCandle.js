// @flow

import React, { Component } from 'react';
import {
  VictoryCandlestick,
  VictoryChart,
  VictoryZoomContainer,
} from 'victory-native';
import { View, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../../utils/constants';

const candleData = Array.from({ length: 100 }).map((_, i) => ({
  x: i,
  open: Math.floor(Math.random() * 100) + 1,
  close: Math.floor(Math.random() * 100) + 1,
  high: Math.floor(Math.random() * 100) + 1,
  low: Math.floor(Math.random() * 100) + 1,
}));

// const candleData = [
//   { x: 1, open: 9, close: 30, high: 56, low: 7 },
//   { x: 2, open: 80, close: 40, high: 120, low: 10 },
//   { x: 3, open: 50, close: 80, high: 90, low: 20 },
//   { x: 4, open: 70, close: 22, high: 70, low: 5 },
//   { x: 5, open: 20, close: 35, high: 50, low: 10 },
//   { x: 6, open: 35, close: 30, high: 40, low: 3 },
//   { x: 7, open: 30, close: 90, high: 95, low: 30 },
//   { x: 8, open: 80, close: 81, high: 83, low: 75 },
//   { x: 9, open: 80, close: 40, high: 120, low: 10 },
//   { x: 10, open: 50, close: 80, high: 90, low: 20 },
//   { x: 11, open: 80, close: 81, high: 83, low: 75 },
//   { x: 12, open: 80, close: 81, high: 83, low: 75 },
//   { x: 13, open: 9, close: 30, high: 56, low: 7 },
//   { x: 14, open: 80, close: 40, high: 120, low: 10 },
//   { x: 15, open: 50, close: 80, high: 90, low: 20 },
//   { x: 16, open: 70, close: 22, high: 70, low: 5 },
//   { x: 17, open: 20, close: 35, high: 50, low: 10 },
//   { x: 18, open: 35, close: 30, high: 40, low: 3 },
//   { x: 7, open: 30, close: 90, high: 95, low: 30 },
//   { x: 8, open: 80, close: 81, high: 83, low: 75 },
//   { x: 9, open: 80, close: 40, high: 120, low: 10 },
//   { x: 10, open: 50, close: 80, high: 90, low: 20 },
//   { x: 11, open: 80, close: 81, high: 83, low: 75 },
//   { x: 12, open: 80, close: 81, high: 83, low: 75 },
// ];

const legendStyle = { border: { stroke: '#fff' } };

class CoinDetailsCandle extends Component {
  state = {
    scrollEnabled: false,
  };

  _onScrollEnabled = () => this.setState({ scrollEnabled: true });

  _onScrollStop = () => this.setState({ scrollEnabled: false });

  render() {
    return (
      <View style={styles.root}>
        <ScrollView
          horizontal
          // style={{ height: 500 }}
          contentContainerStyle={{
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            // width: '300%',
            // paddingLeft: 50,
            // paddingRight: 50,
            // height: 300,
            // paddingTop: 50,
            paddingBottom: 50,
            flexGrow: 1,
          }}
          // scrollEnabled={this.state.scrollEnabled}
        >
          <VictoryChart>
            <VictoryCandlestick
              style={{
                data: { fill: high => (high ? colors.primary : '#fff') },
                ...legendStyle,
              }}
              animate={{ duration: 1500 }}
              data={candleData}
            />
          </VictoryChart>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 60,
  },
});

export default CoinDetailsCandle;
