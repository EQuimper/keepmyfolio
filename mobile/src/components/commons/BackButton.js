// @flow

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withHandlers } from 'recompose';

/**
 * COMPONENTS
 */
import ButtonHeader from './ButtonHeader';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';

const ICON_SIZE = 25;

type Props = {
  goBack: Function,
  goBackPress: Function,
};

function BackButton({ goBackPress }: Props) {
  return (
    <ButtonHeader onPress={goBackPress} side="left">
      <Ionicons color={colors.lightGrey} name="ios-arrow-back" size={ICON_SIZE} />
    </ButtonHeader>
  );
}

export default withHandlers({
  goBackPress: (props: Props) => () => props.goBack(null),
})(BackButton);
