const moongoose = require("mongoose")
const { Schema } = moongoose

const FacultytSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    departments: [{ type: Schema.Types.ObjectId, ref: "departments" }],
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("faculties", FacultytSchema)
