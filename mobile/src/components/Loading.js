// @flow

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { colors } from '../utils/constants';

type Props = {
  color?: string,
  size?: 'large' | 'small',
};

function Loading(
  { color = colors.primary, size = 'large' }: Props = {},
) {
  return (
    <View style={styles.root}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loading;
