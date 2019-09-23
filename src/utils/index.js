
/**
 * 格式化时间
 * @param {string} value 时间
 * @param {string} [fmt = 'yyyy-MM-dd hh:mm:ss'] 格式
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime (value, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const time = new Date(value);
  const obj = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': ~~((time.getMonth() + 3) / 3),
    S: time.getMilliseconds(),
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }

  for (const k in obj) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? obj[k]
          : ('00' + obj[k]).substr(('' + obj[k]).length)
      );
    }
  }

  return fmt
}

/**
 * 检测是否为空对象
 * @param {object} obj 被检测的对象 默认为空对象
 * @returns {boolean} 检查结果
 */
export function isEmptyObject (obj = {}) {
  for (const key in obj) {
    return false
  }

  return true
}
