import React, { useEffect, useState, useRef, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const LoginForm: React.FC = () => {

    const { baseUrl, closeLoginModal, openSignupForm, showToast, getLoggedInUserData } = useContext(UserContext);

    // email input ref
    const emailInputRef = useRef<HTMLInputElement>(null);
    const handleEmailInputRef = (): void => {
        emailInputRef.current?.focus();
    }

    // password input ref
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const handlePasswordInputRef = (): void => {
        passwordInputRef.current?.focus();
    }

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

    // Show and hide password    
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const handleTogglePassword = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);

        // Keep focus on input after toggling
        setTimeout(() => {
            passwordInputRef.current?.focus();
        }, 0);
    };


    // sign in form
    const [isSignInFormLoading, setIsSignInFormLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const handleSignIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsSignInFormLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/user/signin`, userData, { withCredentials: true });
            showToast(response.data.message, "success");
            if (response.data.success) {
                await getLoggedInUserData();
                closeLoginModal();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Check for Axios-specific errors
                if (err.response) {
                    if (err.status === 400) {
                        showToast(err.response.data.message, "error");
                    }
                }
            }
        } finally {
            setIsSignInFormLoading(false);
        }
    }

    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                        <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Welcome back</h1>
                        <div className='w-full'>
                            <form onSubmit={handleSignIn} className='w-full'>
                                <div
                                    onClick={handleEmailInputRef}
                                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <div className='mr-3'>
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className='focus:outline-none'
                                        >
                                            <path
                                                d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        ref={emailInputRef}
                                        onChange={handleSignInChange}
                                        name='email'
                                        value={userData.email}
                                        autoComplete='off'
                                        placeholder='Enter your email'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <div
                                    onClick={handlePasswordInputRef}
                                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <div className='mr-3'>
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Lock"
                                            className='focus:outline-none'
                                        >
                                            <path
                                                d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm3 8V7a3 3 0 1 0-6 0v3h6zm-3 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                                                fill="currentColor"
                                            />
                                        </svg>

                                    </div>
                                    <input
                                        type={
                                            showPassword ? 'password' : 'text'
                                        }
                                        placeholder='Enter your password'
                                        name='password'
                                        onChange={handleSignInChange}
                                        value={userData.password}
                                        ref={passwordInputRef}
                                        autoComplete='off'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                    <div
                                        onClick={handleTogglePassword}
                                        className='ml-3'
                                    >
                                        {
                                            showPassword
                                                ?
                                                <svg
                                                    width="20px"
                                                    height="20px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='cursor-pointer focus:outline-none'
                                                >
                                                    <path
                                                        d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                :
                                                <svg
                                                    width="20px"
                                                    height="20px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='cursor-pointer focus:outline-none'
                                                >
                                                    <path
                                                        d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                        }
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                    disabled={isSignInFormLoading}
                                >
                                    {
                                        isSignInFormLoading
                                            ?
                                            <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                ></path>
                                            </svg>
                                            :
                                            'Login'
                                    }
                                </button>
                                <div className='my-7 relative'>
                                    <div className='w-full p-[0.1px] bg-[#3333]'></div>
                                    <div className="w-fit bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        Or
                                    </div>
                                </div>
                                <div
                                    onClick={openSignupForm}
                                    className="text-center text-base"
                                >
                                    <span className='cursor-pointer'>
                                        Don't have an account? Sign up
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div
                            onClick={closeLoginModal}
                            className='bg-black p-1 rounded-full absolute -top-3 -right-3 cursor-pointer'
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
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
