const jwt = require("jsonwebtoken")

module.exports.generateToken = async (id, email) => {
  try {
    return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" })
  } catch (error) {
    console.log(error)
    throw new Error("unable to give access token, kindly try again")
  }
}

module.exports.verifyToken = async token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (error) {
    console.log(error)
    throw new Error("failed to verify access nekot")
  }
}
