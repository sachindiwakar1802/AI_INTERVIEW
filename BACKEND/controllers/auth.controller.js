import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Google Auth
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ 
        name, 
        email,
        credits: 100 // Default credits for new users
      });
    }

    // Generate token
    const token = genToken(user._id);

    // Check if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set cookie with proper settings for production
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,  // true on Render (HTTPS), false on localhost
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site on Render
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    console.log(`✅ User logged in: ${email} (${isProduction ? 'production' : 'development'})`);

    // Return user data and token
    return res.status(200).json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits || 0
      },
      token // Send token for frontend to store as backup
    });
  } catch (error) {
    console.error("❌ Google auth error:", error);
    return res.status(500).json({ message: `Google auth error: ${error.message}` });
  }
};

// Email/Password Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
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
      password: hashedPassword,
      credits: 100 // Default credits
    });

    // Generate token
    const token = genToken(user._id);

    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits || 0
      },
      token
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Email/Password Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user has password (might be Google auth user)
    if (!user.password) {
      return res.status(401).json({ message: "Please login with Google" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = genToken(user._id);

    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits || 0
      },
      token
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
export const logOut = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Clear cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 0,
      path: '/',
    });
    
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};

// Check auth status (for debugging)
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        message: "Not authenticated",
        cookies: req.cookies,
        hasAuthHeader: !!req.headers.authorization
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    res.json({
      message: "Authenticated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};