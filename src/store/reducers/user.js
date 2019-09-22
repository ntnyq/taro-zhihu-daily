import {
  SET_USER_INFO
} from '@constants/user'

const INITIAL_STATE = {
  nickName: '',
  avatarUrl: ''
}

function user (state = INITIAL_STATE, action) {
  const { payload = {} } = action

  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        nickName: payload.nickName,
        avatarUrl: payload.avatarUrl
      }

    default:
      return state
  }
}

export default user
