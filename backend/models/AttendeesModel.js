const moongoose = require("mongoose")
const { Schema } = moongoose

const AttendeeSchema = new Schema(
  {
    attendance_id: { type: Schema.Types.ObjectId, ref: "attendances" },
    attendee_id: { type: Schema.Types.ObjectId, ref: "students" },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("attendees", AttendeeSchema)
