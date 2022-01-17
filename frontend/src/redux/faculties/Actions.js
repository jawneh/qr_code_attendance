import axios from "axios"
import {
  ADD_FACULTY_REQUEST,
  ADD_FACULTY_SUCCESS,
  ADD_FACULTY_FAIL,
  FETCH_FACULTIES_REQUEST,
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAIL,
} from "./Constants"

export const addFacultyAction = faculty_data => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_FACULTY_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }
    let { data } = await axios.post("/faculty", faculty_data, config)
    dispatch({ type: ADD_FACULTY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADD_FACULTY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchFacultiesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_FACULTIES_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }

    let { data } = await axios.get("/faculty", config)
    dispatch({ type: FETCH_FACULTIES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_FACULTIES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
