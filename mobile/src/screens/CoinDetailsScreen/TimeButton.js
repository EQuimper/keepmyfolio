// @flow

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withHandlers } from 'recompose';

import { colors } from '../../utils/constants';

type Props = {
  title: string,
  titleColor: string,
  isActive: boolean,
  selectTime: Function,
  onSelectPress: Function,
};

function TimeButton({ title, titleColor, isActive, onSelectPress }: Props) {
  const backgroundColor: string = isActive
    ? colors.primaryLight
    : 'transparent';
  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor }]}
      onPress={onSelectPress}
      disabled={isActive}
    >
      <Text style={{ color: titleColor }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

export default withHandlers({
  onSelectPress: (props: Props) => () => props.selectTime(props.title),
})(TimeButton);
