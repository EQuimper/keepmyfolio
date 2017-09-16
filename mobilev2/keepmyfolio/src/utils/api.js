// @flow

import invariant from 'invariant';

class CoinMarketApi {
  imagePath: string;

  constructor() {
    this.imagePath = 'https://files.coinmarketcap.com/static/img/coins';
  }

  getImage(id: ?string, size: number): string {
    invariant(id, 'Id is required');
    return `${this.imagePath}/${size}x${size}/${id}.png`;
  }
}

export const CoinMarket = new CoinMarketApi();
