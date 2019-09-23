import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {
  View,
  Image,
  Text,
  Button
} from '@tarojs/components'
import {
  AtFab,
  AtDivider,
  AtSwitch,
  AtIcon
} from 'taro-ui'
import { getNewsDetail } from '@services'
import {
  RichTextParser,
  Loading,
  Poster
} from '@components/common'
import { addFavoriteNews, removeFavoriteNews } from '@actions/news'
import { formatTime } from '@utils'

import './style.scss'

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: undefined,
      body: '',
      title: '',
      image: '',
      isFavorite: false,
      posterData: null,
      isLoading: true,
      isFromShare: false
    }
  }

  componentDidMount () {
    const { id /* = '9715332' */, share } = this.$router.params

    if (id) {
      const isFromShare = !!share
      const { favoriteList = [] } = this.props
      const isFavorite = favoriteList.findIndex(item => item.id == id) >= 0

      this.fetchNewsDetail(id)
      this.setState({ id, isFromShare, isFavorite })
    } else {
      this.goHomePage()
    }
  }

  componentWillReceiveProps ({ favoriteList }) {
    console.log('componentWillReceiveProps triggered')
    const isFavorite = favoriteList.includes(item => item.id === this.state.id)

    this.setState({ isFavorite })
  }

  onShareAppMessage () {
    const { title, image } = this.state
    const { id } = this.$router.params
    const path = `/pages/detail/index?id=${id}&share=true`

    return { title, path, imageUrl: image || '' }
  }

  goHomePage () {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  addToFavorite (isChecked) {
    const { id, title, image } = this.state

    if (isChecked) {
      this.props.dispatchAddFavoriteNews({ id, title, image })
    } else {
      this.props.dispatchRemoveFavoriteNews(id)
    }
  }

  generatePoster () {
    const { title, image } = this.state
    const { userInfo: { nickName } = {} } = this.props
    const time = formatTime(new Date(), 'yyyy年MM月dd日')
    const posterData = {
      width: '750rpx',
      height: '1100rpx',
      background: '#ffffff',
      borderRadius: '0px',
      views: [
        {
          type: 'image',
          url: `${image}`,
          css: {
            top: '0rpx',
            left: '0rpx',
            width: '750rpx',
            height: '450rpx'
          }
        },
        {
          type: 'text',
          text: `${title}`,
          css: {
            top: '470rpx',
            left: '40rpx',
            width: '500rpx',
            fontSize: '36rpx',
            lineHeight: '50rpx',
            maxLines: '2',
            color: '#333333'
          }
        },
        {
          type: 'text',
          text: '来自：「知乎日报」',
          css: {
            top: '600rpx',
            left: '40rpx',
            color: '#999999'
          }
        },
        {
          type: 'text',
          text: nickName ? `${nickName} - 邀请你来读文章` : '文章分享',
          css: {
            left: '40rpx',
            top: '700rpx',
            width: '300rpx',
            maxLines: '1',
            fontSize: '24rpx',
            color: '#333333'
          }
        },
        {
          type: 'text',
          text: `分享于: ${time}`,
          css: {
            left: '40rpx',
            top: '750rpx',
            width: '300rpx',
            maxLines: '1',
            fontSize: '24rpx',
            color: '#333333'
          },
        },
        {
          type: 'text',
          text: '假装这里是小程序二维码',
          css: {
            bottom: '360rpx',
            right: '40rpx',
            width: '200rpx',
            height: '200rpx',
            fontSize: '32rpx',
            lineHeight: '48rpx',
            color: '#666666'
          }
        },
        {
          type: 'rect',
          css: {
            bottom: '0rpx',
            left: '0rpx',
            width: '750rpx',
            height: '120rpx',
            color: '#eccdb0'
          }
        },
        {
          type: 'text',
          text: '长按小程序码',
          css: {
            bottom: '70rpx',
            left: '40rpx',
            fontSize: '24rpx',
            maxLines: '1',
            color: '#914d4d'
          }
        },
        {
          type: 'text',
          text: '进入喔喔日推小程序查看',
          css: {
            bottom: '30rpx',
            left: '40rpx',
            fontSize: '24rpx',
            maxLines: '1',
            color: '#914d4d'
          }
        }
      ]
    }

    Taro.showLoading({ title: '努力生成中...' })
    this.setState({ posterData })
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
          <RichTextParser
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
          checked={this.state.isFavorite}
          border={false}
          onChange={this.addToFavorite.bind(this)}
        />
        {this.state.posterData && (
          <Poster
            style={{ position: 'fixed', top: '-99999px', left: '-99999px' }}
            data={this.state.posterData}
            onPainterFinished={() => { this.setState({ posterData: null }) }}
            save
          />
        )}
        <View className='detail-action'>
          <Button
            hoverClass='none'
            className='action-item'
            openType='share'
          >
            <AtIcon
              className='action-item-icon'
              size=''
              value='share-2'
            />
            <Text className='action-item-text'>分享给好友</Text>
            <View className='action-item-line' />
          </Button>
          <Button
            onClick={this.generatePoster.bind(this)}
            hoverClass='none'
            className='action-item'
          >
            <AtIcon
              className='action-item-icon'
              size=''
              value='download-cloud'
            />
            <Text className='action-item-text'>生成海报</Text>
          </Button>
        </View>
        {this.state.isFromShare && (
          <AtFab onClick={this.goHomePage.bind(this)}>
            <Text className='at-fab__icon at-icon at-icon-home' />
          </AtFab>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ user, news }) => ({
  userInfo: user.userInfo,
  favoriteList: news.favoriteList
})

const mapActionToProps = dispatch => ({
  dispatchAddFavoriteNews (news) {
    dispatch(addFavoriteNews({ news }))
  },
  dispatchRemoveFavoriteNews (id) {
    dispatch(removeFavoriteNews({ id }))
  }
})

export default connect(mapStateToProps, mapActionToProps)(Detail)
