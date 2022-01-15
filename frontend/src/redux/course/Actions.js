import axios from "axios"
import {
  ADD_COURSE_FAIL,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  FETCH_COURSES_FAIL,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSE_FAIL,
  FETCH_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
} from "./Constants"

export const addCourseAction = course_data => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_COURSE_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.post("/course", course_data, config)
    dispatch({ type: ADD_COURSE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADD_COURSE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchCoursesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_COURSES_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.get("/course", "", config)
    dispatch({ type: FETCH_COURSES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_COURSES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchCourseAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_COURSE_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.get("/course", "", config)
    dispatch({ type: FETCH_COURSE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_COURSE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
