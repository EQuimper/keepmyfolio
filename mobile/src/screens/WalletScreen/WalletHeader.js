// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * TYPES
 */
import type { ThemeColorsData } from '../../types';

/**
 * COMPONENTS
 */
import { NameText, Text } from '../../components/commons/Typographie';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';
import { getIfPercentNegative } from '../../utils/helpers/getIfPercentNegative';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 60,
    marginTop: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  tableEl: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

type Props = {
  theme: ThemeColorsData,
  totalAssets: string,
  totalGain: string,
  totalPercent: string,
};

function WalletHeader({
  theme,
  totalAssets,
  totalGain,
  totalPercent,
}: Props) {
  let color: string;

  if (totalPercent === '0.00') {
    color = colors.lightGrey;
  } else {
    color = getIfPercentNegative(totalPercent) ? colors.red : colors.green
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.tabBarColor }]}>
      <View style={styles.tableEl}>
        <NameText style={{ color: theme.lightGrey }}>
          Total Dollars
        </NameText>
        <Text style={{ color: theme.textColor }}>
          {totalAssets}
        </Text>
      </View>
      <View style={styles.tableEl}>
        <NameText style={{ color: theme.lightGrey }}>Gain $</NameText>
        <Text
          style={{ color }}
        >
          {totalGain}
        </Text>
      </View>
      <View style={styles.tableEl}>
        <NameText style={{ color: theme.lightGrey }}>Gain %</NameText>
        <Text
          style={{ color }}
        >
          {totalPercent}
        </Text>
      </View>
    </View>
  );
}

export default WalletHeader;
