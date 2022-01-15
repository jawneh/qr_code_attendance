import axios from "axios"
import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_GET_FAIL,
} from "./Constants"

export const userRegistrationAction =
  (user_data = {}) =>
  async dispatch => {
    try {
      dispatch({ type: USER_REGISTRATION_REQUEST })
      const config = {
        headers: { "Content-Type": "application/json" },
      }
      let { data } = await axios.post("/user/register", user_data, config)
      dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_REGISTRATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const userLoginAction = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    let { data } = await axios.post("/user/login", { email, password }, config)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem("qrCodeUserInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const userGetAction = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.get(`/user/${id}`, "", config)
    dispatch({ type: USER_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_GET_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const usersGetAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_GET_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }

    let { data } = await axios.get("/user", config)
    dispatch({ type: USERS_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USERS_GET_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const userLogout = () => dispatch => {
  localStorage.removeItem("qrCodeUserInfo")
  dispatch({ type: USER_LOGOUT })
}
