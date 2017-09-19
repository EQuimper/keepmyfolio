// @flow

import React, { PureComponent } from 'react';
import {
  Switch,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';

import type { State, ThemeColorsData } from '../../types';

import { colors, properties } from '../../utils/constants';
import { toggleTheme } from '../../actions/app';

type Props = {
  darkTheme: boolean,
  toggleTheme: typeof toggleTheme,
  theme: ThemeColorsData,
};

class SettingScreen extends PureComponent<void, Props, void> {
  _handleValueChange = () => {
    this.props.toggleTheme();
  };

  _onFeedbackPress = async () => {
    const url = `mailto:${properties.feedbackEmail.email}?subject=${properties
      .feedbackEmail.subject}`;
    const _canOpen = await Linking.openURL(url);

    if (_canOpen) {
      return Linking.openURL(url)
    }
  };

  render() {
    return (
      <View
        style={[
          styles.root,
          { backgroundColor: this.props.theme.cardBackground },
        ]}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: this.props.theme.tabBarColor },
          ]}
        >
          <View style={styles.cardNameWrapper}>
            <Text
              style={[styles.cardText, { color: this.props.theme.textColor }]}
            >
              DARK THEME
            </Text>
          </View>
          <View style={styles.sliderWrapper}>
            <Switch
              value={this.props.darkTheme}
              tintColor={colors.primary}
              thumbTintColor={this.props.theme.thumbTintColor}
              onValueChange={this._handleValueChange}
              onTintColor={colors.primary}
            />
          </View>
        </View>
        <TouchableOpacity onPress={this._onFeedbackPress}>
          <View
            style={[
              styles.card,
              { backgroundColor: this.props.theme.tabBarColor },
            ]}
          >
            <View style={styles.cardNameWrapper}>
              <Text
                style={[styles.cardText, { color: this.props.theme.textColor }]}
              >
                FEEDBACK
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  cardNameWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default connect(
  (state: State) => ({
    darkTheme: state.app.darkTheme,
    theme: state.app.theme,
  }),
  { toggleTheme },
)(SettingScreen);
