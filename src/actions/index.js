/**
 * 创建普通 Action
 * @param {string} type
 */
export function createAction (type) {
  return payload => ({ type, payload })
}

/**
 * 创建 API Action
 * @param {string} actionType
 * @param {function} func
 */
export function createApiAction (actionType, func = () => { }) {
  return (
    params = {},
    callback = { success: () => { }, failed: () => { } },
    customActionType = actionType
  ) => async (dispatch) => {
    try {
      dispatch({ type: `${customActionType}_SUCCESS`, params })

      const data = await func(params)

      callback.success && callback.success({ payload: data })
    } catch (err) {
      dispatch({ type: `${customActionType}_FAILED`, params, payload: err })

      callback.failed && callback.failed({ payload: err })
    }
  }
}
