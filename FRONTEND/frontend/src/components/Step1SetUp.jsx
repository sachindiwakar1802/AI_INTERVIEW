import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import axiosInstance from '../config/axios'; // Import configured axios
import AuthModel from './AuthModel';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const handleUploadResume = async (file) => {
        if (!file || analyzing) return;
        
        setAnalyzing(true);
        console.log("Uploading resume:", file.name);
        console.log("File size:", (file.size / 1024 / 1024).toFixed(2), "MB");

        const formdata = new FormData();
        formdata.append("resume", file);

        try {
            const result = await axiosInstance.post('/api/interview/resume', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 60000 // 60 second timeout for large files
            });

            console.log("Analysis result:", result.data);

            if (result.data) {
                setRole(result.data.role || "");
                setExperience(result.data.experience || "");
                setProjects(result.data.projects || []);
                setSkills(result.data.skills || []);
                setResumeText(result.data.resumeText || "");
                setAnalysisDone(true);
                
                // Show success message
                alert("Resume analyzed successfully!");
            }
            setAnalyzing(false);

        } catch (error) {
            console.error("Upload error:", error);
            
            // Handle different error types
            if (error.code === 'ECONNABORTED') {
                alert("Request timeout. Please try again with a smaller file.");
            } else if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
                setShowAuth(true);
            } else if (error.response?.status === 413) {
                alert("File too large. Maximum size is 10MB.");
            } else if (error.response?.status === 415) {
                alert("Invalid file type. Please upload a PDF file.");
            } else {
                alert(error.response?.data?.message || "Failed to analyze resume. Please try again.");
            }
            
            setAnalyzing(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            if (file.type !== 'application/pdf') {
                alert("Please upload a PDF file only.");
                return;
            }
            
            // Check file size (10MB limit)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                alert("File too large. Maximum size is 10MB.");
                return;
            }
            
            console.log("File selected:", file.name);
            console.log("File size:", (file.size / 1024 / 1024).toFixed(2), "MB");
            
            setResumeFile(file);
            handleUploadResume(file);
        }
    };

    const handleStart = async () => {
        if (!role || !experience) {
            alert("Please fill in all required fields");
            return;
        }
        
        setLoading(true);
        try {
            const result = await axiosInstance.post('/api/interview/generate-questions', { 
                role: role.trim(), 
                experience: experience.trim(), 
                mode, 
                resumeText: resumeText || "None", 
                projects: projects || [], 
                skills: skills || [] 
            }, {
                timeout: 30000 // 30 second timeout
            });
            
            console.log("Questions generated:", result.data);
            
            // Update user credits in Redux
            if (userData && result.data.creditsLeft !== undefined) {
                dispatch(setUserData({ 
                    ...userData, 
                    credits: result.data.creditsLeft 
                }));
                
                // Update localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    user.credits = result.data.creditsLeft;
                    localStorage.setItem('user', JSON.stringify(user));
                }
            }
            
            setLoading(false);
            onStart(result.data);
            
        } catch (error) {
            console.error("Start error:", error);
            
            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
                setShowAuth(true);
            } else if (error.response?.status === 400) {
                alert(error.response.data?.message || "Invalid input. Please check your details.");
            } else if (error.response?.status === 402) {
                alert("Insufficient credits. Please buy more credits.");
            } else {
                alert("Failed to start interview. Please try again.");
            }
            
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8'
        >
            <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>
                {/* Left Section - Info */}
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-12 flex flex-col justify-center'
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        Start Your AI Interview
                    </h2>

                    <p className="text-gray-600 mb-8 text-sm md:text-base">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-4'>
                        {[
                            {
                                icon: <FaUserTie className="text-green-600 text-xl" />,
                                text: "Choose Role & Experience",
                            },
                            {
                                icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                                text: "Smart Voice Interview",
                            },
                            {
                                icon: <FaChartLine className="text-green-600 text-xl" />,
                                text: "Performance Analytics",
                            },
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.15 }}
                                className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm'
                            >
                                {item.icon}
                                <span className='text-gray-700 font-medium text-sm md:text-base'>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Section - Form */}
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-8 md:p-12 bg-white"
                >
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
                        Interview Setup
                    </h2>

                    <div className='space-y-5'>
                        {/* Role Input */}
                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-gray-400' />
                            <input 
                                type='text' 
                                placeholder='Enter role (e.g., Frontend Developer)'
                                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-sm md:text-base'
                                onChange={(e) => setRole(e.target.value)} 
                                value={role}
                                required
                            />
                        </div>

                        {/* Experience Input */}
                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-gray-400' />
                            <input 
                                type='text' 
                                placeholder='Experience (e.g., 2 years, Fresher)'
                                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-sm md:text-base'
                                onChange={(e) => setExperience(e.target.value)} 
                                value={experience}
                                required
                            />
                        </div>

                        {/* Mode Select */}
                        <select 
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-sm md:text-base'
                        >
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* Resume Upload Section */}
                        {!analysisDone && (
                            <div className='border-2 border-dashed border-gray-300 rounded-xl p-6 text-center'>
                                <FaFileUpload className='text-4xl mx-auto text-green-600 mb-3' />

                                <input 
                                    type="file"
                                    accept=".pdf"
                                    id="resumeUpload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={analyzing} 
                                />
                                
                                <label 
                                    htmlFor="resumeUpload"
                                    className={`block w-full cursor-pointer ${analyzing ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                                        <p className='text-gray-600 font-medium text-sm md:text-base'>
                                            {resumeFile ? resumeFile.name : "📄 Click to upload resume (Optional)"}
                                        </p>
                                        {resumeFile && (
                                            <p className='text-xs text-gray-500 mt-1'>
                                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        )}
                                        {analyzing && (
                                            <div className="mt-3">
                                                <p className="text-green-600 text-sm">Analyzing resume...</p>
                                                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-green-600 h-1.5 rounded-full animate-pulse w-full"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        )}

                        {/* Analysis Results */}
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4'
                            >
                                <h3 className='text-lg font-semibold text-gray-800'>
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='font-medium text-gray-700 mb-1 text-sm'>Projects:</p>
                                        <ul className='list-disc list-inside text-gray-600 space-y-1 text-sm'>
                                            {projects.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='font-medium text-gray-700 mb-1 text-sm'>Skills:</p>
                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs'>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {projects.length === 0 && skills.length === 0 && (
                                    <p className="text-gray-500 text-sm">No projects or skills found in resume</p>
                                )}
                            </motion.div>
                        )}

                        {/* Start Button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={!loading && role && experience ? { scale: 1.03 } : {}}
                            whileTap={!loading && role && experience ? { scale: 0.98 } : {}}
                            className={`w-full py-3 rounded-full text-base md:text-lg font-semibold transition duration-300 shadow-md
                                ${(!role || !experience || loading) 
                                    ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Starting...
                                </span>
                            ) : "Start Interview"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Auth Modal */}
            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </motion.div>
    );
}

export default Step1SetUp;