// @flow

import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity.attrs({
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  marginRight: ${props => props.side === 'right' ? 15 : 0};
  marginLeft: ${props => props.side === 'left' ? 15 : 0};
  justifyContent: center;
  alignItems: center;
`;

type Props = {
  children: React.Element<*>,
  side: 'right' | 'left',
  disabled?: boolean,
  onPress: Function,
};

export default function ButtonHeader({ side, children, onPress, disabled }: Props) {
  return (
    <Button onPress={onPress} disabled={disabled} side={side}>
      {children}
    </Button>
  )
}
