const express = require("express")
const router = express.Router()
const { registerUser, loginUser, fetchUser, fetchUsers } = require("../controllers/UsersController")

router.get("/:id", fetchUser)
router.get("/", fetchUsers)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router
