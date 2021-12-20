// "use strict"
const nodemailer = require("nodemailer")

module.exports.sendEmail = async (address, subject, msg) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports eg:587
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // send mail with defined transport object
    await transporter.sendMail({
      from: "QR Code Attendance '<test@test.com>'", // sender'S address
      to: address, // list of receivers ["",""]
      subject, // Subject line
      text: msg, // plain text body
      html: `<div><h4>${msg}</h4> <br/> <p>Kindly ignore this email if you didn't request for it</p></div>`, // html body
    })

    return true
  } catch (error) {
    throw new Error(`failed to send email ${subject} to ${address}`)
  }
}
