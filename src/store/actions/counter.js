import { createAction } from '@actions'
import {
  ADD,
  MINUS,
} from '@constants/counter'

export const add = createAction(ADD)

export const minus = createAction(MINUS)
