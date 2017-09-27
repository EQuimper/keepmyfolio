// @flow

const config = {
  development: {
    redis: {
      url: '//localhost:6379'
    }
  },
  staging: {
    redis: {
      url: '//crypto.rc6roj.ng.0001.use1.cache.amazonaws.com:6379'
    }
  }
}

const baseConfig = {
  COIN_MARKET_API: 'https://api.coinmarketcap.com/v1',
}

function getConfigFromEnv(env: ?string) {
  if (!env) {
    return config.staging;
  }
  return config[env];
}

export default {
  ...getConfigFromEnv(process.env.NODE_ENV),
  ...baseConfig
};
