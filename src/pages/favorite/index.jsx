import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { removeFavoriteNews, clearFavoriteNews } from '@/actions/news'
import {
  View,
  Image,
  Text,
} from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './style.scss'

class Favorite extends Component {
  config = {
    navigationBarTitleText: '我的收藏',
  }

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount () { }

  clearFavorite () {
    const _this = this

    Taro.showModal({
      title: '提示',
      content: '确定清除所有收藏吗，清除后无法恢复？',
      success (res) {
        res.confirm && _this.props.dispatchClearFavoriteNews()
      },
    })
  }

  goHomePage () {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  goDetailPage (id) {
    Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })
  }

  render () {
    return (
      <View className='favorite'>
        {this.props.favoriteList.length
          ? (<View className='favorite-list'>
            <View className='favorite-list-count'>
              <Text className='count-text'>共计 {this.props.favoriteList.length} 篇收藏</Text>
              <AtButton
                onClick={this.clearFavorite.bind(this)}
                className='count-clear-btn'
                type='primary'
                full={false}
                size='small'
              >
                清空收藏
              </AtButton>
            </View>
            {this.props.favoriteList.map(item => (
              <View
                onClick={this.goDetailPage.bind(this, item.id)}
                key={item.id}
                className='favorite-item'
              >
                <Image
                  src={item.image}
                  mode='aspectFill'
                  className='favorite-item-image'
                />
                <View className='favorite-item-title'>{item.title}</View>
              </View>
            ))}
          </View>)
          : (<View className='no-content'>
            <Text className='no-content-tip'>暂无收藏日推</Text>
            <AtButton
              onClick={this.goHomePage.bind(this)}
              type='primary'
            >
              点击回到首页
            </AtButton>
          </View>)}
      </View>
    )
  }
}

const mapStateToProps = ({ news }) => ({
  favoriteList: news.favoriteList,
})

const mapActionToProps = dispatch => ({
  dispatchRemoveFavoriteNews (id) {
    dispatch(removeFavoriteNews({ id }))
  },
  dispatchClearFavoriteNews () {
    dispatch(clearFavoriteNews())
  },
})

export default connect(mapStateToProps, mapActionToProps)(Favorite)
