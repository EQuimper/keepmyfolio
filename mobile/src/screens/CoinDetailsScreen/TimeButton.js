// @flow

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withHandlers } from 'recompose';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
});

type Props = {
  isActive: boolean,
  onSelectPress: Function,
  selectTime: Function,
  title: string,
  titleColor: string,
};

function TimeButton({ title, titleColor, isActive, onSelectPress }: Props) {
  const backgroundColor: ?string = isActive
    ? colors.primaryLight
    : undefined;
  return (
    <TouchableOpacity
      disabled={isActive}
      onPress={onSelectPress}
      style={[styles.root, { backgroundColor }]}
    >
      <Text style={{ color: titleColor }}>{title}</Text>
    </TouchableOpacity>
  );
}

export default withHandlers({
  onSelectPress: (props: Props) => () => props.selectTime(props.title),
})(TimeButton);
