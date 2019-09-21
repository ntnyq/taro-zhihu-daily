import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Text
} from '@tarojs/components'
import {
  AtFab,
  AtDivider,
  AtSwitch
} from 'taro-ui'
import { getNewsDetail } from '@services'
import ParserRichText from '@components/ParserRichText'
import { Loading } from '@components/common'

import './style.scss'

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: '',
      title: '',
      image: '',
      isLoading: true,
      isFromShare: false
    }
  }

  componentWillMount () {
    const { id, share } = this.$router.params

    this.fetchNewsDetail(id)

    !!share && this.setState({ isFromShare: true })
  }

  componentDidMount () { }

  onShareAppMessage () {
    const { title, image } = this.state
    const { id } = this.$router.params
    const path = `/pages/detail/index?id=${id}&share=true`

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

  goPageHome () {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  async fetchNewsDetail (id) {
    const { body, title, image } = await getNewsDetail(id)

    this.setState({ body, title, image, isLoading: false })

    title && Taro.setNavigationBarTitle({ title })
  }

  render () {
    return this.state.isLoading ? <Loading /> : (
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
        <AtDivider
          content='没有更多了'
          fontColor='#ffd300'
          lineColor='#ffd300'
          height='40'
          fontSize='24'
        />
        <AtSwitch
          title='收藏此文章'
          checked={false}
          border={false}
          onChange={() => { }}
        >

        </AtSwitch>
        {this.state.isFromShare && (
          <AtFab onClick={this.goPageHome.bind(this)}>
            <Text className='at-fab__icon at-icon at-icon-home' />
          </AtFab>
        )}
      </View>
    )
  }
}

export default Detail
