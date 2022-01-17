import axios from "axios"
import {
  GET_ATTENDANCE_REQUEST,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAIL,
  GET_ATTENDANCES_REQUEST,
  GET_ATTENDANCES_SUCCESS,
  GET_ATTENDANCES_FAIL,
} from "./Constants"

export const getAttendanceAction = id => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ATTENDANCE_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.get(`/attendance/${id}`, config)
    dispatch({ type: GET_ATTENDANCE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAttendancesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ATTENDANCES_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.get("/attendance", config)
    dispatch({ type: GET_ATTENDANCES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ATTENDANCES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
