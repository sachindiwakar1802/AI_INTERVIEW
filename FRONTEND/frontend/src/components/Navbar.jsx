// // import React from 'react'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { motion } from "motion/react"
// // import { BsRobot, BsCoin } from "react-icons/bs";
// // import { HiOutlineLogout } from "react-icons/hi";
// // import { FaUserAstronaut } from "react-icons/fa";
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { ServerUrl } from '../App';
// // import { setUserData } from '../redux/userSlice';
// // import AuthModel from './AuthModel';

// // function Navbar() {
// //     const {userData} = useSelector((state)=>state.user)
// //     const [showCreditPopup,setShowCreditPopup] = useState(false)
// //     const [showUserPopup,setShowUserPopup] = useState(false)
// //     const navigate = useNavigate()
// //     const dispatch = useDispatch()
// //     const [showAuth, setShowAuth] = useState(false);

// //     const handleLogout = async () => {
// //         try {
// //             await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
// //             dispatch(setUserData(null))
// //             setShowCreditPopup(false)
// //             setShowUserPopup(false)
// //             navigate("/")
// //         } catch (error) {
// //             console.log(error)
// //         }
// //     }
    
// //     return (
// //         <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
// //             <motion.div 
// //                 initial={{opacity:0 , y:-40}}
// //                 animate={{opacity:1 , y:0}}
// //                 transition={{duration: 0.3}}
// //                 className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'
// //             >
// //                 <div className='flex items-center gap-3 cursor-pointer'>
// //                     <div className='bg-black text-white p-2 rounded-lg'>
// //                         <BsRobot size={18}/>
// //                     </div>
// //                     <h1 className='font-semibold hidden md:block text-lg'>InterviewIQ.AI</h1>
// //                 </div>

// //                 <div className='flex items-center gap-6 relative'>
// //                     <div className='relative'>
// //                         <button 
// //                             onClick={()=>{
// //                                 if(!userData){
// //                                     setShowAuth(true)
// //                                     return;
// //                                 }
// //                                 setShowCreditPopup(!showCreditPopup);
// //                                 setShowUserPopup(false)
// //                             }} 
// //                             className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'
// //                         >
// //                             <BsCoin size={20}/>
// //                             {userData?.credits || 0}
// //                         </button>

// //                         {showCreditPopup && (
// //                             <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
// //                                 <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
// //                                 <button 
// //                                     onClick={()=>navigate("/pricing")} 
// //                                     className='w-full bg-black text-white py-2 rounded-lg text-sm'
// //                                 >
// //                                     Buy more credits
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>

// //                     <div className='relative'>
// //                         <button
// //                             onClick={()=>{
// //                                 if(!userData){
// //                                     setShowAuth(true)
// //                                     return;
// //                                 }
// //                                 setShowUserPopup(!showUserPopup);
// //                                 setShowCreditPopup(false)
// //                             }} 
// //                             className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold'
// //                         >
// //                             {/* ✅ FIXED: Safe way to get first letter */}
// //                             {userData && userData.name ? userData.name.charAt(0).toUpperCase() : <FaUserAstronaut size={16}/>}
// //                         </button>

// //                         {showUserPopup && (
// //                             <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
// //                                 <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
// //                                 <button 
// //                                     onClick={()=>navigate("/history")} 
// //                                     className='w-full text-left text-sm py-2 hover:text-black text-gray-600'
// //                                 >
// //                                     Interview History
// //                                 </button>
// //                                 <button 
// //                                     onClick={handleLogout} 
// //                                     className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'
// //                                 >
// //                                     <HiOutlineLogout size={16}/>
// //                                     Logout
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </motion.div>

// //             {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
// //         </div>
// //     )
// // }

// // export default Navbar



// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { motion } from "motion/react"
// import { BsRobot, BsCoin } from "react-icons/bs";
// import { HiOutlineLogout } from "react-icons/hi";
// import { FaUserAstronaut } from "react-icons/fa";
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ServerUrl } from '../App';
// import { setUserData } from '../redux/userSlice';
// import AuthModel from './AuthModel';

// function Navbar() {
//     const {userData} = useSelector((state)=>state.user)
//     const [showCreditPopup,setShowCreditPopup] = useState(false)
//     const [showUserPopup,setShowUserPopup] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [showAuth, setShowAuth] = useState(false);

//     // Fetch fresh user data when component mounts
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const result = await axios.get(ServerUrl + "/api/user/current-user", { 
//                     withCredentials: true 
//                 });
//                 if (result.data) {
//                     console.log("✅ Fetched user data:", result.data);
//                     dispatch(setUserData(result.data));
//                 }
//             } catch (error) {
//                 console.log("Not logged in or error fetching user");
//             }
//         };
        
//         // Only fetch if we might be logged in (check for token in cookies)
//         fetchUserData();
//     }, [dispatch]);

//     const handleLogout = async () => {
//         try {
//             await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
//             dispatch(setUserData(null))
//             setShowCreditPopup(false)
//             setShowUserPopup(false)
//             navigate("/")
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
//     return (
//         <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
//             <motion.div 
//                 initial={{opacity:0 , y:-40}}
//                 animate={{opacity:1 , y:0}}
//                 transition={{duration: 0.3}}
//                 className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'
//             >
//                 <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
//                     <div className='bg-black text-white p-2 rounded-lg'>
//                         <BsRobot size={18}/>
//                     </div>
//                     <h1 className='font-semibold hidden md:block text-lg'>InterviewIQ.AI</h1>
//                 </div>

//                 <div className='flex items-center gap-6 relative'>
//                     <div className='relative'>
//                         <button 
//                             onClick={()=>{
//                                 if(!userData){
//                                     setShowAuth(true)
//                                     return;
//                                 }
//                                 setShowCreditPopup(!showCreditPopup);
//                                 setShowUserPopup(false)
//                             }} 
//                             className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'
//                         >
//                             <BsCoin size={20}/>
//                             {userData?.credits !== undefined ? userData.credits : 0}
//                         </button>

//                         {showCreditPopup && (
//                             <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
//                                 <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
//                                 <button 
//                                     onClick={()=>navigate("/pricing")} 
//                                     className='w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition'
//                                 >
//                                     Buy more credits
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     <div className='relative'>
//                         <button
//                             onClick={()=>{
//                                 if(!userData){
//                                     setShowAuth(true)
//                                     return;
//                                 }
//                                 setShowUserPopup(!showUserPopup);
//                                 setShowCreditPopup(false)
//                             }} 
//                             className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold hover:bg-gray-800 transition'
//                         >
//                             {userData && userData.name ? userData.name.charAt(0).toUpperCase() : <FaUserAstronaut size={16}/>}
//                         </button>

//                         {showUserPopup && (
//                             <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
//                                 <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
//                                 <p className='text-sm text-gray-600 mb-2'>Credits: {userData?.credits || 0}</p>
//                                 <button 
//                                     onClick={() => {
//                                         navigate("/history");
//                                         setShowUserPopup(false);
//                                     }} 
//                                     className='w-full text-left text-sm py-2 hover:text-black text-gray-600 hover:bg-gray-50 px-2 rounded transition'
//                                 >
//                                     Interview History
//                                 </button>
//                                 <button 
//                                     onClick={handleLogout} 
//                                     className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 rounded transition'
//                                 >
//                                     <HiOutlineLogout size={16}/>
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>

//             {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
//         </div>
//     )
// }

// export default Navbar




import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
import axiosInstance from '../config/axios'; // Use configured axios

function Navbar() {
    const {userData} = useSelector((state) => state.user || { userData: null })
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Fetch fresh user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await axiosInstance.get('/api/user/current-user')
                if (result.data) {
                    console.log("✅ Navbar fetched user:", result.data)
                    dispatch(setUserData(result.data))
                }
            } catch (error) {
                console.log("Not logged in")
            }
        }
        
        // Only fetch if we might be logged in (check localStorage)
        if (localStorage.getItem('token') || document.cookie.includes('token')) {
            fetchUserData()
        }
    }, [dispatch])

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            await axiosInstance.get('/api/auth/logout')
            
            // Clear all storage
            dispatch(setUserData(null))
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            
            // Clear cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log("Logout error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleNavigation = (path) => {
        if (!userData) {
            setShowAuth(true)
            return
        }
        // Small delay for mobile
        setTimeout(() => navigate(path), 100)
    }

    const getInitial = () => {
        if (!userData || !userData.name) return <FaUserAstronaut size={16}/>
        return userData.name.charAt(0).toUpperCase()
    }

    return (
        <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6 relative'>
            <motion.div 
                initial={{opacity:0 , y:-40}}
                animate={{opacity:1 , y:0}}
                transition={{duration: 0.3}}
                className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center relative z-10'
            >
                <div className='flex items-center gap-2 md:gap-3 cursor-pointer' onClick={() => navigate('/')}>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18}/>
                    </div>
                    <h1 className='font-semibold hidden md:block text-lg'>InterviewIQ.AI</h1>
                </div>

                <div className='flex items-center gap-3 md:gap-6 relative'>
                    {/* Credits Button */}
                    <div className='relative'>
                        <button 
                            onClick={() => {
                                if(!userData) {
                                    setShowAuth(true)
                                    return
                                }
                                setShowCreditPopup(!showCreditPopup)
                                setShowUserPopup(false)
                            }} 
                            className='flex items-center gap-1 md:gap-2 bg-gray-100 px-2 md:px-4 py-2 rounded-full text-sm md:text-md hover:bg-gray-200 transition'
                            disabled={isLoading}
                        >
                            <BsCoin size={16} className="md:size-5"/>
                            <span>{userData?.credits !== undefined ? userData.credits : 0}</span>
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-0 md:right-[-50px] mt-3 w-56 md:w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                                <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                                <button 
                                    onClick={() => {
                                        navigate("/pricing")
                                        setShowCreditPopup(false)
                                    }} 
                                    className='w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition'
                                >
                                    Buy more credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Button */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if(!userData) {
                                    setShowAuth(true)
                                    return
                                }
                                setShowUserPopup(!showUserPopup)
                                setShowCreditPopup(false)
                            }} 
                            className='w-8 h-8 md:w-9 md:h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold hover:bg-gray-800 transition'
                            disabled={isLoading}
                        >
                            {getInitial()}
                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                                <p className='text-md text-blue-500 font-medium mb-1 break-words'>{userData?.name}</p>
                                <p className='text-sm text-gray-600 mb-2'>Credits: {userData?.credits || 0}</p>
                                <button 
                                    onClick={() => {
                                        navigate("/history")
                                        setShowUserPopup(false)
                                    }} 
                                    className='w-full text-left text-sm py-2 hover:text-black text-gray-600 hover:bg-gray-50 px-2 rounded transition'
                                >
                                    Interview History
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 rounded transition'
                                    disabled={isLoading}
                                >
                                    <HiOutlineLogout size={16}/>
                                    {isLoading ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar