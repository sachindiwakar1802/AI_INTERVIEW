import User from "../models/user.model.js";
// Get currently logged-in user
export const getCurrentUser = async (req, res) => {
  try {
    // 🔹 userId comes from isAuth middleware
    // (It was extracted from the verified JWT token)
    const userId = req.userId

    // 🔹 Find user in MongoDB using the ID
    // .select("-password") removes password field from response
    const user = await User.findById(userId).select("-password")

    // 🔹 If no user found in database
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // 🔹 If user exists, send user data to frontend
    return res.status(200).json(user)

  } catch (error) {
    // 🔹 If something goes wrong (server/database error)
    return res.status(500).json({
      message: "Failed to get current user. Try again.",
      error: error.message
    })
  }
}

/*
summary of the code
Frontend → sends request
Middleware → verifies token
Controller → finds user in DB
Response → sends user data
*/