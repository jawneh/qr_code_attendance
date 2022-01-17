const QRCode = require("qrcode")
// const fs = require("fs")
// generateQRCode((course_code = "TCS111"))

module.exports.generateQRCode = async (qr_code = {}) => {
  try {
    const attendance = JSON.stringify(qr_code)
    const attendance_qr_code = await QRCode.toDataURL(attendance)
    return attendance_qr_code
  } catch (error) {
    console.error(error.stack)
    throw new Error("Failed to generate QRCode")
  }
}
