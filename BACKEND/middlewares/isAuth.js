// import jwt from "jsonwebtoken";

// const isAuth = (req, res, next) => {
//   try {
//     const token = req.cookies.token; // ✅ cookie only
//     if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify JWT
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// export default isAuth;

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

    // Check if we're in production (Render)
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set cookie with proper settings for production
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,  // true on Render (HTTPS), false on localhost
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site on Render
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: isProduction ? '.onrender.com' : undefined // Allow across subdomains
    });

    console.log(`✅ User logged in: ${email} (${isProduction ? 'production' : 'development'})`);

    // Return user data (without token)
    return res.status(200).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits || 0
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ message: `Google auth error: ${error.message}` });
  }
};

// Email/Password Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = genToken(user._id);

    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: isProduction ? '.onrender.com' : undefined
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits || 0
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Email/Password Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = genToken(user._id);

    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: isProduction ? '.onrender.com' : undefined
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits || 0
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
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
      maxAge: 0,
      domain: isProduction ? '.onrender.com' : undefined
    });
    
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};