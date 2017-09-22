// @flow

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

type Props = {
  title: string,
  subTitle: string,
};

export default function EmptyStateView({ title, subTitle }: Props) {
  return (
    <View style={styles.root}>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
    </View>
  );
}
