// @flow

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { withHandlers } from 'recompose';

import ButtonHeader from './ButtonHeader';
import { colors } from '../../utils/constants';

type Props = {
  goBack: Function,
  goBackPress: Function
};

function BackButton({ goBackPress }: Props) {
  return (
    <ButtonHeader onPress={goBackPress} side="left">
      <Ionicons name="ios-arrow-back" size={25} color={colors.lightGrey} />
    </ButtonHeader>
  );
}

export default withHandlers({
  goBackPress: (props: Props) => () => props.goBack(null)
})(BackButton);
