import axios from "axios"
import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENTS_FAIL,
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
} from "./Constants"

export const addDepartmentAction = department_data => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_DEPARTMENT_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.post("/department", department_data, config)
    dispatch({ type: ADD_DEPARTMENT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADD_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchDepartmentsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_DEPARTMENTS_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.get("/department", config)
    dispatch({ type: FETCH_DEPARTMENTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENTS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateDepartmentAction = department_data => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_DEPARTMENT_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }

    let { data } = await axios.patch("/department", department_data, config)
    dispatch({ type: UPDATE_DEPARTMENT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPDATE_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
