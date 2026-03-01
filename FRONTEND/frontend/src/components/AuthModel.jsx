// // import React from 'react'
// // import { useEffect } from 'react'
// // import { useSelector } from 'react-redux'
// // import { FaTimes } from "react-icons/fa";
// // import Auth from '../pages/Auth';

// // function AuthModel({onClose}) {
// //     const {userData} = useSelector((state)=>state.user)

// //     useEffect(()=>{
// //         if(userData){
// //             onClose()
// //         }

// //     },[userData , onClose])

// //   return (
// //     <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4'>
// //         <div className='relative w-full max-w-md'>
// //             <button onClick={onClose} className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl'>
// //              <FaTimes size={18}/>
// //             </button>
// //             <Auth isModel={true}/>


// //         </div>

      
// //     </div>
// //   )
// // }

// // export default AuthModel

// import React from 'react'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { FaTimes } from "react-icons/fa";
// import Auth from '../pages/Auth';

// function AuthModel({ onClose }) {
//     const { userData } = useSelector((state) => state.user)

//     // Close modal when user successfully logs in
//     useEffect(() => {
//         if (userData) {
//             // Small delay to show success state
//             setTimeout(() => {
//                 onClose();
//             }, 500);
//         }
//     }, [userData, onClose]);

//     // Handle escape key press
//     useEffect(() => {
//         const handleEscKey = (e) => {
//             if (e.key === 'Escape') {
//                 onClose();
//             }
//         };

//         window.addEventListener('keydown', handleEscKey);
        
//         // Prevent body scroll when modal is open
//         document.body.style.overflow = 'hidden';

//         return () => {
//             window.removeEventListener('keydown', handleEscKey);
//             document.body.style.overflow = 'unset';
//         };
//     }, [onClose]);

//     // Handle click outside to close
//     const handleBackdropClick = (e) => {
//         if (e.target === e.currentTarget) {
//             onClose();
//         }
//     };

//     return (
//         <div 
//             className='fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-md px-4'
//             onClick={handleBackdropClick}
//         >
//             <div className='relative w-full max-w-md animate-fadeIn'>
//                 {/* Close button */}
//                 <button 
//                     onClick={onClose} 
//                     className='absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition text-gray-600 hover:text-gray-900'
//                     aria-label="Close modal"
//                 >
//                     <FaTimes size={16}/>
//                 </button>
                
//                 {/* Auth component */}
//                 <Auth isModel={true} onClose={onClose} />
//             </div>
//         </div>
//     )
// }

// export default AuthModel



import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user)

    // Close modal when user successfully logs in
    useEffect(() => {
        if (userData) {
            // Small delay to show success state
            setTimeout(() => {
                onClose();
            }, 500);
        }
    }, [userData, onClose]);

    // Handle escape key press
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    // Handle click outside to close
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className='fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-md px-4'
            onClick={handleBackdropClick}
        >
            <div className='relative w-full max-w-md animate-fadeIn'>
                {/* Close button */}
                <button 
                    onClick={onClose} 
                    className='absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition text-gray-600 hover:text-gray-900'
                    aria-label="Close modal"
                >
                    <FaTimes size={16}/>
                </button>
                
                {/* Auth component with onClose prop */}
                <Auth isModel={true} onClose={onClose} />
            </div>
        </div>
    )
}

export default AuthModel