import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
} from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './style.scss'

class Copyright extends Component {
  config = {
    navigationBarTitleText: '版权声明',
  }

  constructor (props) {
    super(props)

    this.state = {
      email: 'ntnyq@foxmail.com',
    }
  }

  copyEmail () {
    Taro.setClipboardData({
      data: this.state.email,
      success () {
        Taro.showToast({ title: '复制成功', icon: 'success' })
      },
    })
  }

  render () {
    return (
      <View className='copyright'>
        <View className='paragraph'>本应用所使用 API 均由 <Text className='highlight'>知乎 (Zhihu.Inc)</Text> 提供，本人采取非正常手段获取，仅供学习参考，不得用于其他用途。项目 API 内容的一切权利属于知乎。此行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除整个项目。</View>
        <View className='paragraph'>联系邮箱：<Text className='highlight'>{this.state.email}</Text></View>
        <AtButton
          onClick={this.copyEmail.bind(this)}
          className='btn-copy-email'
          size='small'
          type='primary'
        >
          点击复制邮箱
        </AtButton>
      </View>
    )
  }
}

export default Copyright
