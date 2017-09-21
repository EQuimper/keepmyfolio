// @flow

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    height: 90,
    width: '45%',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
  valueText: {
    fontSize: 15,
    fontWeight: '500',
  },
  titleWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 5,
    borderRadius: 5,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  title: string,
  value: string,
  backgroundColor: string,
  textColor: string,
};

function MetaCard({ title, value, textColor, backgroundColor }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, { color: colors.lightGrey }]}>{title}</Text>
      </View>
      <View style={[styles.card, { backgroundColor }]}>
        <Text
          numberOfLines={1}
          style={[styles.valueText, { color: textColor }]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export default MetaCard;
