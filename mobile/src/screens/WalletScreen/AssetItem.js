// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * TYPES
 */
import type { ThemeColorsData } from '../../types';

/**
 * COMPONENTS
 */
import { Text, NameText } from '../../components/commons/Typographie';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    height: 50,
    width: '100%',
    marginTop: 5,
    // padding: 5
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  imgWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaWrapper: {
    flex: 1,
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  metaItem: {
    flex: 1,
  },
  metaWrapperBottom: {
    flex: 1
  },
  title: {
    color: colors.lightGrey
  },
  titleWrapper: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  itemWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

type Props = {
  theme: ThemeColorsData,
};

class AssetItem extends PureComponent<Props, {}> {
  state = {  }
  render() {
    const { theme } = this.props;
    return (
      <View style={[styles.root, { backgroundColor: theme.tabBarColor }]}>
        <View style={styles.wrapper}>
          <View style={styles.itemWrapper}>
            <Text style={{ color: theme.textColor }}>NEO</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={{ color: theme.textColor }}>200</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={{ color: theme.textColor }}>3 999.99</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={{ color: theme.textColor }}>5 000.00</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AssetItem;
