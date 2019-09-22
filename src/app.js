import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import store from '@store'

import { setUserInfo } from '@actions/user'
import { USER_INFO } from '@config/USER'

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
      'pages/index/index',
      'pages/favorite/index',
      'pages/detail/index',
      'pages/author/index',
      'pages/user/index',
      'pages/thank/index',
      'pages/copy/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '喔喔日推',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#bfbfbf",
      selectedColor: "#ffd300",
      backgroundColor: "#fff",
      borderStyle: '#fff',
      list: [{
        pagePath: "pages/index/index",
        iconPath: "./assets/tabbar/news.png",
        selectedIconPath: "./assets/tabbar/news_active.png",
        text: "日推"
      }, {
        pagePath: "pages/user/index",
        iconPath: "./assets/tabbar/user.png",
        selectedIconPath: "./assets/tabbar/user_active.png",
        text: "个人"
      }]
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.updateApp()
    this.checkAuth()
  }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  async checkAuth () {
    const { authSetting } = await Taro.getSetting()

    if (authSetting['scope.userInfo']) {
      const { userInfo = {} } = await Taro.getUserInfo()
      const { nickName, avatarUrl } = userInfo

      store.dispatch(setUserInfo({ nickName, avatarUrl }))

      Taro.setStorage({ key: USER_INFO, data: { nickName, avatarUrl } })
    }
  }

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
