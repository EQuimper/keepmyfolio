// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '../utils/constants';

const OUTER_SIZE = 65;
const ADD_BUTTON_SIZE = 50;

type Props = {
  children: React.Element<*>,
  backgroundColor: string,
};

function AddButtonTab({ children, backgroundColor }: Props) {
  return (
    <View style={[styles.root, { backgroundColor }]}>
      <View style={styles.addButton}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: OUTER_SIZE,
    width: OUTER_SIZE,
    borderRadius: OUTER_SIZE / 2,
    marginTop: -30,
  },
  addButton: {
    height: ADD_BUTTON_SIZE,
    width: ADD_BUTTON_SIZE,
    borderRadius: ADD_BUTTON_SIZE / 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AddButtonTab;
