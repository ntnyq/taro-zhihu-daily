import {
  CLEAR_USER_INFO,
  SET_USER_INFO,
} from '@/constants/user'
import { createAction } from '.'

export const clearUserInfo = createAction(CLEAR_USER_INFO)
export const setUserInfo = createAction(SET_USER_INFO)
