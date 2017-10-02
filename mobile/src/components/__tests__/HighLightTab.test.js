// @noflow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import HighLightTab from '../HighLightTab';

describe('HighLightTab Components', () => {
  it('should renders correctly', () => {
    const component = renderer.create(<HighLightTab focused />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should have a borderBottomWidth of 1 if focused', () => {
    const component = renderer.create(<HighLightTab focused />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should have a borderBottomWidth of 0 if focused is false', () => {
    const component = renderer.create(<HighLightTab focused={false} />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
