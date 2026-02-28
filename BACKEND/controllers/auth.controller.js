import genToken from "../config/token.js";
import User from "../models/user.model.js";

// Google Auth
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    const token = genToken(user._id);

    // Set cookie properly for dev
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // false for localhost
      sameSite: "lax", // works in localhost
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Google auth error: ${error.message}` });
  }
};

// Logout
export const logOut = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0, // clear cookie
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};