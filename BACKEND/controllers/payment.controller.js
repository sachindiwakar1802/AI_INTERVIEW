import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }

    const { planId, amount, credits } = req.body;

    if (!amount || !credits || !planId) {
      return res.status(400).json({ message: "Invalid plan data" });
    }

    const options = {
      amount, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    let order;
    try {
      order = await razorpay.orders.create(options);
    } catch (err) {
      console.error("Razorpay order creation error:", err);
      return res.status(500).json({ message: "Failed to create Razorpay order" });
    }

    // Save order in DB
    const payment = await Payment.create({
      userId: req.userId,
      planId,
      amount,
      credits,
      razorpayOrderId: order.id,
      status: "created",
    });

    return res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });

  } catch (error) {
    console.error("Create order failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    // Generate signature to verify payment
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    if (payment.status === "paid") return res.json({ message: "Payment already processed" });

    // Mark as paid
    payment.status = "paid";
    payment.razorpayPaymentId = razorpay_payment_id;
    await payment.save();

    // Add credits to user
    const updatedUser = await User.findByIdAndUpdate(
      payment.userId,
      { $inc: { credits: payment.credits } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Payment verified and credits added",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};