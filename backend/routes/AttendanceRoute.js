const express = require("express")
const router = express.Router()
const {
  fetchAttendance,
  addAttendance,
  markAttendance,
  fetchAttendances,
} = require("../controllers/AttendanceController")
const { verifyCourseExist } = require("../middlewares/VerificationMiddleware")
const {
  authBearerToken,
  authLecturerAccess,
  authStudentAccess,
} = require("../middlewares/AuthenticationMiddleware")

router.get("/:id", authBearerToken, authLecturerAccess, fetchAttendance)

router.get("/", authBearerToken, authLecturerAccess, fetchAttendances)

router.post("/", authBearerToken, authLecturerAccess, verifyCourseExist, addAttendance)

router.post("/mark", authBearerToken, authStudentAccess, markAttendance)

module.exports = router
