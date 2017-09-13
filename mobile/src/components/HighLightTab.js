// @flow

import React from 'react';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

const Root = styled.View`
  justifyContent: center;
  alignItems: center;
  flex: 1;
  borderBottomWidth: ${props => props.footerHeight};
  borderBottomColor: ${colors.primary};
  borderRadius: 1;
  alignSelf: stretch;
`;

type Props = {
  focused: boolean,
  children: React.Element<*>,
};

export default function HighLightTab({ children, focused }: Props) {
  let footerHeight;
  if (focused) {
    footerHeight = 1;
  } else {
    footerHeight = 0;
  }

  return <Root footerHeight={footerHeight}>{children}</Root>;
}
