// @flow

import React from 'react';
import { Text as ReactText, StyleSheet } from 'react-native';

import { colors, fonts } from '../../utils/constants';

type Props = {
  style?: any,
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 22,
    fontWeight: '100',
    letterSpacing: 2,
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
  }
});

export function Text({ style, ...rest }: Props) {
  return <ReactText style={[styles.text, style]} {...rest} />;
};

export function NameText({ style, ...rest }: Props) {
  return <ReactText style={[styles.nameText, style]} {...rest} />;
};

export function Heading1({ style, ...rest }: Props) {
  return <ReactText style={[styles.heading1, style]} {...rest} />;
};
