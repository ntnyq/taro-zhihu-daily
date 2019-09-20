import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Text,
  Swiper,
  SwiperItem
} from '@tarojs/components'
import {
  getLatestNewsList,
  getNewsListByDate,
} from '@services'
import { AtFab } from 'taro-ui'
import { formatTime } from '@utils'

import './style.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)

    this.state = {
      showGoTop: false,
      dateOffset: -1,
      slides: [],
      list: []
    }
  }

  componentDidMount () {
    getLatestNewsList()
      .then(res => {
        this.setState({
          slides: res.top_stories,
          list: [res]
        })
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goPageDetail (id) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  scrollToTop () {
    Taro.pageScrollTo({ scrollTop: 0 })
  }

  onPageScroll ({ scrollTop }) {
    const SHOW_GO_TOP_OFFSET = 120
    const shouldShowGoTop = scrollTop > SHOW_GO_TOP_OFFSET && !this.state.showGoTop
    const shouldHideGoTop = scrollTop < SHOW_GO_TOP_OFFSET && this.state.showGoTop

    shouldShowGoTop && this.setState({ showGoTop: true })
    shouldHideGoTop && this.setState({ showGoTop: false })
  }

  onReachBottom () {
    const now = new Date()

    now.setDate(now.getDate() + this.state.dateOffset)

    const date = formatTime(now, 'yyyyMMdd')

    this.setState({ dateOffset: this.state.dateOffset - 1 })

    getNewsListByDate(date)
      .then(res => {
        this.setState({ list: [...this.state.list, res] })
      })
  }

  render () {
    return (
      <View className='index'>
        <Swiper
          className='index-swiper'
          indicatorColor='#ccc'
          indicatorActiveColor='#ffd300'
          autoplay
          circular
          indicatorDots
        >
          {this.state.slides.map(slide => (
            <SwiperItem
              onClick={this.goPageDetail.bind(this, slide.id)}
              key={slide.id}
            >
              <Image
                src={slide.image}
                mode='aspectFill'
                className='index-swiper-image'
              />
              <View className='index-swiper-overlay' />
              <Text className='index-swiper-title'>{slide.title}</Text>
            </SwiperItem>
          ))}
        </Swiper>
        <View className='index-list-wrap'>
          {this.state.list.map(item => (
            <View
              key={item.date}
              className='index-list-item'
            >
              <View className='index-list-item-header'>
                <Text className='index-list-item-title'>{item.date}</Text>
              </View>
              <View className='index-list-item-main'>
                {item.stories.map(story => (
                  <View
                    onClick={this.goPageDetail.bind(this, story.id)}
                    key={story.id}
                    className='index-list-item-news'
                  >
                    <Image
                      src={story.images[0]}
                      mode='aspectFill'
                      className='index-list-item-news-image'
                    />
                    <View className='index-list-item-news-title'>{story.title}</View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
        {this.state.showGoTop && <AtFab onClick={this.scrollToTop.bind(this)} size='small'>
          <Text className='at-fab__icon at-icon at-icon-arrow-up' />
        </AtFab>}
      </View>
    )
  }
}

export default Index
