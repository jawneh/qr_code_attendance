const asyncHandler = require("express-async-handler")
const FacultyModel = require("../models/FacultyModel")
const DepartmentModel = require("../models/DepartmentModel")
const CourseModel = require("../models/CourseModel")
const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

module.exports.verifyLoginEntities = asyncHandler(async (req, res, next) => {
  const { email, password, token } = req.body

  if (!email.match(mailformat) || password.length <= 6 || password.length >= 20) {
    res.status(401)
    throw new Error("Invalid email or password")
  }
  const verify_url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.reCAPTCHA_SECRET_KEY}&response=${token}`

  const {
    data: { success, score, action, hostname },
  } = await axios.post(verify_url)

  if (!success || score < 0.5 || action !== "login" || hostname !== "payments.agib.gm") {
    res.status(401)
    throw new Error("reCaptcha Failed, please try again")
  } else {
    next()
  }
})

module.exports.verifyPasswordEntities = asyncHandler(async (req, res) => {
  if (
    password.length >= 8 &&
    password.length <= 20 &&
    new_password.length >= 8 &&
    new_password.length <= 25 &&
    typeof password == "string" &&
    typeof new_password == "string"
  ) {
    next()
  } else {
    res.status(422)
    throw new Error("invalid entity types")
  }
})

module.exports.verifyForgotPasswordEntities = asyncHandler(async (req, res, next) => {
  if (email && email.match(mailformat)) {
    next()
  } else {
    res.status(422)
    throw new Error("Invalid email")
  }
})

module.exports.verifyFacultyExist = asyncHandler(async (req, res, next) => {
  const { faculty_id } = req.body
  let faculty = await FacultyModel.findOne({ _id: faculty_id })
  if (faculty) {
    next()
  } else {
    throw new Error("Faculty doesn't exist")
  }
})

module.exports.verifyDepartmentExist = asyncHandler(async (req, res, next) => {
  const { department_id } = req.body
  let department = await DepartmentModel.findOne({ _id: department_id })
  if (department) {
    next()
  } else {
    res.status(404)
    throw new Error("Department doesn't exist")
  }
})

module.exports.verifyCourseExist = asyncHandler(async (req, res, next) => {
  const { course_id } = req.body
  let course = await CourseModel.findOne({ _id: course_id })
  if (course) {
    next()
  } else {
    res.status(404)
    throw new Error("Course doesn't exist")
  }
})
