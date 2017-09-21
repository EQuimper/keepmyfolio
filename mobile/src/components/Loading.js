// @flow

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
// ------------------------------------
// UTILS
// ------------------------------------
import { colors } from '../utils/constants';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

type Props = {
  color?: string,
  size?: 'large' | 'small',
};

function Loading({ color = colors.primary, size = 'large' }: Props = {}) {
  return (
    <View style={styles.root}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}

export default Loading;
