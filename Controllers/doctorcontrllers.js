const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Doctor = require("../Module/doctorModel");
const isAuth = require("../middleware/doctorMiddleware");
const doctorModel = require("../Module/doctorModel");
const router = express.Router();
const CaseRecord = require("../Module/caseRecord")



// router.post("/doctors/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login request body:", req.body);

//     const doctor = await Doctor.findOne({ email });

//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });
//     // if (doctor.status !== "approved") return res.status(403).json({ message: "Account not approved yet" });

//     const valid = await bcrypt.compare(password, doctor.password);
//     if (!valid) return res.status(401).json({ message: "Invalid password" });


//    const data =  {
//     email: doctor.email,
//     password: doctor.password
//    };
// //    const data = {
// //   email: doctor.email,
// //   password: doctor.password
// // };



//     const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.json({ message: "Login successful", token, data });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });





router.get("/doctors/profile",isAuth ,async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.user);
    res.json(doctor);
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: err.message });
  }
});




router.put("/doctors/update/:id", isAuth, async (req, res) => {
  try {

    const doctor = await doctorModel.findById(req.user)

    // Update allowed fields only
    const allowedFields = ["name", "email", "phone", "specialization"];
    allowedFields.forEach((field) => {
      if (req.body[field]) doctor[field] = req.body[field];
    });

    // Preserve existing status
    doctor.status = doctor.status;

    const updatedDoctor = await doctor.save();

    res.json({ message: "Profile updated", doctor: updatedDoctor });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});












// case recoed for patient
router.post("/add",  async (req, res) => {
  try {
    const { patientId,  diagnosis, prescription, treatment, notes } = req.body;

    const caseRecord = new CaseRecord({
      patientId,
      // doctorId,
      diagnosis,
      prescription,
      treatment,
      notes,
    });

    await caseRecord.save();
    res.status(201).json({ message: "Case record added successfully", caseRecord });
  } catch (error) {
    res.status(500).json({ message: "Error adding record", error });
  }
});





module.exports = router