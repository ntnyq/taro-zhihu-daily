import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '@/reducers'

const showLogger = process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp'

const middlewares = [
  thunkMiddleware,
  ...(showLogger ? [createLogger()] : []),
]

export default createStore(rootReducer, applyMiddleware(...middlewares))
