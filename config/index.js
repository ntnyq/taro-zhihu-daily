/* eslint-disable import/no-commonjs */
const path = require('path')

const resolve = (...args) => path.resolve(__dirname, '..', ...args)

// NOTE 在 sass 中通过别名（@ 或 ~）引用需要指定路径
const sassImporter = url => {
  if (url[0] === '~' && url[1] !== '/') {
    return {
      file: resolve('node_modules', url.substr(1))
    }
  }

  const reg = /^@styles\/(.*)/
  return {
    file: reg.test(url) ? resolve('src/styles', url.match(reg)[1]) : url
  }
}

const config = {
  projectName: 'taro-template',
  date: '2019-9-19',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    sass: {
      resource: resolve('src/styles/core/style.scss'),
      projectDirectory: resolve(),
      importer: sassImporter
    }
  },
  defineConstants: {
  },
  alias: {
    '@actions': resolve('src/store/actions'),
    '@constants': resolve('src/store/constants'),
    '@reducers': resolve('src/store/reducers'),
    '@store': resolve('src/store'),
    '@services': resolve('src/services'),
    '@assets': resolve('src/assets'),
    '@config': resolve('src/config'),
    '@components': resolve('src/components'),
    '@styles': resolve('src/styles'),
    '@utils': resolve('src/utils')
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
