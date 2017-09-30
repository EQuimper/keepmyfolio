// @flow

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { connect } from 'react-redux';
import { withHandlers, compose } from 'recompose';

/**
 * TYPES
 */
import type { State } from '../types';

/**
 * COMPONENTS
 */
import ButtonHeader from './commons/ButtonHeader';

/**
 * ACTIONS
 */
import { toggleSearchBar } from '../actions/app';

/**
 * UTILS
 */
import { colors } from '../utils/constants';

type Props = {
  isShow: boolean,
  onPress: Function,
  toggleSearchBar: typeof toggleSearchBar,
};

function ButtonSearch({ onPress, isShow }: Props) {
  const icon = isShow ? (
    <Ionicons color={colors.lightGrey} name="md-close" size={25} />
  ) : (
    <Ionicons color={colors.lightGrey} name="ios-search" size={25} />
  );
  return (
    <ButtonHeader onPress={onPress} side="right">
      {icon}
    </ButtonHeader>
  );
}

export default compose(
  connect(
    (state: State) => ({
      isShow: state.get('app').isSearchBarShow,
    }),
    { toggleSearchBar },
  ),
  withHandlers({
    onPress: (props: Props) => () => props.toggleSearchBar(),
  }),
)(ButtonSearch);
