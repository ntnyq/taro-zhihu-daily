import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'

import './style.scss'

class Poster extends Component {
  config = {
    usingComponents: {
      painter: '../../third-part/Painter/painter'
    }
  }

  static propsTypes = {
    style: PropTypes.object,
    data: PropTypes.object,
    save: PropTypes.bool,
    onPaintFinished: PropTypes.func
  }

  static defaultProps = {
    style: null,
    data: null,
    save: false,
    onPaintFinished: () => { }
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  saveImage (filePath) {
    Taro.saveImageToPhotosAlbum({
      filePath,
      success () {
        Taro.showModal({
          showCancel: false,
          title: '图片已保存到系统相册',
          content: '快去分享给小伙伴们吧~~',
          confirmText: '我知道了',
          confirmColor: '#2d8cf0'
        })
      },
      fail (err) {
        console.log(err)
      }
    })
  }

  async saveImageToPhotos (filePath) {
    const _this = this
    const { authSetting = {} } = await Taro.getSetting()

    if (authSetting['scope.writePhotosAlbum']) {
      this.saveImage(filePath)
    } else {
      Taro.authorize({
        scope: 'scope.writePhotosAlbum',
        success () {
          _this.saveImage(filePath)
        },
        fail () {
          Taro.showModal({
            title: '提示',
            content: '保存图片需要您的授权',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#7f7f7f',
            confirmText: '去设置',
            confirmColor: '#2d8cf0',
            success (modalRes) {
              if (modalRes.confirm) {
                Taro.openSetting()
              } else {
                console.log('用户点击了取消')
              }
            }
          })
        }
      })
    }
  }

  onImgOK (evt) {
    const { save } = this.props

    if (save) {
      this.saveImageToPhotos(evt.detail.path)
    }

    Taro.hideLoading()
    this.props.onPaintFinished()
  }

  onImgErr (evt) {
    console.log('Image Error', evt)

    Taro.hideLoading()
    this.props.onPaintFinished()
  }

  render () {
    const { data, style } = this.props
    if (!data) return <View />

    return (
      <View style={style} >
        <painter
          palette={data}
          onImgOK={this.onImgOK}
          onImgErr={this.onImgErr}
        />
      </View>
    )
  }
}

export default Poster
