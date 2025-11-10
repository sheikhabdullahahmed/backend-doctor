const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  // status: { type: String, default: "active" },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' }
}, { timestamps: true });

//  Prevent "OverwriteModelError"
const Patient = mongoose.models.Patient || mongoose.model('Patient', userSchema);

module.exports = Patient;
