// @flow

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { withHandlers, compose } from 'recompose';

import ButtonHeader from './commons/ButtonHeader';
import { colors } from '../utils/constants';
import { toggleSearchBar } from '../actions/app';

import type { State } from '../types';

type Props = {
  toggleSearchBar: typeof toggleSearchBar,
  onPress: Function,
  isShow: boolean,
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
