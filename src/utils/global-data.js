let globalData = {}

/**
 * 设置全局数据
 * @param {string} key
 * @param {string} val
 */
export function set (key, val) {
  globalData[key] = val
}

/**
 * 根据传入key获取全局数据值
 * @param {string} key
 */
export function get (key) {
  return globalData[key]
}

/**
 * 重置全局数据
 */
export function reset () {
  globalData = {}
}
