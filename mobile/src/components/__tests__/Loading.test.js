// @noflow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../Loading';

describe('Loading Components', () => {
  it('should renders correctly', () => {
    const component = renderer.create(<Loading />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should renders black if pass color black', () => {
    const component = renderer.create(<Loading color="#000" />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should be small if pass size small', () => {
    const component = renderer.create(<Loading size="small" />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
