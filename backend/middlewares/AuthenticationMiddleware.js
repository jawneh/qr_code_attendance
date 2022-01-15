const asyncHandler = require("express-async-handler")
const { verifyToken } = require("../utils/TokenUtils")
const UserModel = require("../models/UsersModel")

module.exports.authBearerToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401)
    throw new Error("Invalid or no Authorization header")
  } else {
    const [authType, token] = authorization.trim().split(" ")
    if (authType !== "Bearer") {
      res.status(422)
      throw new Error("A Bearer is expected")
    } else if (!token.trim()) {
      res.status(422)
      throw new Error("A Bearer token value is expected")
    } else {
      token.trim()
      const decoded_token = await verifyToken(token)
      req.decoded_token = decoded_token
      next()
    }
  }
})

module.exports.authAdminAccess = asyncHandler(async (req, res, next) => {
  const id = req.decoded_token.id
  const user = await UserModel.findById(id)
  if (user && user.is_admin) {
    next()
  } else {
    res.status(422)
    throw new Error("access not allowed")
  }
})

module.exports.authLecturerAccess = asyncHandler(async (req, res, next) => {
  const id = req.decoded_token.id
  const user = await UserModel.findById(id)
  if (user && user.is_lecturer) {
    next()
  } else {
    res.status(422)
    throw new Error("access not allowed")
  }
})

module.exports.authStudentAccess = asyncHandler(async (req, res, next) => {
  const id = req.decoded_token.id
  const user = await UserModel.findById(id)
  if (user && user.is_student) {
    next()
  } else {
    res.status(422)
    throw new Error("access not allowed")
  }
})
