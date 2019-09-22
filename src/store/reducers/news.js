import Taro from '@tarojs/taro'
import { FAVORITE_NEWS_LIST } from '@config/NEWS'
import {
  ADD_FAVORITE_NEWS,
  REMOVE_FAVORITE_NEWS,
  CLEAR_FAVOORITE_NEWS
} from '@constants/news'

const INITIAL_STATE = {
  favoriteList: Taro.getStorageSync(FAVORITE_NEWS_LIST) || []
}

function news (state = INITIAL_STATE, action) {
  const { payload = {} } = action

  switch (action.type) {
    case ADD_FAVORITE_NEWS:
      let addResult = state.favoriteList
      const hasAlreadyInList = state.favoriteList.includes(item => item.id === payload.news.id)

      if (!hasAlreadyInList) {
        addResult = [payload.news, ...addResult]
      }

      Taro.setStorageSync(FAVORITE_NEWS_LIST, addResult)

      return { ...state, favoriteList: addResult }

    case REMOVE_FAVORITE_NEWS:
      const removeResult = state.favoriteList.filter(item => item.id !== payload.id)

      Taro.setStorageSync(FAVORITE_NEWS_LIST, removeResult)

      return { ...state, favoriteList: removeResult }

    case CLEAR_FAVOORITE_NEWS:
      const clearResult = []

      Taro.setStorageSync(FAVORITE_NEWS_LIST, clearResult)

      return { ...state, favoriteList: clearResult }

    default:
      return state
  }
}

export default news
