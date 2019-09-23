import Taro from '@tarojs/taro'
import { FAVORITE_LIST } from '@config/storage-key'
import {
  ADD_FAVORITE_NEWS,
  REMOVE_FAVORITE_NEWS,
  CLEAR_FAVOORITE_NEWS
} from '@constants/news'

const INITIAL_STATE = {
  favoriteList: Taro.getStorageSync(FAVORITE_LIST) || []
}

function news (state = INITIAL_STATE, action) {
  const { payload = {} } = action

  switch (action.type) {
    case ADD_FAVORITE_NEWS:
      const addResult = [payload.news, ...state.favoriteList]

      Taro.setStorageSync(FAVORITE_LIST, addResult)

      return { ...state, favoriteList: addResult }

    case REMOVE_FAVORITE_NEWS:
      const removeResult = state.favoriteList.filter(item => item.id !== payload.id)

      Taro.setStorageSync(FAVORITE_LIST, removeResult)

      return { ...state, favoriteList: removeResult }

    case CLEAR_FAVOORITE_NEWS:
      const clearResult = []

      Taro.setStorageSync(FAVORITE_LIST, clearResult)

      return { ...state, favoriteList: clearResult }

    default:
      return state
  }
}

export default news
