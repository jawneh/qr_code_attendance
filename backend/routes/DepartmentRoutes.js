const express = require("express")
const router = express.Router()
const {
  addDepartment,
  fetchDepartment,
  fetchDepartments,
  updateDepartment,
} = require("../controllers/DepartmentController")
const { verifyFacultyExist } = require("../middlewares/VerificationMiddleware")
const { authBearerToken, authAdminAccess } = require("../middlewares/AuthenticationMiddleware")

router.get("/:id", authBearerToken, fetchDepartment)
router.get("/", authBearerToken, fetchDepartments)
router.post("/", authBearerToken, authAdminAccess, verifyFacultyExist, addDepartment)
router.patch("/:id", authBearerToken, authAdminAccess, updateDepartment)

module.exports = router
