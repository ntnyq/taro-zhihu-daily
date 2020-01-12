import http from '@/utils/request'

/**
 * 获取最新消息列表
 */
export function getLatestNewsList () {
  return http.get(`/news/latest`)
}

/**
 * 获取历史消息
 * @param {string} date 历史日期
 */
export function getNewsListByDate (date) {
  return http.get(`/news/before/${date}`)
}

/**
 * 获取新闻详情
 * @param {string}} id 新闻id
 */
export function getNewsDetail (id) {
  return http.get(`/news/${id}`)
}
