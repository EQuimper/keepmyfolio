// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
    marginTop: 5
  }
})

class AssetItem extends PureComponent {
  state = {  }
  render() {
    return (
      <View style={styles.root}>
        <Text>Wow</Text>
      </View>
    );
  }
}

export default AssetItem;
