import {
  ADD_COURSE_FAIL,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  FETCH_COURSES_FAIL,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
} from "./Constants"

export const addCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COURSE_REQUEST:
      return { ...state, loading: true }
    case ADD_COURSE_SUCCESS:
      return { loading: false, success: action.payload }
    case ADD_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const fetchCoursesReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return { ...state, loading: true }
    case FETCH_COURSES_SUCCESS:
      return { loading: false, courses: action.payload }
    case FETCH_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COURSE_REQUEST:
      return { ...state, loading: true }
    case UPDATE_COURSE_SUCCESS:
      return { loading: false, success: action.payload }
    case UPDATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
