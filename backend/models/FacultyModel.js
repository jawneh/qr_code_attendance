const moongoose = require("mongoose")
const { Schema } = moongoose

const FacultytSchema = new Schema(
  {
    name: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("faculty", FacultytSchema)
