const asyncHandler = require("express-async-handler")
const LecturerModel = require("../models/LecturerModel")
const { sendEmail } = require("../utils/EmailUtils")

module.exports.registerLecturer = asyncHandler(async (req, res) => {
  const { department, email, faculty, first_name, last_name, matriculation_number, phone } =
    req.body
  let generated_password = await generateRandomPassword(10)
  const password = await hashPassword(generated_password)

  let lecturer = new LecturerModel.create({
    department,
    email,
    faculty,
    first_name,
    last_name,
    matriculation_number,
    phone,
    password,
  })
  if (lecturer) {
    await sendEmail(email, "QRCode Attendance", `Your password is ${generated_password}`)
    res.status(201).json({
      message: "lecturer successfully created",
      user: {
        id: user._id,
        first_name: user.firstName,
        last_name: user.lastName,
      },
    })
  } else {
    res.status(400)
    throw new Error("Failed to register, kindly try again")
  }
})

//fetch attendance for a course or time period
module.exports.FetchAttendance = asyncHandler(async (req, res) => {})

//can only be done by students
module.exports.AddAttendance = asyncHandler(async (req, res) => {})
