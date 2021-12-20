import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "./Constants"

export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTRATION_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_REGISTRATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userLoginReducer = (state = { user_info: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, user_info: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
