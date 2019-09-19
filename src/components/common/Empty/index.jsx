import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './style.scss'

class Empty extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render () {
    return (
      <View className='empty'>

      </View>
    )
  }
}

export default Empty
