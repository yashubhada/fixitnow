import React, { useEffect } from 'react'

interface LoginFormProps {
    closeClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ closeClick }) => {

    useEffect(() => {
        // Disable scroll and hide scrollbar when the component is mounted
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
        }
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-fit">
                        <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Fixitnow Login</h1>
                        <div className='w-full md:w-[400px]'>
                            <form className='w-full'>
                                <div className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'>
                                    <div className='mr-3'>
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Email"
                                            tabIndex={0}
                                        >
                                            <path
                                                d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder='Enter your email'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <div className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'>
                                    <div className='mr-3'>
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Lock"
                                            tabIndex={0}
                                        >
                                            <path
                                                d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm3 8V7a3 3 0 1 0-6 0v3h6zm-3 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                                                fill="currentColor"
                                            />
                                        </svg>

                                    </div>
                                    <input
                                        type="password"
                                        placeholder='Enter your password'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                    <div className='ml-3'>
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Email"
                                            tabIndex={0}
                                            className='cursor-pointer'
                                        >
                                            <path
                                                d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <button className='w-full mt-5 font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px]'>
                                    Login
                                </button>
                                <div className='my-7 relative'>
                                    <div className='w-full p-[0.1px] bg-[#3333]'></div>
                                    <div className="w-fit bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        Or
                                    </div>
                                </div>
                                <div className="text-center text-base">
                                    <a href="#">
                                        Don't have an account? Sign up
                                    </a>
                                </div>
                            </form>
                        </div>
                        <div
                            onClick={closeClick}
                            className='bg-black p-1 rounded-full absolute -top-3 -right-3 cursor-pointer'
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                aria-label="Email"
                                tabIndex={0}
                                className="focus:outline-none"
                            >
                                <path
                                    d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginForm
