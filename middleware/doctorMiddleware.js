const  jwt = require  ("jsonwebtoken");
const  authModel = require ("../Module/Patient");
const doctorModel = require("../Module/doctorModel");

// Auth middleware
const isAuth = async (req, res, next) => {
 try {
  const token =  req.cookies?.token// Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await doctorModel.findById(decoded.id).select("-password");
    req.user = user?._id; 
    next();
  } catch (err) {
    console.log(err.stack)
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
module.exports =  isAuth;