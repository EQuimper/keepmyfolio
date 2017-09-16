// @flow

import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
`;

const Heading1 = styled.Text``;

const Heading2 = styled.Text``;

type Props = {
  title: string,
  subTitle: string,
};

export default function EmptyStateView({ title, subTitle }: Props) {
  return (
    <Root>
      <Heading1>{title}</Heading1>
      <Heading2>{subTitle}</Heading2>
    </Root>
  );
}
