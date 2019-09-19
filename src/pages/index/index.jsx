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
} from '@services'

import './style.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)

    this.state = {
      date: '',
      slides: [],
      news: []
    }
  }

  componentDidMount () {
    getLatestNewsList()
      .then(res => {
        const {
          date,
          stories,
          top_stories
        } = res

        this.setState({
          slides: top_stories,
          date,
          news: stories
        })

        console.log(this.state.news)
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

  render () {
    return (
      <View className='index'>
        <Swiper
          className='index-swiper'
          indicatorColor='#ccc'
          indicatorActiveColor='#ffd300'
          autoplay
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
        <View className='index-list'>
          <Text>{this.state.date}</Text>
        </View>
      </View>
    )
  }
}

export default Index
