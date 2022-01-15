const moongoose = require("mongoose")
const { Schema } = moongoose

const CourseSchema = new Schema(
  {
    code: { type: String, required: true },
    department_id: { type: Schema.Types.ObjectId, ref: "departments" },
    faculty_id: { type: Schema.Types.ObjectId, ref: "faculties" },
    name: { type: String, required: true },
    lecturer_id: { type: Schema.Types.ObjectId, ref: "users" },
    unit: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("courses", CourseSchema)
