import { createAction } from '@actions'
import {
  ADD_FAVORITE_NEWS,
  REMOVE_FAVORITE_NEWS,
  CLEAR_FAVOORITE_NEWS
} from '@constants/news'

export const addFavoriteNews = createAction(ADD_FAVORITE_NEWS)
export const removeFavoriteNews = createAction(REMOVE_FAVORITE_NEWS)
export const clearFavoriteNews = createAction(CLEAR_FAVOORITE_NEWS)
