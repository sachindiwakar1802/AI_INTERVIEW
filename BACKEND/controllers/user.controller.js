import User from "../models/user.model.js";

// @desc    Get current user
// @route   GET /api/user/current-user
export const getCurrentUser = async (req, res) => {
  try {
    // req.userId comes from isAuth middleware
    const userId = req.userId;
    
    if (!userId) {
      console.log("❌ No userId in request");
      return res.status(401).json({ message: "Not authenticated" });
    }

    console.log("🔍 Finding user with ID:", userId);
    
    const user = await User.findById(userId).select("-password"); // Exclude password
    
    if (!user) {
      console.log("❌ User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.email);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits || 0,
      profilePic: user.profilePic || null,
      createdAt: user.createdAt
    });
    
  } catch (error) {
    console.error("❌ Error in getCurrentUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user credits
// @route   PUT /api/user/update-credits
export const updateCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const { credits } = req.body;
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { credits },
      { new: true }
    ).select("-password");
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits
    });
    
  } catch (error) {
    console.error("❌ Error updating credits:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user by ID
// @route   GET /api/user/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      profilePic: user.profilePic
    });
    
  } catch (error) {
    console.error("❌ Error getting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};