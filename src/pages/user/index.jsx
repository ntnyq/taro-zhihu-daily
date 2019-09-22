import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {
  View,
  Text,
} from '@tarojs/components'
import {
  AtButton,
  AtAvatar,
  AtList,
  AtListItem,
  AtIcon
} from 'taro-ui'
import { USER_INFO } from '@config/USER'

import './style.scss'

class User extends Component {
  config = {
    navigationBarTitleText: '个人'
  }

  constructor(props) {
    super(props)

    this.state = {
      hasAuth: false,
      nickName: '',
      avatarUrl: ''
    }
  }

  async clearStorage () {
    await Taro.clearStorage()

    Taro.showToast({ title: '清理成功', icon: 'success' })
  }

  async componentWillMount () {
    const { data = {} } = await Taro.getStorage({ key: USER_INFO })
    const { nickName, avatarUrl } = data

    if (nickName || avatarUrl) {
      this.setState({ hasAuth: true, nickName, avatarUrl })
    }
  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
    const { nickName, avatarUrl } = nextProps

    if (nickName || avatarUrl) {
      this.setState({ hasAuth: true, nickName, avatarUrl })
    }
  }

  goTargetPage (target) {
    Taro.navigateTo({ url: `/pages/${target}/index` })
  }

  getUserInfo ({ detail }) {
    const { userInfo = {} } = detail
    const { nickName, avatarUrl } = userInfo

    if (nickName) {
      this.setState({ hasAuth: true, nickName, avatarUrl })
    }
  }

  render () {
    return (
      <View className='user'>
        <View className='user-header'>
          {this.state.hasAuth
            ? (<View className='has-auth'>
              <AtAvatar
                image={this.state.avatarUrl}
                size='large'
              />
              <Text className='has-auth-username'>
                {this.state.nickName}
              </Text>
            </View>)
            : (<View className='no-auth'>
              <Text className='no-auth-text'>授权后，获取个性化内容</Text>
              <AtButton
                onGetUserInfo={this.getUserInfo.bind(this)}
                openType='getUserInfo'
                type='primary'
                size='small'
              >
                点击授权
            </AtButton>
            </View>)}
        </View>
        <View className='user-section'>
          <View className='user-section-title'>
            <View className='user-section-title-line' />
            <Text>用户设置</Text>
          </View>
          <AtList hasBorder={false}>
            <AtListItem
              onClick={this.goTargetPage.bind(this, 'favorite')}
              title='我的收藏'
              arrow='right'
            />
            <AtListItem
              onClick={() => { Taro.openSetting() }}
              title='权限管理'
              arrow='right'
            />
            <AtListItem
              onClick={this.clearStorage.bind(this)}
              title='清理缓存'
            />
          </AtList>
        </View>
        <View className='user-section'>
          <View className='user-section-title'>
            <View className='user-section-title-line' />
            <Text>关于喔喔日推</Text>
          </View>
          <AtList hasBorder={false}>
            <View className='feedback-wrap'>
              <AtButton
                className='feedback-btn'
                openType='feedback'
              >
                意见反馈
              </AtButton>
              <AtIcon
                className='feedback-arrow'
                value='chevron-right'
                size=''
                color='#ccc'
              />
              <View className='feedback-line' />
            </View>
            <AtListItem
              onClick={this.goTargetPage.bind(this, 'copy')}
              title='版权声明'
              arrow='right'
            />
            <AtListItem
              onClick={this.goTargetPage.bind(this, 'author')}
              title='关于作者'
              arrow='right'
            />
            <AtListItem
              onClick={this.goTargetPage.bind(this, 'thank')}
              title='致谢'
              hasBorder={false}
              arrow='right'
            />
          </AtList>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  nickName: user.nickName,
  avatarUrl: user.avatarUrl
})

export default connect(mapStateToProps)(User)
