const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  fetchUser,
  fetchStudents,
  fetchStudent,
  fetchUsers,
  addCourse,
} = require("../controllers/UsersController")
const {
  verifyDepartmentExist,
  verifyFacultyExist,
  verifyCourseExist,
} = require("../middlewares/VerificationMiddleware")
const { authBearerToken, authAdminAccess } = require("../middlewares/AuthenticationMiddleware")

router.get("/students", authBearerToken, authAdminAccess, fetchStudents)
router.get("/student", authBearerToken, authAdminAccess, fetchStudent)
router.get("/:id", authBearerToken, authAdminAccess, fetchUser)
router.get("/", authBearerToken, authAdminAccess, fetchUsers)

router.post("/course", authBearerToken, authAdminAccess, verifyCourseExist, addCourse)
router.post("/login", loginUser)
router.post("/register", verifyFacultyExist, verifyDepartmentExist, registerUser)

module.exports = router
