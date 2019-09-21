import Taro, { Component } from '@tarojs/taro'
import {
  View,
  // Image
} from '@tarojs/components'
import PropTypes from 'prop-types'

// import spinner from '@images/loader.png'

import './style.scss'

class Loading extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: '#e6dcdc'
  }

  render () {
    return (
      <View className='loading'>
        <View
          // style={{ backgroundColor: this.props.backgroundColor }}
          className='loading-inner'
        >
          {/* <Image
            src={spinner}
            className='loading-spinner'
          /> */}
        </View>
      </View>
    )
  }
}

export default Loading
