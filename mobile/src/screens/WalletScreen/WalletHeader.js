// @flow

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// ------------------------------------
// TYPES
// ------------------------------------
import type { ThemeColorsData } from '../../types';
// ------------------------------------
// UTILS
// ------------------------------------
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 60,
    marginTop: 5,
    paddingHorizontal: 10,
    width: '100%',
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
  totalAssets: string,
  totalGain: number,
  totalPercent: string,
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
          Total Dollars
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
