const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: ['airbnb-base', 'prettier', 'prettier/flowtype', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    },
  },
  env: {
    node: true,
    jest: true,
    es6: true,
    browser: true,
  },
  globals: {
    __DEV__: OFF,
  },
  rules: {
    'no-console': [WARN, { allow: ['warn', 'disableYellowBox'] }],
    'import/no-extraneous-dependencies': OFF,
    'import/prefer-default-export': OFF,
    'new-cap': OFF,
    'prefer-destructuring': OFF,
    'class-methods-use-this': OFF,
    'no-plusplus': OFF,
    'no-return-assign': OFF,
    'no-underscore-dangle': OFF,
    'react-native/no-color-literals': ERROR,
    'react-native/no-inline-styles': ERROR,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': ERROR,
    'react/jsx-key': WARN,
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-sort-props': WARN,
    'react/jsx-uses-react': WARN,
    'react/jsx-uses-vars': WARN,
    'react/no-danger': WARN,
    'react/no-did-mount-set-state': WARN,
    'react/no-did-update-set-state': WARN,
    'react/no-direct-mutation-state': WARN,
    'react/prefer-es6-class': WARN,
    'react/prefer-stateless-function': WARN,
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': WARN,
    'react/sort-comp': ERROR,
  },
};
