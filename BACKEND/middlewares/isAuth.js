import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // Get token from cookie only
    const token = req.cookies.token;
    
    if (!token) {
      console.log("❌ No token found in cookies");
      console.log("Cookies present:", req.cookies);
      return res.status(401).json({ 
        message: "Unauthorized: Token missing",
        debug: {
          hasCookies: !!req.cookies
        }
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId to request object
    req.userId = decoded.userId;
    
    console.log("✅ User authenticated successfully. User ID:", req.userId);
    next();
    
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
    return res.status(401).json({ message: "Unauthorized: Authentication failed" });
  }
};

// ✅ DEFAULT EXPORT - This is what your routes expect
export default isAuth;