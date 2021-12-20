const express = require("express")
const router = express.Router()
const {
  registerAdministrator,
  loginAdministrator,
  fetchOneAdministrator,
  fetchAllUser,
} = require("../controllers/AdministratorController")

router.get("/:id", fetchOneAdministrator)
router.get("/", fetchAllUser)
router.post("/register", registerAdministrator)
router.post("/login", loginAdministrator)

module.exports = router
