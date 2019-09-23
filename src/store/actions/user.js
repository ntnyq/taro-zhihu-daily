import { createAction } from '@actions'
import {
  CLEAR_USER_INFO,
  SET_USER_INFO
} from '@constants/user'

export const clearUserInfo = createAction(CLEAR_USER_INFO)
export const setUserInfo = createAction(SET_USER_INFO)
