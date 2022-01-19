const crypto = require("crypto")
const asyncHandler = require("express-async-handler")
const UserModel = require("../models/UsersModel")
const CourseModel = require("../models/CourseModel")
const ResetPasswordModel = require("../models/PasswordResetModel")
const { sendEmail } = require("../utils/EmailUtils")
const { generateRandomPassword, hashPassword, matchPassword } = require("../utils/PasswordUtils")
const { generateToken } = require("../utils/TokenUtils")

module.exports.registerUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    university_id,
    email,
    faculty_id,
    department_id,
    mac_address,
    password,
    phone,
  } = req.body
  // let generated_password = await generateRandomPassword(10)
  const hash_password = await hashPassword(password)
  let user = await UserModel.create({
    email,
    department_id,
    faculty_id,
    first_name,
    last_name,
    password: hash_password,
    phone,
    mac_address,
    university_id,
  })
  if (user) {
    // await sendEmail(email, "QRCode Attendance", `Your password is ${generated_password}`)
    console.log("send email")
    res.status(201).json("Account registered, kindly verify your email to activate account")
  } else {
    res.status(400)
    throw new Error("Failed to create or get created user")
  }
})

// @Desc Auth User & get an access Token
// @Route POST /api/users/login
// @Access Public
module.exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  let test = await hashPassword(password)

  const user = await UserModel.findOne({ email }) //find record of adminstrator

  if (user && (await matchPassword(password, user.password))) {
    if (user.active) {
      user.login_attempts = 0 //reset login attempts to 0
      await user.save()
      const token = await generateToken(user.id, user.email)

      res.status(200).json({
        user_id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
        is_student: user.is_student,
        is_lecturer: user.is_lecturer,
        token,
      })
    } else {
      res.status(401)
      throw new Error("Account not active")
    }
  } else if (user && !(await matchPassword(password, user.password))) {
    if (user.active) {
      if (user.login_attempts >= 4) {
        user.login_attempts = 5
        user.active = false
        await user.save()
        res.status(401)
        throw new Error("Your account has been deactivated")
      } else {
        user.login_attempts = Number(user.login_attempts) + 1
        await user.save()
        res.status(401)
        throw new Error("Invalid password")
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

module.exports.addCourse = asyncHandler(async (req, res) => {
  const { course_id, user_id } = req.body
  await UserModel.updateOne({ _id: user_id }, { $push: { courses: course_id } })
  res.status(201).json("course added successfully")
})

//@desc get all users for admin
//@route GET /api/users/
//@access Private/Admin
module.exports.fetchUsers = asyncHandler(async (req, res) => {
  // const {} = req.query
  users = await UserModel.find({}).select("-password").populate(["department_id", "faculty_id"])
  res.status(200).json(users)
})

//@desc get all users for admin
//@route GET /api/users/
//@access Private/Admin
module.exports.fetchUser = asyncHandler(async (req, res) => {
  const { id } = req.params.id
  const user = await User.findOne({ _id: id })
    .select("-password")
    .populate(["faculties", "courses", "departments"])
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error("User doesn't exist")
  }
})

//@desc get all users for admin
//@route GET /api/student/
//@access Private/Admin
module.exports.fetchStudent = asyncHandler(async (req, res) => {
  const { id } = req.params.id
  const student = await User.findOne({ _id: id })
    .select("-password")
    .populate(["faculties", "courses", "departments"])
  if (stuent) {
    res.status(200).json(student)
  } else {
    res.status(404)
    throw new Error("Student doesn't exist")
  }
})

//@desc get all users for admin
//@route GET /api/users/
//@access Private/Admin
module.exports.fetchStudents = asyncHandler(async (req, res) => {
  students = await UserModel.find({ is_student: true, is_lecturer: false, is_admin: false })
    .select("-password")
    .populate(["department_id", "faculty_id"])
  res.status(200).json(stuents)
})

module.exports.changePassword = asyncHandler(async (req, res) => {
  let { email, password, new_password } = req.body

  const administrator = await UserModel.findOne({ email })

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
  const administrator = await UserModel.findOne({ email }).select("email,password")

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
  let administrator = await UserModel.findById(reset_id)
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
