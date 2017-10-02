// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
    marginTop: 5,
    padding: 5
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  imgWrapper: {
    flex: 0.3,
  },
  fakeWrapperTop: {
    flex: 1,
  }
})

class AssetItem extends PureComponent {
  state = {  }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.wrapper}>
          <View style={styles.imgWrapper}>
            <Text>Wow</Text>
          </View>
          <View style={styles.fakeWrapperTop}>
            <Text>Wow</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <Text>Wow</Text>
        </View>
      </View>
    );
  }
}

export default AssetItem;
