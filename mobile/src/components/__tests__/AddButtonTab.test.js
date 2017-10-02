// @noflow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AddButtonTab from '../AddButtonTab';

describe('AddButtonTab Components', () => {
  it('should renders correctly', () => {
    const component = renderer.create(<AddButtonTab />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
