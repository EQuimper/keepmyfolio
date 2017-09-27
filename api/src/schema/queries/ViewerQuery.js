// @flow

import {
  GraphQLObjectType,
} from 'graphql';
import { cryptosField } from './CryptoQuery';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    cryptos: cryptosField
  })
})

export const viewerField = {
  type: ViewerType,
  resolve: () => ({})
}
