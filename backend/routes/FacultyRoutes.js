const express = require("express")
const router = express.Router()
const {
  addFaculty,
  fetchFaculty,
  fetchFaculties,
  updateFaculty,
} = require("../controllers/FacultyController")
const { authBearerToken, authAdminAccess } = require("../middlewares/AuthenticationMiddleware")

router.get("/:id", authBearerToken, fetchFaculty)
router.get("/", authBearerToken, fetchFaculties)
router.post("/", authBearerToken, addFaculty)
router.patch("/:id", authBearerToken, updateFaculty)

module.exports = router
