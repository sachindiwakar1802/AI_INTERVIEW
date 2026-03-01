// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/connectDb.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// // routers
// import authRouter from "./routes/auth.route.js";
// import userRouter from "./routes/user.route.js";
// import interviewRouter from "./routes/interview.route.js";
// import paymentRouter from "./routes/payment.route.js";

// dotenv.config();

// // **1️⃣ Define Express app BEFORE using it**
// const app = express();

// // 2️⃣ Middleware
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://wesehi.onrender.com"
//   ],
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// // 3️⃣ Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/interview", interviewRouter);
// app.use("/api/payment", paymentRouter);

// // 4️⃣ Start server
// const PORT = process.env.PORT || 6000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     connectDb();
// });


import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// routers
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://wesehi.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["set-cookie"]
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
});