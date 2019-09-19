import {
  ADD,
  MINUS,
} from '@constants/counter'

const INITIAL_STATE = {
  count: 0
}

function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count: ++state.count
      }

    case MINUS:
      return {
        ...state,
        count: --state.count
      }

    default:
      return state
  }
}

export default counter
