// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * TYPES
 */
import type { ThemeColorsData, TimeSelect } from '../../types';

/**
 * COMPONENTS
 */
import TimeButton from './TimeButton';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';

const titleEls = ['1d', '7d', '1m', '6m', '1y', 'ALL'];

const styles = StyleSheet.create({
  root: {
    flex: 45,
  },
  buttonsWrapper: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
});

type Props = {
  // coin: Coin,
  theme: ThemeColorsData,
  timeSelect: TimeSelect,
  selectTime: (timeSelect: TimeSelect) => void,
};

class CoinTopDetails extends Component<void, Props, void> {
  _renderTimeButtons = (title: string) => {
    let isActive: boolean = false;

    if (title === this.props.timeSelect) {
      isActive = true;
    }

    return (
      <TimeButton
        isActive={isActive}
        key={title}
        selectTime={this.props.selectTime}
        title={title}
        titleColor={this.props.theme.textColor}
      />
    );
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.buttonsWrapper}>
          {titleEls.map(this._renderTimeButtons)}
        </View>
      </View>
    );
  }
}

export default CoinTopDetails;
