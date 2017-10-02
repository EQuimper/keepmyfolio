// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  LayoutAnimation,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

/**
 * TYPES
 */
import type { ThemeColorsData, State as AppState } from '../types';

/**
 * UTILS
 */
import { colors } from '../utils/constants';

const ANIMATION_MS = 300;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
  },
  iconWrapper: {
    alignItems: 'center',
    flex: 0.1,
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
  },
});

type Props = {
  isShow: boolean,
  theme: ThemeColorsData,
};

type State = {
  isFocused: boolean,
  isShow: boolean,
  text: string,
};

class SearchBar extends Component<void, Props, State> {
  state = {
    isFocused: this.props.isShow,
    isShow: this.props.isShow,
    text: '',
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isShow !== this.props.isShow) {
      if (nextProps.isShow) {
        this._show();
      } else {
        this._hide();
      }
    }
  }

  _onChangeText = (text: string) => this.setState({ text });

  _show = () => {
    this.setState({ isFocused: true });
    LayoutAnimation.configureNext({
      duration: ANIMATION_MS,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };

  _hide = () => {
    this.setState({ isFocused: false });
    LayoutAnimation.configureNext({
      duration: ANIMATION_MS - 100,
      update: {
        type: LayoutAnimation.Types.spring,
      },
    });
  };

  render() {
    const { theme, isShow } = this.props;

    if (!isShow) {
      return null;
    }
    return (
      <View style={styles.root}>
        <View
          style={[styles.wrapper, { backgroundColor: theme.cardBackground }]}
        >
          <View style={styles.iconWrapper}>
            <Ionicons color={theme.textColor} name="ios-search" size={25} />
          </View>
          <TextInput
            autoCorrect={false}
            autoFocus={this.state.isFocused}
            onChangeText={this._onChangeText}
            returnKeyType="search"
            selectionColor={Platform.OS === 'ios' ? colors.primary : undefined}
            style={[styles.input, { color: theme.textColor }]}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}

export default connect((state: AppState) => ({
  isShow: state.get('app').isSearchBarShow,
}))(SearchBar);
