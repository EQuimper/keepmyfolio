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

import type { ThemeColorsData, State as AppState } from '../types';

import { colors } from '../utils/constants';

const ANIMATION_MS = 300;

type Props = {
  theme: ThemeColorsData,
  isShow: boolean,
};

type State = {
  isShow: boolean,
  isFocused: boolean,
  text: string,
};

class SearchBar extends Component<void, Props, State> {
  state = {
    isShow: this.props.isShow,
    isFocused: this.props.isShow,
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
            <Ionicons size={25} color={theme.textColor} name="ios-search" />
          </View>
          <TextInput
            onChangeText={this._onChangeText}
            underlineColorAndroid="transparent"
            autoFocus={this.state.isFocused}
            returnKeyType="search"
            autoCorrect={false}
            selectionColor={Platform.OS === 'ios' ? colors.primary : undefined}
            style={[styles.input, { color: theme.textColor }]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});

export default connect((state: AppState) => ({
  isShow: state.app.isSearchBarShow,
}))(SearchBar);
