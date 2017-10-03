// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * COMPONENTS
 */
import { Text, NameText } from '../../components/commons/Typographie';

/**
 * UTILS
 */
import { colors, metrics } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    height: 90,
    width: '45%',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    ...metrics.shadow.basic
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
        <NameText style={{ color: colors.lightGrey }}>{title}</NameText>
      </View>
      <View style={[styles.card, { backgroundColor }]}>
        <Text
          numberOfLines={1}
          style={{ color: textColor }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export default MetaCard;
