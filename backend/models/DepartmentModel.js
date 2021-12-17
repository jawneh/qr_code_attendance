const moongoose = require("mongoose")
const { Schema } = moongoose

const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true },
    faculty: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("departments", DepartmentSchema)
