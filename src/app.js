import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import store from '@store'

import Index from './pages/index/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    this.updateApp()
  }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  updateApp () {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()

      updateManager.onCheckForUpdate(res => {
        console.log('hasUpdtae', res.hasUpdate)
      })

      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已准备好，是否重启应用',
          success (res) {
            res.confirm && updateManager.applyUpdate()
          }
        })
      })

      updateManager.onUpdateFailed(() => {
        console.log(`App update failed`)
      })
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
