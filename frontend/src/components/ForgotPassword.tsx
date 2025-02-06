import React, { useEffect, useRef, useState } from 'react'

const ForgotPassword: React.FC = () => {

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

    const [isEmailVerification, setIsEmailVerification] = useState<boolean>(true);
    const [isCodeVerification, setIsCodeVerification] = useState<boolean>(false);
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

    // btn loading
    const [isEmailVerifyBtnLoading, setIsEmailVerifyBtnLoading] = useState<boolean>(false);
    const [isCodeVerificationBtnLoading, setIsCodeVerificationBtnLoading] = useState<boolean>(false);
    const [isForgotPasswordBtnLoading, setIsForgotPasswordBtnLoading] = useState<boolean>(false);

    // email input ref
    const emailInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    // verify code input ref
    const verifyCodeInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (verifyCodeInputRef.current && isCodeVerification) {
            verifyCodeInputRef.current.focus();
        }
    }, []);

    // verify code input ref
    const forgotPasswordInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (forgotPasswordInputRef.current && isForgotPassword) {
            forgotPasswordInputRef.current.focus();
        }
    }, []);

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    {
                        isEmailVerification
                        &&
                        <div>
                            <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Email verification</h1>
                            <form className='w-full'>
                                <div
                                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-mail-line text-xl mr-3"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailInputRef}
                                        autoComplete='off'
                                        placeholder='Enter your email'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                    disabled={isEmailVerifyBtnLoading}
                                >
                                    {
                                        isEmailVerifyBtnLoading
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
                                                Verifing...
                                            </>
                                            :
                                            'Verify'
                                    }
                                </button>
                            </form>
                        </div>
                    }
                    {
                        isCodeVerification
                        &&
                        <div>
                            <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Code verification</h1>
                            <form className='w-full'>
                                <div
                                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-shield-check-line text-xl mr-3"></i>
                                    <input
                                        type="number"
                                        name="verifyCode"
                                        ref={verifyCodeInputRef}
                                        autoComplete='off'
                                        placeholder='Enter your code'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                    disabled={isCodeVerificationBtnLoading}
                                >
                                    {
                                        isCodeVerificationBtnLoading
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
                                                Verifing...
                                            </>
                                            :
                                            'Verify'
                                    }
                                </button>
                            </form>
                        </div>
                    }
                    {
                        isForgotPassword
                        &&
                        <div>
                            <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Reset password</h1>
                            <form className='w-full'>
                                <div
                                    className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-lock-line text-xl mr-3"></i>
                                    <input
                                        type="text"
                                        name="password"
                                        ref={forgotPasswordInputRef}
                                        autoComplete='off'
                                        placeholder='Enter new password'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <div
                                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-lock-line text-xl mr-3"></i>
                                    <input
                                        type="text"
                                        name="confirmPassword"
                                        autoComplete='off'
                                        placeholder='Enter confirm password'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                    disabled={isForgotPasswordBtnLoading}
                                >
                                    {
                                        isForgotPasswordBtnLoading
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
                                                Saving...
                                            </>
                                            :
                                            'Save'
                                    }
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
}

export default ForgotPassword
