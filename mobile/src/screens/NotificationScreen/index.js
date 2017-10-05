// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

/**
 * TYPES
 */
import type { State as AppState, ThemeColorsData } from '../../types';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  theme: ThemeColorsData,
};

class NotificationScreen extends PureComponent<Props, void> {
  render() {
    const { theme } = this.props;
    return (
      <View style={[styles.root, { backgroundColor: theme.cardBackground }]}>
        <Text style={{ color: theme.textColor }}>Hello world</Text>
      </View>
    );
  }
}

export default connect((state: AppState) => ({
  theme: state.get('app').theme,
}))(NotificationScreen);
