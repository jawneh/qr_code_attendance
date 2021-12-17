const moment = require("moment")
const fs = require("fs")
const QRCode = require("qrcode")
generateQRCode((course_code = "TCS111"))

async function generateQRCode(course_code = "") {
  try {
    const start_time = moment() //class start time
    const end_time = moment() //class end time
    const attendance = JSON.stringify({ start_time, end_time, course_code })
    const attendance_qr_code = await QRCode.toDataURL(attendance)
    fs.writeFileSync("./qr.html", `<img src="${attendance_qr_code}">`)
    // fs.writeFileSync("./qr.html", `<p>${attendance_qr_code}</p>`)
    console.log("wrote to ./qr.html")
  } catch (error) {
    console.error(error.stack)
  }
}
