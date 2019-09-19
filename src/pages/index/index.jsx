import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
  AtButton,
  AtAvatar,
} from 'taro-ui'
import {
  getLatestNewsList,
} from '@services'
import {
  add,
  minus,
} from '@actions/counter'

import './style.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    getLatestNewsList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View>
          <View>
            当前数字 {this.props.count}
          </View>
          <AtAvatar text={`${this.props.count}`}>

          </AtAvatar>
          <Button onClick={this.props.add.bind(this)}>
            +
          </Button>
          <Button onClick={this.props.minus.bind(this)}>
            -
          </Button>
          <AtButton onClick={this.props.add.bind(this)} type='primary'>
            +
          </AtButton>
          <AtButton onClick={this.props.minus.bind(this)} type='primary'>
            -
          </AtButton>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
  count: counter.count
})

const mapDispatchToProps = dispatch => ({
  add () { dispatch(add()) },
  minus () { dispatch(minus()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
