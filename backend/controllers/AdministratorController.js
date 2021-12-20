const crypto = require("crypto")
const asyncHandler = require("express-async-handler")
const AdministratorModel = require("../models/AdministratorModel")
const StudentModel = require("../models/StudentModel")
const ResetPasswordModel = require("../models/PasswordResetModel")
const { sendEmail } = require("../utils/EmailUtils")
const { generateRandomPassword, hashPassword, matchPassword } = require("../utils/PasswordUtils")
const { generateToken } = require("../utils/TokenUtils")

module.exports.registerAdministrator = asyncHandler(async (req, res) => {
  const { first_name, last_name, staff_id, email, faculty, department, phone } = req.body
  console.log(req.body)
  let generated_password = await generateRandomPassword(10)
  console.log(generated_password)
  const password = await hashPassword(generated_password)
  let administrator = await AdministratorModel.create({
    first_name,
    last_name,
    staff_id,
    email,
    faculty,
    department,
    phone,
    password,
  })
  if (administrator) {
    // await sendEmail(email, "QRCode Attendance", `Your password is ${generated_password}`)
    console.log("send email")
    res.status(201).json({
      id: administrator._id,
      first_name: administrator.first_name,
      last_name: administrator.last_name,
    })
  } else {
    res.status(400)
    throw new Error("Failed to create or get created user")
  }
})

// @Desc Auth User & get an access Token
// @Route POST /api/users/login
// @Access Public
module.exports.loginAdministrator = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const administrator = await AdministratorModel.findOne({ email }) //find record of adminstrator

  if (administrator && (await matchPassword(password, administrator.password))) {
    if (administrator.active) {
      administrator.login_attempts = 0 //reset login attempts to 0
      await administrator.save()
      const token = await generateToken(administrator.id, administrator.email)

      res.status(200).json({
        first_name: administrator.first_name,
        last_name: administrator.last_name,
        email: administrator.email,
        super: administrator.super,
        token,
      })
    } else {
      res.status(401)
      throw new Error("Account not active")
    }
  } else if (administrator && !(await matchPassword(password, administrator.password))) {
    if (administrator.active) {
      if (administrator.login_attempts >= 2) {
        administrator.login_attempts = 3
        administrator.active = false
        await administrator.save()
        res.status(401)
        throw new Error("Your account has been deactivated")
      } else {
        administrator.login_attempts = Number(administrator.login_attempts) + 1
        await administrator.save()
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

//@desc get all users for admin
//@route GET /api/users/
//@access Private/Admin
module.exports.fetchAllUser = asyncHandler(async (req, res) => {
  const { user } = req.params.user
  let person_of_interest
  switch (user) {
    case "administrator":
      persons = await AdministratorModel.find({}).select("-password,-_id")
      break
    case "student":
      persons = await StudentModel.find({}).select("-password,-_id")
      break
    case "lecturer":
      persons = await AdministratorModel.find({}).select("-password,-_id")
      break
    default:
      person_of_interest = []
  }
  res.status(200).json(person_of_interest)
})

//@desc get all users for admin
//@route GET /api/users/
//@access Private/Admin
module.exports.fetchOneAdministrator = asyncHandler(async (req, res) => {
  const { id } = req.params.id
  const administrator = await User.findOne({ _id: id }).select("-password")
  if (administrator) {
    res.status(200).json(administrator)
  } else {
    res.status(404)
    throw new Error("Administrator doesn't exist")
  }
})

module.exports.changePassword = asyncHandler(async (req, res) => {
  let { email, password, new_password } = req.body

  const administrator = await AdministratorModel.findOne({ email })

  if (administrator && (await matchPassword(password, administrator.password))) {
    new_password = await hashPassword(new_password)
    administrator.password = new_password
    await administrator.save()
    res.status(201).json({ message: "password successfully changed" })
  } else {
    res.status(401)
    throw new Error("invalid credentials")
  }
})

module.exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const administrator = await AdministratorModel.findOne({ email }).select("email,password")

  if (administrator) {
    //send recovery link to found email
    let reset_password = await ResetPasswordModel.findOne({
      user_id: administrator.id,
      email: administrator.email,
    })
    if (reset_password) await reset_password.deleteOne()
    const reset_token = crypto.randomBytes(32).toString("hex")
    const hash_token = await hashPassword(reset_token) //use hash password util
    await new ResetPasswordModel({
      user_id: administrator.id,
      token: hash_token,
      email: administrator.email,
      createdAt: Date.now(),
    }).save()
    const link = `${process.env.CLIENT_URL}/api/administrator/password/reset?reset_token=${reset_token}&reset_id=${administrator.id}`
    const subject = "QR Code Attendance Password Reset"
    let email_sent = await sendEmail(administrator.email, subject, link)
    if (email_sent) {
      res.status(200).json({
        message: "Check your email inbox, a password recovery link has been sent to you",
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
  let administrator = await AdministratorModel.findById(reset_id)
  if (administrator) {
    let reset_password = await ResetPasswordModel.findOne({
      user_id: reset_id,
      email: administrator.email,
    })
    if (reset_password && (await matchPassword(reset_token, reset_password.token))) {
      let password = await generateRandomPassword(12)
      let hashed_password = await hashPassword(password)
      administrator.password = hashed_password
      await administrator.save()
      let emailSent = await sendEmail(
        administrator.email,
        "AGIB Payment New Password",
        `Your new password is ${password}`
      )
      if (emailSent) {
        await reset_password.deleteOne()
        res.status(201).json({ message: "Your new password has been sent to your email inbox" })
      }
    } else {
      res.status(404)
      throw new Error("This link doesn't exist or it's no more valid")
    }
  } else {
    res.status(404)
    throw new Error("Adminstrator not found")
  }
})
