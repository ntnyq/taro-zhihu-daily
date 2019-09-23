import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtAvatar, AtIcon, AtDivider } from 'taro-ui'

import './style.scss'

class Author extends Component {
  config = {
    navigationBarTitleText: '关于作者'
  }

  constructor(props) {
    super(props)

    this.state = {
      contributors: [
        {
          name: 'ntnyq',
          avatar: 'https://avatars1.githubusercontent.com/u/22659150',
          description: '前端工程师，喜欢技术，喜欢折腾，喜欢小说，喜欢打游戏。'
        }
      ]
    }
  }

  render () {
    return (
      <View className='author'>
        <View className='contributor-list'>
          {this.state.contributors.map(item => (
            <View
              key={item.name}
              className='contributor-item'
            >
              <AtAvatar image={item.avatar} />
              <View className='contributor-item-main'>
                <View className='contributor-item-name'>{item.name}</View>
                <View className='contributor-item-description'>{item.description}</View>
              </View>
              <View className='contributor-item-wechat'>
                <Button
                  className='contributor-item-wechat-btn'
                  hoverClass='none'
                  openType='contact'
                >
                  <AtIcon
                    className='contributor-item-wechat-icon'
                    value='message'
                  />
                </Button>
              </View>
            </View>
          ))}
        </View>
        <AtDivider
          content='点击图标，直接与作者对话'
          lineColor='#efefef'
          fontColor='#ccc'
          fontSize='24'
        />
      </View>
    )
  }
}

export default Author
