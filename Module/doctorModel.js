const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    specialization: String,
    phone: String,
    // status: { type: String, default: "pending" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor", //  role fix so we know this is a doctor
    },
  },
  { timestamps: true }
);

// doctorSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model("Doctor", doctorSchema);
