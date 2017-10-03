// @flow

// TODO: MAKE IT BETTER
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

/**
 * TYPES
 */
import type { State, ThemeColorsData } from '../../types';

/**
 * COMPONENTS
 */
import { Text } from '../commons/Typographie';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  title: string,
  subTitle: string,
  theme: ThemeColorsData
};

function EmptyStateView({ title, subTitle, theme }: Props) {
  return (
    <View style={styles.root}>
      <Text style={{ color: theme.textColor }}>{title}</Text>
      <Text style={{ color: theme.textColor }}>{subTitle}</Text>
    </View>
  );
}

export default connect((state: State) => ({
  theme: state.get('app').theme
}))(EmptyStateView);
