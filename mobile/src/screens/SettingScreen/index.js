// @flow

import React, { Component } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import type { State } from '../../types';

import { colors } from '../../utils/constants';
import { toggleTheme } from '../../actions/app';

const Root = styled.View`
  flex: 1;
  background-color: ${props => props.theme.cardBackground};
`;

const CardText = styled.Text`
  color: #fff;
  fontSize: 16;
  fontWeight: 600;
`;

const Card = styled.View`
  height: 50;
  width: 100%;
  paddingHorizontal: 10;
  backgroundColor: ${props => props.theme.tabBarColor};
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
};

class SettingScreen extends Component<void, Props, void> {
  _handleValueChange = () => {
    this.props.toggleTheme();
  }

  render() {
    return (
      <Root>
        <Card>
          <CardNameWrapper>
            <CardText>DARK THEME</CardText>
          </CardNameWrapper>
          <SliderWrapper>
            <Switch
              value={this.props.darkTheme}
              tintColor={colors.primary}
              thumbTintColor={colors.white}
              onValueChange={this._handleValueChange}
              onTintColor={colors.primary}
            />
          </SliderWrapper>
        </Card>
      </Root>
    )
  }
}

export default connect((state: State) => ({
  darkTheme: state.app.darkTheme,
}), { toggleTheme })(SettingScreen);
