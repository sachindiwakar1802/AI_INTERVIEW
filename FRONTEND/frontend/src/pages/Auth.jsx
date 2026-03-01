// // import React from 'react';
// // import { BsRobot } from "react-icons/bs";
// // import { IoSparkles } from "react-icons/io5";
// // import { motion } from "motion/react";
// // import { FcGoogle } from "react-icons/fc";
// // import { signInWithPopup } from 'firebase/auth';
// // import { auth, provider } from '../utils/firebase';
// // import axios from 'axios';
// // import { ServerUrl } from '../App';
// // import { useDispatch } from 'react-redux';
// // import { setUserData } from '../redux/userSlice';

// // function Auth({ isModel = false }) {
// //   const dispatch = useDispatch();

// //   const handleGoogleAuth = async () => {
// //     try {
// //       // Sign in with Firebase
// //       const response = await signInWithPopup(auth, provider);
// //       const user = response.user;
// //       const name = user.displayName;
// //       const email = user.email;

// //       // Send to your backend
// //       const result = await axios.post(
// //         `${ServerUrl}/api/auth/google`,
// //         { name, email },
// //         { withCredentials: true } // ✅ send cookie
// //       );

// //       // Update Redux store
// //       dispatch(setUserData(result.data));

// //     } catch (error) {
// //       console.error("Google Auth Error:", error.response?.data || error.message);
// //       dispatch(setUserData(null));
// //     }
// //   };

// //   return (
// //     <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
// //       <motion.div
// //         initial={{ opacity: 0, y: -40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 1 }}
// //         className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}
// //       >
// //         <div className='flex items-center justify-center gap-3 mb-6'>
// //           <div className='bg-black text-white p-2 rounded-lg'>
// //             <BsRobot size={18} />
// //           </div>
// //           <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
// //         </div>

// //         <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
// //           Continue with
// //           <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
// //             <IoSparkles size={16} /> AI Smart Interview
// //           </span>
// //         </h1>

// //         <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
// //           Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
// //         </p>

// //         <motion.button
// //           onClick={handleGoogleAuth}
// //           whileHover={{ opacity: 0.9, scale: 1.03 }}
// //           whileTap={{ opacity: 1, scale: 0.98 }}
// //           className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md'
// //         >
// //           <FcGoogle size={20} /> Continue with Google
// //         </motion.button>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default Auth;


// import React from 'react';
// import { BsRobot } from "react-icons/bs";
// import { IoSparkles } from "react-icons/io5";
// import { motion } from "motion/react";
// import { FcGoogle } from "react-icons/fc";
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../utils/firebase';
// import axios from 'axios';
// import { ServerUrl } from '../App';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';

// function Auth({ isModel = false }) {
//   const dispatch = useDispatch();

//   const handleGoogleAuth = async () => {
//     try {
//       // Sign in with Firebase
//       const response = await signInWithPopup(auth, provider);
//       const user = response.user;
//       const name = user.displayName;
//       const email = user.email;

//       console.log("Firebase user:", { name, email });

//       // Send to your backend
//       const result = await axios.post(
//         `${ServerUrl}/api/auth/google`,
//         { name, email },
//         { withCredentials: true }
//       );

//       console.log("Backend response:", result.data);

//       // ✅ FIXED: Dispatch the user data, not the whole response
//       if (result.data.user) {
//         dispatch(setUserData(result.data.user));
        
//         // Also store in localStorage as backup
//         localStorage.setItem('user', JSON.stringify(result.data.user));
//       }
      
//       if (result.data.token) {
//         localStorage.setItem('token', result.data.token);
//       }

//     } catch (error) {
//       console.error("Google Auth Error:", error.response?.data || error.message);
//       dispatch(setUserData(null));
//     }
//   };

//   return (
//     <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}
//       >
//         <div className='flex items-center justify-center gap-3 mb-6'>
//           <div className='bg-black text-white p-2 rounded-lg'>
//             <BsRobot size={18} />
//           </div>
//           <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
//         </div>

//         <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
//           Continue with
//           <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 ml-2'>
//             <IoSparkles size={16} /> AI Smart Interview
//           </span>
//         </h1>

//         <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
//           Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
//         </p>

//         <motion.button
//           onClick={handleGoogleAuth}
//           whileHover={{ opacity: 0.9, scale: 1.03 }}
//           whileTap={{ opacity: 1, scale: 0.98 }}
//           className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition'
//         >
//           <FcGoogle size={20} /> Continue with Google
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

// export default Auth;


import React from 'react';
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false, onClose }) {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      // Sign in with Firebase
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      console.log("✅ Firebase user:", { name, email });

      // Send to your backend
      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        { name, email },
        { withCredentials: true }
      );

      console.log("✅ Backend response:", result.data);

      // Dispatch the user data to Redux
      if (result.data.user) {
        dispatch(setUserData(result.data.user));
        
        // Store in localStorage as backup
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
      
      // Store token in localStorage as backup
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
      }

      // Close modal if onClose prop exists
      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error("❌ Google Auth Error:", error.response?.data || error.message);
      
      // Show user-friendly error message
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`w-full ${isModel ? "max-w-md p-6 md:p-8 rounded-3xl" : "max-w-lg p-8 md:p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}
      >
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={18} />
          </div>
          <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
        </div>

        <h1 className='text-xl md:text-3xl font-semibold text-center leading-snug mb-4'>
          Continue with
          <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 ml-2 mt-2 md:mt-0'>
            <IoSparkles size={16} /> AI Smart Interview
          </span>
        </h1>

        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
          Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition text-sm md:text-base'
        >
          <FcGoogle size={20} /> Continue with Google
        </motion.button>
        
        {/* Optional close button for modal */}
        {isModel && (
          <button 
            onClick={onClose}
            className='mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition'
          >
            Maybe later
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default Auth;