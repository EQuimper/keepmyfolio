// @flow

import React from 'react';
import glamorous from 'glamorous-native';

const Root = glamorous.view({
  flex: 1,
});

const Heading1 = glamorous.text({});

const Heading2 = glamorous.text({});

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
