// @flow-bin

const config = {
  development: {
    redis: {
      url: '//localhost:6379'
    }
  }
}

const baseConfig = {
  COIN_MARKET_API: 'https://api.coinmarketcap.com/v1',
}

function getConfigFromEnv(env: string) {
  return config[env];
}

export default {
  ...getConfigFromEnv(process.env.NODE_ENV),
  ...baseConfig
};
