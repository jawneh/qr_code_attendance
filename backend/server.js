/***
 * BACKEND ENTRY
 */
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const path = require("path")
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
/**
 *  @DBs
 */
const connectMongoDB = require("./database/MongoConfig")

/** ROUTES and it's Midwares : REQUIRED */
const UsersRoutes = require("./routes/UsersRoutes")
const FacultyRoutes = require("./routes/FacultyRoutes")
const DeparmtentRoutes = require("./routes/DepartmentRoutes")
const AttendanceRoute = require("./routes/AttendanceRoute")
const CourseRoutes = require("./routes/CourseRoutes")
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

app.use("/attendance", AttendanceRoute)
app.use("/course", CourseRoutes)
app.use("/department", DeparmtentRoutes)
app.use("/faculty", FacultyRoutes)
app.use("/user", UsersRoutes)

// const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, "../frontend/build")))
  app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../frontend/build/index.html")))
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ qrcode: "Welcome to the QR Code Attendace System!" })
  })
  app.get("/favicon.ico", (req, res) => res.status(204))
}
app.use(notFound) //not found route hanlder
app.use(errorHandler) //handles all errors and error response

app.listen(process.env.PORT || 5100, () => {
  console.log(
    `QRCode attendance system running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .green.bold
  )
})
