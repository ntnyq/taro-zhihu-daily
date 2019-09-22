import { combineReducers } from 'redux'
import user from './user'
import news from './news'

const rootReducer = combineReducers({
  user,
  news
})

export default rootReducer
