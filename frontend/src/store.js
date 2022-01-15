import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import {
  userRegistrationReducer,
  userLoginReducer,
  usersGetReducer,
  userGetReducer,
} from "./redux/users/Reducers"
import {
  addFacultyReducer,
  fetchFacultiesReducer,
  updateFacultyReducer,
} from "./redux/faculties/Reducers"
import {
  addDepartmentReducer,
  fetchDepartmentsReducer,
  updateDepartmentReducer,
} from "./redux/departments/Reducers"
import { addCourseReducer, updateCourseReducer, fetchCoursesReducer } from "./redux/course/Reducers"

import { qrCodeGenerateReducer } from "./redux/qrcodes/Reducers"
import { fetchAttendanceReducer, fetchAttendancesReducer } from "./redux/attendance/Reducers"
const reducer = combineReducers({
  userRegistration: userRegistrationReducer,
  userGet: userGetReducer,
  usersGet: usersGetReducer,
  qrCodeUserLogin: userLoginReducer,
  addFaculty: addFacultyReducer,
  fetchFaculties: fetchFacultiesReducer,
  updateFaculty: updateFacultyReducer,
  addDepartment: addDepartmentReducer,
  fetchDepartments: fetchDepartmentsReducer,
  updateDepartment: updateDepartmentReducer,
  qrCodeGenerate: qrCodeGenerateReducer,
  addCourse: addCourseReducer,
  updateCourse: updateCourseReducer,
  fetchCourses: fetchCoursesReducer,
  fetchAttendance: fetchAttendanceReducer,
  fetchAttendances: fetchAttendancesReducer,
})

const qrCodeUserLoginFromStorage =
  localStorage.getItem("qrCodeUserInfo") && localStorage.getItem("qrCodeUserInfo") !== "undefined"
    ? JSON.parse(localStorage.getItem("qrCodeUserInfo"))
    : {}

const initialState = {
  qrCodeUserLogin: { user_info: qrCodeUserLoginFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
