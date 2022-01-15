import {
  GET_ATTENDANCE_REQUEST,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAIL,
  GET_ATTENDANCES_REQUEST,
  GET_ATTENDANCES_SUCCESS,
  GET_ATTENDANCES_FAIL,
} from "./Constants"

export const fetchAttendanceReducer = (state = { attendance: {} }, action) => {
  switch (action.type) {
    case GET_ATTENDANCE_REQUEST:
      return { ...state, loading: true }
    case GET_ATTENDANCE_SUCCESS:
      return { loading: false, attendance: action.payload }
    case GET_ATTENDANCE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const fetchAttendancesReducer = (state = { attendances: [] }, action) => {
  switch (action.type) {
    case GET_ATTENDANCES_REQUEST:
      return { ...state, loading: true }
    case GET_ATTENDANCES_SUCCESS:
      return { loading: false, attendances: action.payload }
    case GET_ATTENDANCES_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
