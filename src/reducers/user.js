import Taro from '@tarojs/taro'
import {
  CLEAR_USER_INFO,
  SET_USER_INFO,
} from '@/constants/user'
import { USER_INFO } from '@/constants/storage'

const INITIAL_STATE = {
  userInfo: Taro.getStorageSync(USER_INFO) || {},
}

function user (state = INITIAL_STATE, action) {
  const { payload = {} } = action

  switch (action.type) {
    case SET_USER_INFO:
      Taro.setStorageSync(USER_INFO, payload.userInfo)

      return {
        ...state,
        userInfo: payload.userInfo,
      }

    case CLEAR_USER_INFO:
      Taro.removeStorageSync(USER_INFO)

      return {
        ...state,
        userInfo: {},
      }

    default:
      return state
  }
}

export default user
