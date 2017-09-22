// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
// ------------------------------------
// UTILS
// ------------------------------------
import { colors } from '../utils/constants';

const ADD_BUTTON_SIZE = 50;
const OUTER_SIZE = 65;

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: ADD_BUTTON_SIZE / 2,
    height: ADD_BUTTON_SIZE,
    justifyContent: 'center',
    width: ADD_BUTTON_SIZE,
  },
  root: {
    alignItems: 'center',
    borderRadius: OUTER_SIZE / 2,
    height: OUTER_SIZE,
    justifyContent: 'center',
    marginTop: -30,
    width: OUTER_SIZE,
  },
});

type Props = {
  backgroundColor: string,
  children: React.Element<*>,
};

function AddButtonTab({ children, backgroundColor }: Props) {
  return (
    <View style={[styles.root, { backgroundColor }]}>
      <View style={styles.addButton}>{children}</View>
    </View>
  );
}

export default AddButtonTab;
