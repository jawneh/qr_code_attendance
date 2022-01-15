import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
} from "./Constants"

export const addDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT_REQUEST:
      return { ...state, loading: true }
    case ADD_DEPARTMENT_SUCCESS:
      return { loading: false, success: action.payload }
    case ADD_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const fetchDepartmentsReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_DEPARTMENTS_SUCCESS:
      return { loading: false, departments: action.payload }
    case FETCH_DEPARTMENTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DEPARTMENT_REQUEST:
      return { ...state, loading: true }
    case UPDATE_DEPARTMENT_SUCCESS:
      return { loading: false, faculty_name: action.payload }
    case UPDATE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
