// @flow

import React, { Component } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import type { State, ThemeColorsData } from '../../types';

import { colors } from '../../utils/constants';
import { toggleTheme } from '../../actions/app';

const Root = styled.View`flex: 1;`;

const CardText = styled.Text`
  fontSize: 16;
  fontWeight: 600;
`;

const Card = styled.View`
  height: 50;
  width: 100%;
  paddingHorizontal: 10;
  marginTop: 5;
  flexDirection: row;
`;

const CardNameWrapper = styled.View`
  flex: 1;
  justifyContent: center;
`;

const SliderWrapper = styled.View`
  flex: 0.4;
  justifyContent: center;
  alignItems: flex-end;
`;

type Props = {
  darkTheme: boolean,
  toggleTheme: typeof toggleTheme,
  theme: ThemeColorsData
};

class SettingScreen extends Component<void, Props, void> {
  _handleValueChange = () => {
    this.props.toggleTheme();
  };

  render() {
    return (
      <Root style={{ backgroundColor: this.props.theme.cardBackground }}>
        <Card style={{ backgroundColor: this.props.theme.tabBarColor }}>
          <CardNameWrapper>
            <CardText style={{ color: this.props.theme.textColor }}>
              DARK THEME
            </CardText>
          </CardNameWrapper>
          <SliderWrapper>
            <Switch
              value={this.props.darkTheme}
              tintColor={colors.primary}
              thumbTintColor={this.props.theme.thumbTintColor}
              onValueChange={this._handleValueChange}
              onTintColor={colors.primary}
            />
          </SliderWrapper>
        </Card>
      </Root>
    );
  }
}

export default connect(
  (state: State) => ({
    darkTheme: state.app.darkTheme,
    theme: state.app.theme
  }),
  { toggleTheme }
)(SettingScreen);
