// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// ------------------------------------
// TYPES
// ------------------------------------
import type { ThemeColorsData } from '../../types';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import WalletHeader from './WalletHeader';
import AssetItem from './AssetItem';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  screenProps: {
    theme: ThemeColorsData,
  },
};

type State = {
  isNeg: boolean,
};

class WalletAssets extends PureComponent<void, Props, State> {
  state = {
    isNeg: false,
  };

  render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <WalletHeader
          isNeg={this.state.isNeg}
          theme={theme}
          totalAssets={10256.34}
          totalGain={8.99}
          totalPercent={0.25}
        />
        <AssetItem></AssetItem>
        <AssetItem></AssetItem>
        <AssetItem></AssetItem>
      </View>
    );
  }
}

export default WalletAssets;
