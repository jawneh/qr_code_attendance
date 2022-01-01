const express = require("express")
const router = express.Router()
const {
  addFaculty,
  fetchFaculty,
  fetchFaculties,
  updateFaculty,
} = require("../controllers/FacultyController")

router.get("/:id", fetchFaculty)
router.get("/", fetchFaculties)
router.post("/", addFaculty)
router.patch("/:id", updateFaculty)

module.exports = router
