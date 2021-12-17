const moongoose = require("mongoose")
const { Schema } = moongoose

const CourseSchema = new Schema(
  {
    course_code: { type: String, required: true },
    course_title: { type: String, required: true },
    course_unit: { type: Number, required: true },
    lecturer: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("courses", CourseSchema)
