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

const INIT_DATE_OFFSET = 0

class Index extends Component {
  config = {
    navigationBarTitleText: '日推',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)

    this.state = {
      latestDate: '',
      dateOffset: INIT_DATE_OFFSET,
      slides: [],
      list: [],
      showGoTop: false
    }
  }

  componentWillMount () {
    this.fetchLatestNews()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPageScroll ({ scrollTop }) {
    const SHOW_GO_TOP_OFFSET = 120
    const shouldShowGoTop = scrollTop > SHOW_GO_TOP_OFFSET && !this.state.showGoTop
    const shouldHideGoTop = scrollTop < SHOW_GO_TOP_OFFSET && this.state.showGoTop

    shouldShowGoTop && this.setState({ showGoTop: true })
    shouldHideGoTop && this.setState({ showGoTop: false })
  }

  async onPullDownRefresh () {
    Taro.showLoading({ title: '加载中，请稍等' })

    try {
      await this.fetchLatestNews()

      this.setState({ dateOffset: INIT_DATE_OFFSET })
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    } catch (error) {

      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    }
  }

  onReachBottom () {
    this.fetchNewsByDate()
  }

  async fetchNewsByDate () {
    const latestDate = this.state.latestDate
    const year = latestDate.slice(0, 4)
    const month = latestDate.slice(4, 6)
    const day = latestDate.slice(-2)
    const time = new Date(`${year}/${month}/${day}`)

    time.setDate(time.getDate() + this.state.dateOffset)

    const date = formatTime(time, 'yyyyMMdd')

    this.setState({ dateOffset: --this.state.dateOffset })

    const res = await getNewsListByDate(date)

    this.setState({ list: [...this.state.list, res] })
  }

  async fetchLatestNews () {
    const res = await getLatestNewsList()

    this.setState({
      latestDate: res.date,
      slides: res.top_stories || [],
      list: [res]
    })

    // TODO 通过页面内容高度决定是否继续加载
    res.stories <= 2 && this.fetchNewsByDate()
  }

  goPageDetail (id) {
    Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })
  }

  scrollToTop () {
    Taro.pageScrollTo({ scrollTop: 0 })
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
        {this.state.showGoTop &&
          (<AtFab
            onClick={this.scrollToTop.bind(this)}
          >
            <Text className='at-fab__icon at-icon at-icon-arrow-up' />
          </AtFab>)}
      </View>
    )
  }
}

export default Index
