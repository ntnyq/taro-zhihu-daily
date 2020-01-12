module.exports = {
  extends: [
    'taro',
    'goy',
  ],

  parser: 'babel-eslint',

  rules: {
    'no-unused-vars': [2, { varsIgnorePattern: 'Taro' }],
    'import/no-commonjs': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/sort-comp': 0,
    'react/react-in-jsx-scope': 0,
  },
}
