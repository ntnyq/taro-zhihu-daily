import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Text
} from '@tarojs/components'
import { getNewsDetail } from '@services'
import ParserRichText from '@components/ParserRichText'

import './style.scss'

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: '',
      title: '',
      image: ''
    }
  }

  componentWillMount () {
    const { id } = this.$router.params

    getNewsDetail(id)
      .then(res => {
        const { body, title, image } = res

        this.setState({ body, title, image })

        title && Taro.setNavigationBarTitle({ title })
      })
  }

  componentDidMount () {
  }

  onShareAppMessage () {
    const { title, image } = this.state
    const { id } = this.$router.params
    const path = `/pages/detail?id=${id}`

    return {
      title,
      path,
      imageUrl: image || '',
      success () {
        Taro.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 500
        })
      }
    }
  }

  render () {
    return (
      <View className='detail'>
        {this.state.image && <View className='detail-banner'>
          <Image
            src={this.state.image}
            mode='aspectFill'
            className='detail-banner-image'
          />
          <View className='detail-banner-overlay' />
          <Text className='detail-banner-title'>{this.state.title}</Text>
        </View>}
        <View className='detail-content'>
          <ParserRichText
            html={this.state.body}
            tagStyle={{
              ul: 'list-style: none; width: 100%; margin: 0 0 30rpx; padding: 0;',
              li: 'margin: 0 0 30rpx;',
              p: 'margin: 0 0 30rpx;'
            }}
          />
        </View>
      </View>
    )
  }
}

export default Detail
