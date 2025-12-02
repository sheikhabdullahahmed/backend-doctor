const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../Module/Patient"); 
const Doctor = require("../Module/doctorModel");
const requireAuth = require("../middleware/authmiddleware");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Name, email, phone and password are required" });
    }

    const existing = await Patient.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    // let role = "patient";

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await Patient.create({
      name,
      email,
      phone,
      password: passwordHash,
      role,
    });

    const safeUser = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };

    res.status(201).json({ message: "User created", user: safeUser });
  } catch (err) {
    console.error(err);
    if (err.code === 11000)
      return res.status(400).json({ message: "Email already exists" });
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // }
    const isInDevelopment = process.env.NODE_ENV === 'production';

    // --- Patient / Doctor Login ---
    let user = await Patient.findOne({ email });
    if (!user) user = await Doctor.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


 res.cookie("token", token, {
  httpOnly: false, 
  secure:!isInDevelopment,
  sameSite: isInDevelopment ? 'lax' : 'none',
  maxAge: 1000 * 60 * 60 * 24, 
});


// httpOnly: true,
//   // secure: false, 
//   secure: true,
//   // 🔒 hamesha true rakho production ke liye
//   sameSite: "None", // ✅ cross-site ke liye force None
//   maxAge: 1000 * 60 * 60 * 24,

    res.json({
      message: "Login successful",
      // token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "doctor",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}); 

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const profile = await Patient.findById(req?.user);
    res.json({ profile });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});


// Clear cookie API
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,   // true if you're using HTTPS
    sameSite: "none" // if frontend is on a different domain
  });

  res.status(200).json({ message: "Cookie cleared successfully" });
});





// pateitn case record 
router.get("/my-records/:patientId",  async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await CaseRecord.find({ patientId })
      .populate("doctorId", "name specialization");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
});





module.exports = router;
