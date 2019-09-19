import http from '@utils/request'

/**
 * 获取最新消息列表
 */
export function getLatestNewsList () {
  return http.get(`/news/latest`)
}
