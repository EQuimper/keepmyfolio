// @flow

import React from 'react';
import styled from 'styled-components/native';

import type { ThemeColorsData } from '../../types';

import { colors } from '../../utils/constants';

const Title = styled.Text`
  fontSize: 14;
  fontWeight: 500;
`;

const Amount = styled.Text`
  fontSize: 16;
  fontWeight: 600;
`;

const WalletInfoWrapper = styled.View`
  height: 60;
  width: 100%;
  marginTop: 5;
  paddingHorizontal: 10;
  flexDirection: row;
`;

const TableEl = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: space-around;
`;

type Props = {
  theme: ThemeColorsData,
  isNeg: boolean,
  totalAssets: number,
  totalGain: number,
  totalPercent: number
};

function WalletHeader({
  theme,
  isNeg,
  totalAssets,
  totalGain,
  totalPercent
}: Props) {
  return (
    <WalletInfoWrapper style={{ backgroundColor: theme.tabBarColor }}>
      <TableEl>
        <Title style={{ color: theme.lightGrey }}>Total Assets</Title>
        <Amount style={{ color: theme.textColor }}>{totalAssets}</Amount>
      </TableEl>
      <TableEl>
        <Title style={{ color: theme.lightGrey }}>Gain $</Title>
        <Amount style={{ color: isNeg ? colors.red : colors.green }}>
          {totalGain}
        </Amount>
      </TableEl>
      <TableEl>
        <Title style={{ color: theme.lightGrey }}>Gain %</Title>
        <Amount style={{ color: isNeg ? colors.red : colors.green }}>
          {totalPercent}
        </Amount>
      </TableEl>
    </WalletInfoWrapper>
  );
}

export default WalletHeader;
