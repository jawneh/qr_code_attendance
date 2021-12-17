const mongoose = require("mongoose")

const ResetPasswordModel = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // this is the expiry time in seconds
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("reset_passwords", ResetPasswordModel)
