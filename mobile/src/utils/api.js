// @flow

class CoinMarketApi {
  imagePath: string;

  constructor() {
    this.imagePath = 'https://files.coinmarketcap.com/static/img/coins';
  }

  getImage(id: ?string, size: number): string {
    if (!id) {
      return '';
    }
    return `${this.imagePath}/${size}x${size}/${id}.png`
  }
}

export const CoinMarket = new CoinMarketApi();
