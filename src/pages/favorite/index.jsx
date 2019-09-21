import Taro, { Component } from '@tarojs/taro'
import {
  View
} from '@tarojs/components'

class Favorite extends Component {
  config = {
    navigationBarTitleText: '我的收藏'
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentWillMount () { }

  componentDidMount () { }

  render () {
    return (
      <View className='favorite'>
        favorite
      </View>
    )
  }
}

export default Favorite
