// @flow

// TODO: MAKE IT BETTER
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    color: '#fff'
  }
});

type Props = {
  title: string,
  subTitle: string,
};

export default function EmptyStateView({ title, subTitle }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{subTitle}</Text>
    </View>
  );
}
