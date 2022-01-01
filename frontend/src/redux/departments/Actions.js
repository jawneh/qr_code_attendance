import axios from "axios"
import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAIL,
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
} from "./Constants"

export const addDepartmentAction = department_data => async dispatch => {
  try {
    dispatch({ type: ADD_DEPARTMENT_REQUEST })
    const config = {
      headers: { "Content-Type": "application/json" },
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

export const fecthDepartmentAction = () => async dispatch => {
  try {
    dispatch({ type: FETCH_DEPARTMENT_REQUEST })
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    let { data } = await axios.get("/department", "", config)
    dispatch({ type: FETCH_DEPARTMENT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
