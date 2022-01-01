const moongoose = require("mongoose")
const { Schema } = moongoose

const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    faculty_id: { type: Schema.Types.ObjectId, ref: "faculties", required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("departments", DepartmentSchema)
