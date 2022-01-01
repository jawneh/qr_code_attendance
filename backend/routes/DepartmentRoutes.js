const express = require("express")
const router = express.Router()
const {
  addDepartment,
  fetchDepartment,
  fetchDepartments,
  updateDepartment,
} = require("../controllers/DepartmentController")

router.get("/:id", fetchDepartment)
router.get("/", fetchDepartments)
router.post("/", addDepartment)
router.patch("/:id", updateDepartment)

module.exports = router
