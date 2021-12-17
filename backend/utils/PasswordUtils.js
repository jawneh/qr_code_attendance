const bcrypt = require("bcryptjs")

module.exports.generateRandomPassword = async length => {
  try {
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$&"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
  } catch (error) {
    throw new Error("password system failed")
  }
}

module.exports.matchPassword = async (entered_password, password) => {
  try {
    return await bcrypt.compare(entered_password, password)
  } catch (e) {
    throw new Error("invalid email or password")
  }
}

module.exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
  return await bcrypt.hash(password, salt)
}
