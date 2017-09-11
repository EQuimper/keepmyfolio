// @flow

import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

type Props = {
  color?: string,
  size?: 'large' | 'small',
};

export default function Loading({ color = colors.primary, size = 'large' }: Props = {}) {
  return (
    <Root>
      <ActivityIndicator color={color} size={size} />
    </Root>
  );
}
