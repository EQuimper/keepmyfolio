// @flow

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { ThemeColorsData } from '../../types';

import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    height: 60,
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  tableEl: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

type Props = {
  theme: ThemeColorsData,
  isNeg: boolean,
  totalAssets: number,
  totalGain: number,
  totalPercent: number,
};

function WalletHeader({
  theme,
  isNeg,
  totalAssets,
  totalGain,
  totalPercent,
}: Props) {
  return (
    <View style={[styles.root, { backgroundColor: theme.tabBarColor }]}>
      <View style={styles.tableEl}>
        <Text style={[styles.title, { color: theme.lightGrey }]}>
          Total Assets
        </Text>
        <Text style={[styles.amount, { color: theme.textColor }]}>
          {totalAssets}
        </Text>
      </View>
      <View style={styles.tableEl}>
        <Text style={[styles.title, { color: theme.lightGrey }]}>Gain $</Text>
        <Text
          style={[styles.amount, { color: isNeg ? colors.red : colors.green }]}
        >
          {totalGain}
        </Text>
      </View>
      <View style={styles.tableEl}>
        <Text style={[styles.title, { color: theme.lightGrey }]}>Gain %</Text>
        <Text
          style={[styles.amount, { color: isNeg ? colors.red : colors.green }]}
        >
          {totalPercent}
        </Text>
      </View>
    </View>
  );
}

export default WalletHeader;
