const QRCode = require("qrcode")
// const fs = require("fs")
// generateQRCode((course_code = "TCS111"))

module.exports.generateQRCode = async (qr_code = {}) => {
  try {
    const attendance = JSON.stringify(qr_code)
    const attendance_qr_code = await QRCode.toDataURL(attendance)
    return attendance_qr_code
    // fs.writeFileSync("./qr.html", `<img src="${attendance_qr_code}">`)
    // fs.writeFileSync("./qr.html", `<p>${attendance_qr_code}</p>`)
    console.log("wrote to ./qr.html")
  } catch (error) {
    console.error(error.stack)
    throw new Error("Failed to generate QRCode")
  }
}
