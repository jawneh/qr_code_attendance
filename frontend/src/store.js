import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { userRegistrationReducer, userLoginReducer } from "./redux/users/Reducers"
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
const reducer = combineReducers({
  userRegistration: userRegistrationReducer,
  userLogin: userLoginReducer,
  addFaculty: addFacultyReducer,
  fetchFaculties: fetchFacultiesReducer,
  updateFaculty: updateFacultyReducer,
  addDepartment: addDepartmentReducer,
  fetchDepartments: fetchDepartmentsReducer,
  updateDepartment: updateDepartmentReducer,
})

const initialState = {
  userLogin: { user_info: {} },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
