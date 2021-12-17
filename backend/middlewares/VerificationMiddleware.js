const asyncHandler = require("express-async-handler")
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
