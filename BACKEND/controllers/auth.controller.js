// import genToken from "../config/token.js";
// import User from "../models/user.model.js";

// // Google Auth
// export const googleAuth = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({ name, email });
//     }

//     const token = genToken(user._id);

//     // Set cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,   // false for localhost
//       sameSite: "lax", // works in localhost
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Send token in response as well
//     return res.status(200).json({ user, token });
//   } catch (error) {
//     return res.status(500).json({ message: `Google auth error: ${error.message}` });
//   }
// };

// // Logout
// export const logOut = async (req, res) => {
//   try {
//     res.cookie("token", "", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 0, // clear cookie
//     });
//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: `Logout error: ${error.message}` });
//   }
// };

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

    // Determine if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set cookie with proper settings for the environment
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,  // true in production (HTTPS), false in local (HTTP)
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: isProduction ? '.onrender.com' : undefined // Allow subdomains in production
    });

    console.log(`✅ User logged in: ${email} (${isProduction ? 'production' : 'development'})`);

    // Send user data (without sending token in response body for security)
    return res.status(200).json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ message: `Google auth error: ${error.message}` });
  }
};

// Logout
export const logOut = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 0, // clear cookie
      domain: isProduction ? '.onrender.com' : undefined
    });
    
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};