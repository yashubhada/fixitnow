import React, { useEffect, useState, useRef, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC<{ openForgotPasswordModel: () => void; }> = ({ openForgotPasswordModel }) => {

    const { baseUrl, closeLoginModal, openSignupForm, showToast, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    // email input ref
    const emailInputRef = useRef<HTMLInputElement>(null);
    const handleEmailInputRef = (): void => {
        emailInputRef.current?.focus();
    }

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

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
    const [loginData, setLoginData] = useState<{
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
            const response = await axios.post(`${baseUrl}api/user/signin`, loginData, { withCredentials: true });
            // console.log(response?.data?.user);
            setUserData(response?.data?.user);
            showToast(response.data.message, "success");
            if (response.data.success) {
                if (response.data.user.userRole === 'serviceProvider') {
                    navigate('/provider-dashboard');
                }
                if (response.data.user.userRole === 'serviceTaker') {
                    navigate('/');
                }
                closeLoginModal();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Check for Axios-specific errors
                if (err.response) {
                    if (err) {
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
        setLoginData((prevData) => ({
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
                                    <i className="ri-mail-line text-xl mr-3"></i>
                                    <input
                                        type="email"
                                        ref={emailInputRef}
                                        onChange={handleSignInChange}
                                        name='email'
                                        value={loginData.email}
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
                                    <i className="ri-lock-2-line text-xl mr-3"></i>
                                    <input
                                        type={
                                            showPassword ? 'password' : 'text'
                                        }
                                        placeholder='Enter your password'
                                        name='password'
                                        onChange={handleSignInChange}
                                        value={loginData.password}
                                        ref={passwordInputRef}
                                        autoComplete='current-password'
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
                                                <i className="ri-eye-off-line text-xl mr-3 cursor-pointer"></i>
                                                :
                                                <i className="ri-eye-line text-xl mr-3 cursor-pointer"></i>
                                        }
                                    </div>
                                </div>
                                <div className='mt-5 text-right'>
                                    <span
                                        onClick={() => {
                                            closeLoginModal();
                                            openForgotPasswordModel();
                                        }}
                                        className='text-black cursor-pointer hover:underline'
                                    >
                                        forgot password?
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                    disabled={isSignInFormLoading}
                                >
                                    {
                                        isSignInFormLoading
                                            ?
                                            <>
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
                                                Logging in...
                                            </>
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
                            className='bg-black w-7 h-7 text-center rounded-full absolute -top-3 -right-3 cursor-pointer'
                        >
                            <i className="ri-close-line text-white leading-7 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
