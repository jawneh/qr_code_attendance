import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
} from "./Constants"

export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { loading: true }
    case USER_REGISTRATION_SUCCESS:
      return { loading: false, success: action.payload }
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
      return { ...state, loading: false, error: action.payload }
    case USER_LOGOUT:
      return { user_info: {} }
    default:
      return state
  }
}

export const userGetReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return { ...state, loading: true }
    case USER_GET_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_GET_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const usersGetReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_GET_REQUEST:
      return { ...state, loading: true }
    case USERS_GET_SUCCESS:
      return { loading: false, users: action.payload }
    case USERS_GET_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
