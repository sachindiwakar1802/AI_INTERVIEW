import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ cookie only
    if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify JWT
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuth;