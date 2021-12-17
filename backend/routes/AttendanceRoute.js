const express = require("express")
const router = express.Router()

router.get("/", console.log("get attendanceN"))
router.get("/:id", console.log("get attendanceN"))
router.post("/", console.log("post attendance"))
