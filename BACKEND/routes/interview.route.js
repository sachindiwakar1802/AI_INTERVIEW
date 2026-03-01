import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { analyzeResume, finishInterview, generateQuestion, getInterviewReport, getMyInterviews, submitAnswer } from "../controllers/interview.controller.js"
import multer from "multer";

const interviewRouter = express.Router()

// FIXED: Add error handling directly in the route
interviewRouter.post("/resume", isAuth, (req, res, next) => {
  console.log("📦 [1] Multer middleware starting...");
  console.log("📦 Content-Type:", req.headers['content-type']);
  
  // Use multer directly with error handling
  const multerUpload = upload.single("resume");
  
  multerUpload(req, res, function(err) {
    if (err) {
      console.log("❌ [2] Multer error detected!");
      console.log("Error name:", err.name);
      console.log("Error message:", err.message);
      console.log("Error stack:", err.stack);
      
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
          message: `Upload error: ${err.message}`,
          code: err.code 
        });
      }
      
      return res.status(500).json({ 
        message: "Upload failed", 
        error: err.message 
      });
    }
    
    console.log("✅ [3] Multer success!");
    console.log("req.file exists:", !!req.file);
    
    if (req.file) {
      console.log("File details:");
      console.log("  - originalname:", req.file.originalname);
      console.log("  - size:", req.file.size);
      console.log("  - mimetype:", req.file.mimetype);
      console.log("  - has buffer:", !!req.file.buffer);
      console.log("  - has path:", !!req.file.path);
    }
    
    // Call the controller
    console.log("📤 [4] Calling analyzeResume controller...");
    analyzeResume(req, res).catch(error => {
      console.log("❌ [5] Controller error:", error);
      res.status(500).json({ message: error.message });
    });
  });
});

// Other routes remain the same
interviewRouter.post("/generate-questions", isAuth, generateQuestion)
interviewRouter.post("/submit-answer", isAuth, submitAnswer)
interviewRouter.post("/finish", isAuth, finishInterview)
interviewRouter.get("/get-interview", isAuth, getMyInterviews)
interviewRouter.get("/report/:id", isAuth, getInterviewReport)

export default interviewRouter