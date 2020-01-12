import Taro from '@tarojs/taro'
import { FAVORITE_LIST } from '@/constants/storage'
import {
  ADD_FAVORITE_NEWS,
  REMOVE_FAVORITE_NEWS,
  CLEAR_FAVOORITE_NEWS,
} from '@/constants/news'

const INITIAL_STATE = {
  favoriteList: Taro.getStorageSync(FAVORITE_LIST) || [],
}

function news (state = INITIAL_STATE, action) {
  const { payload = {} } = action

  switch (action.type) {
    case ADD_FAVORITE_NEWS:
      Taro.setStorageSync(FAVORITE_LIST, [payload.news, ...state.favoriteList])

      return { ...state, favoriteList: [payload.news, ...state.favoriteList] }

    case REMOVE_FAVORITE_NEWS:
      Taro.setStorageSync(FAVORITE_LIST, state.favoriteList.filter(item => item.id !== payload.id))

      return { ...state, favoriteList: state.favoriteList.filter(item => item.id !== payload.id) }

    case CLEAR_FAVOORITE_NEWS:
      Taro.setStorageSync(FAVORITE_LIST, [])

      return { ...state, favoriteList: [] }

    default:
      return state
  }
}

export default news
