import genToken from "../config/token.js";
import User from "../models/user.model.js";

// ======================
// Google Authentication
// ======================
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    const token = genToken(user._id);

    // ✅ IMPORTANT FOR RENDER (cross-domain cookie)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",   // MUST be capital N
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: "Google authentication failed",
      error: error.message
    });
  }
};


// ======================
// Logout
// ======================
export const logOut = async (req, res) => {
  try {
   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      error: error.message
    });
  }
};