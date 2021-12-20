import axios from "axios"
import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "./Constants"

export const userRegistrationAction =
  (user_data = {}) =>
  async dispatch => {
    try {
      dispatch({ type: USER_REGISTRATION_REQUEST })
      const config = {
        headers: { "Content-Type": "application/json" },
      }
      let { data } = await axios.post("/admin/register", user_data, config)
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
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
