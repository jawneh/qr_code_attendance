const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
/**
 *  @DBs
 */
const connectMongoDB = require("./database/MongoConfig")

/** ROUTES and it's Midwares : REQUIRED */
const { notFound, errorHandler } = require("./middlewares/ErrorMiddleware")

//connect to mongoDB, handles password reset
connectMongoDB()
const app = express() //initializing expressJS instant

/**
 * @Middlewares and @AppSetups
 */

app.use(express.json())
app.use(cors())
app.options("*", cors())
app.use(morgan("dev")) //dev console logging
// app.use(qpowerLogger) //api access logging middleware

/**
 * @Routes
 */

app.get("/", (req, res) => {
  res.status(200).json({ qrcode: "Welcome to the QR Code Attendace System!" })
})
app.use(notFound) //not found route hanlder
app.use(errorHandler) //handles all errors and error response

app.listen(process.env.PORT || 5100, () => {
  console.log(
    `QRCode attendance system running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .green.bold
  )
})
