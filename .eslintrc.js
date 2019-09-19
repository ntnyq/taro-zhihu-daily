module.exports = {
  extends: ['taro'],
  parser: 'babel-eslint',
  rules: {
    'no-unused-vars': [2, { varsIgnorePattern: 'Taro' }],
    'import/prefer-default-export': 0,

    // React
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx', '.tsx']
    }],
    'react/sort-comp': 0
  }
}
