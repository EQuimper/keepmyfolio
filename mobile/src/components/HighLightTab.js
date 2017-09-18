// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../utils/constants';

type Props = {
  focused: boolean,
  children: React.Element<*>,
};

function HighLightTab({ children, focused }: Props) {
  let footerHeight;

  if (focused) {
    footerHeight = 1;
  } else {
    footerHeight = 0;
  }

  return (
    <View
      style={[
        styles.root,
        { borderBottomColor: colors.primary, borderBottomWidth: footerHeight },
      ]}
      footerHeight={footerHeight}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 1,
    alignSelf: 'stretch',
  },
});

export default HighLightTab;
