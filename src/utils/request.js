import Taro from '@tarojs/taro'
// import

/* eslint-disable-next-line no-undef */
export const apiHost = API_HOST

const api = {
  baseOptions (params, method = 'GET') {
    const {
      url,
      data,
      contentType,
    } = params
    const options = {
      url: /^https?/.test(url) ? url : apiHost + url,
      data,
      method,
      header: {
        contentType: contentType,
      },
    }

    return Taro
      .request(options)
      .then(res => {
        const { statusCode, errMsg } = res

        if (statusCode === 200) {
          return res.data || {}
        } else {
          Taro.showToast({
            title: errMsg || `返回成功，但状态码为${statusCode}`,
            icon: 'none',
          })
        }
      })
      .catch(err => {
        const message = '小程序数据请求失败'

        Taro.showToast({
          title: err.errorMsg || message,
          icon: 'none',
        })

        return Promise.reject(err)
      })
  },

  get (url, data = {}) {
    const options = { url, data }

    return this.baseOptions(options, 'GET')
  },

  post (url, data = {}, contentType) {
    const options = { url, data, contentType }

    return this.baseOptions(options, 'POST')
  },

  put (url, data = {}) {
    const options = { url, data }

    return this.baseOptions(options, 'PUT')
  },

  delete (url, data = {}) {
    const options = { url, data }

    return this.baseOptions(options, 'DELETE')
  },
}

export default api
