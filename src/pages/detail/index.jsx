import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {
  View,
  Image,
  Text,
  Button,
  RichText
} from '@tarojs/components'
import {
  AtFab,
  AtDivider,
  AtSwitch,
  AtIcon
} from 'taro-ui'
import { getNewsDetail } from '@services'
import {
  Loading,
  Poster
} from '@components/common'
import { addFavoriteNews, removeFavoriteNews } from '@actions/news'
import { formatTime } from '@utils'

import './style.scss'

/**
 *
 * @param {array | null} matches
 */
function getStringFromMatched (matches) {
  return (matches || [])[0] || ''
}

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: undefined,
      title: '',
      image: '',
      image_source: '',
      questions: [],
      posterData: null,
      isFavorite: false,
      isLoading: true,
      isFromShare: false
    }
  }

  componentDidMount () {
    const { id /* = '9715332' */, share } = this.$router.params

    if (id) {
      const isFromShare = !!share
      const { favoriteList = [] } = this.props
      const isFavorite = favoriteList.findIndex(item => item.id == id) >= 0

      this.fetchNewsDetail(id)
      this.setState({ id, isFromShare, isFavorite })
    } else {
      this.goHomePage()
    }
  }

  componentWillReceiveProps ({ favoriteList }) {
    const isFavorite = favoriteList.includes(item => item.id === this.state.id)

    this.setState({ isFavorite })
  }

  onShareAppMessage () {
    const { title, image } = this.state
    const { id } = this.$router.params
    const path = `/pages/detail/index?id=${id}&share=true`

    return { title, path, imageUrl: image || '' }
  }

  goHomePage () {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  addToFavorite (isChecked) {
    const { id, title, image } = this.state

    if (isChecked) {
      this.props.dispatchAddFavoriteNews({ id, title, image })
    } else {
      this.props.dispatchRemoveFavoriteNews(id)
    }
  }

  generatePoster () {
    const { title, image } = this.state
    const { userInfo: { nickName } = {} } = this.props
    const time = formatTime(new Date(), 'yyyy年MM月dd日')
    const posterData = {
      width: '750rpx',
      height: '1100rpx',
      background: '#ffffff',
      borderRadius: '0px',
      views: [
        {
          type: 'image',
          url: `${image}`,
          css: {
            top: '0rpx',
            left: '0rpx',
            width: '750rpx',
            height: '450rpx'
          }
        },
        {
          type: 'text',
          text: `${title}`,
          css: {
            top: '470rpx',
            left: '40rpx',
            width: '500rpx',
            fontSize: '36rpx',
            lineHeight: '50rpx',
            maxLines: '2',
            color: '#333333'
          }
        },
        {
          type: 'text',
          text: '来自：「知乎日报」',
          css: {
            top: '600rpx',
            left: '40rpx',
            color: '#999999'
          }
        },
        {
          type: 'text',
          text: nickName ? `${nickName} - 邀请你来读文章` : '文章分享',
          css: {
            left: '40rpx',
            top: '700rpx',
            width: '300rpx',
            maxLines: '1',
            fontSize: '24rpx',
            color: '#333333'
          }
        },
        {
          type: 'text',
          text: `分享于: ${time}`,
          css: {
            left: '40rpx',
            top: '750rpx',
            width: '300rpx',
            maxLines: '1',
            fontSize: '24rpx',
            color: '#333333'
          },
        },
        {
          type: 'text',
          text: '假装这里是小程序二维码',
          css: {
            bottom: '360rpx',
            right: '40rpx',
            width: '200rpx',
            height: '200rpx',
            fontSize: '32rpx',
            lineHeight: '48rpx',
            color: '#666666'
          }
        },
        {
          type: 'rect',
          css: {
            bottom: '0rpx',
            left: '0rpx',
            width: '750rpx',
            height: '120rpx',
            color: '#eccdb0'
          }
        },
        {
          type: 'text',
          text: '长按小程序码',
          css: {
            bottom: '70rpx',
            left: '40rpx',
            fontSize: '24rpx',
            maxLines: '1',
            color: '#914d4d'
          }
        },
        {
          type: 'text',
          text: '进入喔喔日推小程序查看',
          css: {
            bottom: '30rpx',
            left: '40rpx',
            fontSize: '24rpx',
            maxLines: '1',
            color: '#914d4d'
          }
        }
      ]
    }

    Taro.showLoading({ title: '努力生成中...' })
    this.setState({ posterData })
  }

  formatRichText (html) {
    // See https://github.com/llyer/wechat-app-zhihudaily/blob/master/pages/detail/detail.js
    // ([\s\S]*?) 可以匹配换行等字符，(.*?) 是不可以的
    const QUESTION_RE = /<div class=\"question\">([\s\S]*?)<\/a>(\n*)<\/div>(\n*)<\/div>/g
    const QUESTION_TITLE_RE = /<h2.*?<\/h2>/g
    const ANSWER_RE = /<div class=\"answer\">([\s\S]*?)<\/div>(\n*)<\/div>/g
    const AVATAR_RE = /<img class=\"avatar\"(.*?).jpg\">/g
    const AUTHOR_RE = /<span class=\"author\">(.*?)<\/span>/g
    const BIO_RE = /<span class=\"bio\">(.*?)<\/span>/g
    // TODO 正文，段落列表，需要添加兼容性，p标签是段落正文，figure 标签有可能内嵌图片信息
    const CONTENT_RE = /(<p>|<figure).*?(<\/p>|<\/figure>)/g
    const IMAGE_RE = /<img.*?>/i
    const IMAGE_SOURCE_RE = /src=".*?"/i

    const questionHtmlList = html.match(QUESTION_RE) || []

    const questions = questionHtmlList.map(questionHtmlItem => {
      const titleHtml = getStringFromMatched(questionHtmlItem.match(QUESTION_TITLE_RE))
      const title = titleHtml.substring(27, titleHtml.length - 5) || ''
      const answerHtmlList = questionHtmlItem.match(ANSWER_RE) || []
      const answers = answerHtmlList.map(answerHtmlItem => {
        const avatarHtml = getStringFromMatched(answerHtmlItem.match(AVATAR_RE))
        const authorHtml = getStringFromMatched(answerHtmlItem.match(AUTHOR_RE))
        const bioHtml = getStringFromMatched(answerHtmlItem.match(BIO_RE))

        const avatar = avatarHtml.substring(25, avatarHtml.length - 2)
        const author = authorHtml.substring(21, authorHtml.length - 8)
        const bio = bioHtml.substring(18, bioHtml.length - 7)

        const contentHtmlList = answerHtmlItem.match(CONTENT_RE) || []

        const content = contentHtmlList.map(contentHtmlItem => {
          const hasImage = IMAGE_RE.test(contentHtmlItem)
          const temp = { type: '', content: '' }

          if (hasImage) {
            const tempContentHtml = getStringFromMatched(contentHtmlItem.match(IMAGE_SOURCE_RE))

            temp.content = tempContentHtml.substring(5, tempContentHtml.length - 1)
            temp.type = 'IMAGE'
          } else {
            temp.content = contentHtmlItem
              // .replace(/<p>/g, '')
              // .replace(/<\/p>/g, '')
              // 不屏蔽 strong 标签
              // .replace(/<strong>/g, '')
              // .replace(/<\/strong>/g, '')
              .replace(/<a.*?\/a>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&ldquo;/g, '"')
              .replace(/&rdquo;/g, '"')
            temp.type = 'PARAGRAPH'
          }

          return temp
        })

        return { avatar, author, bio, content }
      })

      return { title, answers }
    })

    return questions
  }

  async fetchNewsDetail (id) {
    const { body, title, image, image_source } = await getNewsDetail(id)
    const questions = this.formatRichText(body)

    this.setState({ title, image, image_source, questions, isLoading: false })
    title && Taro.setNavigationBarTitle({ title })
  }

  render () {
    const {
      title,
      image,
      image_source,
      questions,
      isLoading,
      isFavorite,
      isFromShare,
      posterData,
    } = this.state

    const Questions = questions.map(question => (
      <View
        key={question.title}
        className='question'
      >
        <View className='question-title'>
          <Text className='question-title-text'>{question.title}</Text>
        </View>
        <View className='question-main'>
          {question.answers.map(answer => (
            <View key={answer.author} className='question-answer'>
              <View className='question-answer-meta'>
                <Image
                  src={answer.avatar}
                  mode='aspectFill'
                  className='meta-avatar'
                />
                <View className='meta-main'>
                  <View className='meta-author'>{answer.author}</View>
                  <View className='meta-bio'>{answer.bio}</View>
                </View>
              </View>
              <View className='question-answer-main'>
                {answer.content.map(node => (
                  <View
                    key={node.content}
                    className='paragraph'
                  >
                    {node.type === 'PARAGRAPH' && (<RichText nodes={node.content} />)}
                    {node.type === 'IMAGE' && (
                      <Image
                        src={node.content}
                        style={{ width: '100%' }}
                        mode='widthFix'
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    ))

    return isLoading ? <Loading /> : (
      <View className='detail'>
        {image && <View className='detail-banner'>
          <Image
            src={image}
            mode='aspectFill'
            className='detail-banner-image'
          />
          <View className='detail-banner-overlay' />
          <Text className='detail-banner-title'>{title}</Text>
          {image_source && <Text className='detail-banner-source'>图片：{image_source}</Text>}
        </View>}
        {Questions}
        <AtDivider
          content='没有更多了'
          fontColor='#ffd300'
          lineColor='#ffd300'
          height='40'
          fontSize='24'
        />
        <AtSwitch
          title='收藏此文章'
          checked={isFavorite}
          border={false}
          onChange={this.addToFavorite.bind(this)}
        />
        {posterData && (
          <Poster
            style={{ position: 'fixed', top: '-99999px', left: '-99999px' }}
            data={posterData}
            onPainterFinished={() => { this.setState({ posterData: null }) }}
            save
          />
        )}
        <View className='detail-action'>
          <Button
            hoverClass='none'
            className='action-item'
            openType='share'
          >
            <AtIcon
              className='action-item-icon'
              size=''
              value='share-2'
            />
            <Text className='action-item-text'>分享给好友</Text>
            <View className='action-item-line' />
          </Button>
          <Button
            onClick={this.generatePoster.bind(this)}
            hoverClass='none'
            className='action-item'
          >
            <AtIcon
              className='action-item-icon'
              size=''
              value='download-cloud'
            />
            <Text className='action-item-text'>生成海报</Text>
          </Button>
        </View>
        {isFromShare && (
          <AtFab onClick={this.goHomePage.bind(this)}>
            <Text className='at-fab__icon at-icon at-icon-home' />
          </AtFab>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ user, news }) => ({
  userInfo: user.userInfo,
  favoriteList: news.favoriteList
})

const mapActionToProps = dispatch => ({
  dispatchAddFavoriteNews (news) {
    dispatch(addFavoriteNews({ news }))
  },
  dispatchRemoveFavoriteNews (id) {
    dispatch(removeFavoriteNews({ id }))
  }
})

export default connect(mapStateToProps, mapActionToProps)(Detail)
