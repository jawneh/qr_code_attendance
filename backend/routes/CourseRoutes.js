const express = require("express")
const router = express.Router()
const {
  registerCourse,
  fetchCourse,
  fetchCourses,
  updateCourse,
} = require("../controllers/CourseController")
const { authBearerToken, authAdminAccess } = require("../middlewares/AuthenticationMiddleware")

router.get("/:id", authBearerToken, fetchCourse)
router.get("/", authBearerToken, fetchCourses)
router.post("/", registerCourse)
router.patch("/:id", authBearerToken, authAdminAccess, updateCourse)

module.exports = router
