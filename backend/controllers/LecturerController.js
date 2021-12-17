const crypto = require("crypto")
const asyncHandler = require("express-async-handler")
const LecturerModel = require("../models/LecturerModel")
const PasswordResetModel = require("../models/PasswordResetModel")
const { sendEmail } = require("../utils/EmailUtils")
const { generateRandomPassword, hashPassword, matchPassword } = require("../utils/PasswordUtils")
const { generateToken } = require("../utils/TokenUtils")

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

// @Desc Auth User & get an access Token
// @Route POST /api/users/login
// @Access Public
module.exports.loginLecturer = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const lecturer = await LecturerModel.findOne({ email }) //find a record of a student

  if (lecturer && (await matchPassword(password, lecturer.password))) {
    if (lecturer.active) {
      lecturer.login_attempts = 0 //reset login attempts to 0
      await lecturer.save()
      const token = await generateToken(lecturer.id, lecturer.email)

      res.status(200).json({
        first_name: lecturer.first_name,
        last_name: lecturer.last_name,
        email: lecturer.email,
        token,
      })
    } else {
      res.status(401)
      throw new Error("Account not active")
    }
  } else if (lecturer && !(await matchPassword(password, lecturer.password))) {
    if (lecturer.active) {
      if (lecturer.login_attempts >= 2) {
        lecturer.login_attempts = 3
        lecturer.active = false
        await lecturer.save()
        res.status(401)
        throw new Error("Your account has been deactivated")
      } else {
        lecturer.login_attempts = Number(lecturer.login_attempts) + 1
        await lecturer.save()
        res.status(401)
        throw new Error("Invalid email or password")
      }
    } else {
      res.status(401)
      throw new Error("Your account is not active")
    }
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@desc get records for one student
//@route GET /api/users/
//@access Private/Admin
module.exports.fetchOneLecturer = asyncHandler(async (req, res) => {
  const { id } = req.params.id
  const lecturer = await LecturerModel.findOne({ _id: id }).select("-password")
  if (lecturer) {
    res.status(200).json(lecturer)
  } else {
    res.status(404)
    throw new Error("Student doesn't exist")
  }
})

module.exports.changePassword = asyncHandler(async (req, res) => {
  let { email, password, new_password } = req.body

  const lecturer = await LecturerModel.findOne({ email })

  if (lecturer && (await matchPassword(password, lecturer.password))) {
    new_password = await hashPassword(new_password)
    lecturer.password = new_password
    await lecturer.save()
    res.status(201).json({ message: "password successfully changed" })
  } else {
    res.status(401)
    throw new Error("account not found")
  }
})

module.exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const lecturer = await LecturerModel.findOne({ email }).select("email,password")

  if (lecturer) {
    //send recovery link to found email
    let reset_password = await PasswordResetModel.findOne({
      user_id: lecturer.id,
      email: lecturer.email,
    })
    if (reset_password) await reset_password.deleteOne()
    const reset_token = crypto.randomBytes(32).toString("hex")
    const hash_token = await hashPassword(reset_token) //use hash password util
    await new PasswordResetModel({
      user_id: lecturer.id,
      token: hash_token,
      email: lecturer.email,
      createdAt: Date.now(),
    }).save()
    const link = `${process.env.CLIENT_URL}/api/studentN/password/reset?reset_token=${reset_token}&reset_id=${lecturer.id}`
    const subject = "QR Code Attendance Password Reset"
    let email_sent = await sendEmail(lecturer.email, subject, link)
    if (email_sent) {
      res.status(200).json({
        message:
          "Check your email inbox, a password recovery link has been sent to you. Link expires in 1hr",
      })
    }
  } else {
    res.status(401)
    throw new Error("Account doesn't exist")
  }
})

module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { reset_token, reset_id } = req.query
  //get user associated with token
  let lecturer = await LecturerModel.findById(reset_id)
  if (lecturer) {
    let reset_password = await PasswordResetModel.findOne({
      user_id: reset_id,
      email: lecturer.email,
    })
    if (reset_password && (await matchPassword(reset_token, reset_password.token))) {
      let password = await generateRandomPassword(12)
      let hashed_password = await hashPassword(password)
      lecturer.password = hashed_password
      await lecturer.save()
      let emailSent = await sendEmail(
        lecturer.email,
        "QR Code Attendance New Password",
        `Your new password is ${password}. Kindly change password as you want`
      )
      if (emailSent) {
        await reset_password.deleteOne()
        res.status(201).json({ message: "Your new password has been sent to your email inbox" })
      }
    } else {
      res.status(404)
      throw new Error("Invalid link or link has expired")
    }
  } else {
    res.status(404)
    throw new Error("Account not found")
  }
})
