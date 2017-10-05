// @flow

import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

/**
 * UTILS
 */
import { metrics } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  children: React.Node,
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
      hitSlop={metrics.hitSlop(20)}
      onPress={onPress}
      style={[styles.root, _style]}
    >
      {children}
    </TouchableOpacity>
  );
}
