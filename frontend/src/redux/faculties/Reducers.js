import {
  ADD_FACULTY_REQUEST,
  ADD_FACULTY_SUCCESS,
  ADD_FACULTY_FAIL,
  UPDATE_FACULTY_REQUEST,
  UPDATE_FACULTY_SUCCESS,
  UPDATE_FACULTY_FAIL,
  FETCH_FACULTIES_REQUEST,
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAIL,
} from "./Constants"

export const addFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FACULTY_REQUEST:
      return { ...state, loading: true }
    case ADD_FACULTY_SUCCESS:
      return { loading: false, added_faculty_name: action.payload }
    case ADD_FACULTY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const fetchFacultiesReducer = (state = { faculties: [] }, action) => {
  switch (action.type) {
    case FETCH_FACULTIES_REQUEST:
      return { ...state, loading: true }
    case FETCH_FACULTIES_SUCCESS:
      return { loading: false, faculties: action.payload }
    case FETCH_FACULTIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FACULTY_REQUEST:
      return { ...state, loading: true }
    case UPDATE_FACULTY_SUCCESS:
      return { loading: false, faculty_name: action.payload }
    case UPDATE_FACULTY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
