import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'

import './style.scss'

class Thank extends Component {
  config = {
    navigationBarTitleText: '致谢',
  }

  copyText (data) {
    Taro.setClipboardData({
      data,
      success () {
        Taro.showToast({ title: '复制 URL 成功', icon: 'success' })
      },
    })
  }

  render () {
    return (
      <View className='thank'>
        <AtNoticebar close>
          点击链接，即可复制 URL 至浏览器中打开。
        </AtNoticebar>

        <View className='card'>
          感谢 <Text
            onClick={this.copyText.bind(this, 'https://www.zhihu.com/')}
            className='highlight'
          >知乎 (Zhihu.Inc)</Text> 提供 API。
        </View>

        <View className='card'>
          感谢 <Text
            onClick={this.copyText.bind(this, 'https://github.com/izzyleung/ZhihuDailyPurify')}
            className='highlight'
          >izzyleung/ZhihuDailyPurify</Text> 项目提供 API 接口文档。
        </View>

        <View className='card'>
          感谢 <Text
            onClick={this.copyText.bind(this, 'https://github.com/walleeeee/daily-zhihu')}
            className='highlight'
          >walleeeee/daily-zhihu</Text> 项目提供部分页面设计。
        </View>
      </View>
    )
  }
}

export default Thank
