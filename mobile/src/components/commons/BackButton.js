// @flow

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import ButtonHeader from './ButtonHeader';
import { colors } from '../../utils/constants';

type Props = {
  goBack: Function,
};

export default function BackButton({ goBack }: Props) {
  return (
    <ButtonHeader onPress={() => goBack(null)} side="left">
      <Ionicons name="ios-arrow-back" size={25} color={colors.lightGrey} />
    </ButtonHeader>
  )
}
