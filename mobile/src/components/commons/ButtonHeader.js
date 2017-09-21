// @flow

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const HIT_SLOP = {
  top: 20,
  bottom: 20,
  right: 20,
  left: 20,
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  children: React.Element<*>,
  side: 'right' | 'left',
  disabled?: boolean,
  onPress: Function,
};

export default function ButtonHeader({
  side,
  children,
  onPress,
  disabled,
}: Props) {
  const _style = {
    marginRight: side === 'right' ? 15 : 0,
    marginLeft: side === 'left' ? 15 : 0,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      style={[styles.root, _style]}
    >
      {children}
    </TouchableOpacity>
  );
}
