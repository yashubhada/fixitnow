import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext';

const ForgotPassword: React.FC<{ onClose: () => void; }> = ({ onClose }) => {

    const { baseUrl, showToast } = useContext(UserContext);

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

    // data
    interface UserData {
        email: string;
        id: string;
        role: string;
        password: string;
        confirmPassword: string;
    }
    const [data, setData] = useState<UserData>({
        email: "",
        id: "",
        role: "",
        password: "",
        confirmPassword: ""
    });

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

    // verify code design
    const [verifyCode, setVerifyCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleVerifyCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const code = [...verifyCode];
        code[index] = value;
        setVerifyCode(code);

        if (value && index < verifyCode.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !verifyCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // handle email verification submit
    const handleVerifyEmailSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsEmailVerifyBtnLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/user/forgotPassVerifyEmail`, {
                email: data.email
            });
            if (response.data.success) {
                setIsEmailVerification(false);
                setIsCodeVerification(true);

                setData((prev) => ({
                    ...prev,
                    id: response.data.userData._id,
                    role: response.data.userData.userRole
                }));

                showToast(response.data.message, "success");
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
            setIsEmailVerifyBtnLoading(false);
        }
    }

    // handle code verification submit
    const handleVerifyCodeSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsCodeVerificationBtnLoading(true);
        const codeNumber = parseInt(verifyCode.join(""), 10); // convert array into int
        try {
            const response = await axios.post(`${baseUrl}api/user/forgotPassVerifyCode`, {
                id: data.id,
                role: data.role,
                verifyCode: codeNumber
            });
            if (response.data.success) {
                setIsCodeVerification(false);
                setIsForgotPassword(true);
                showToast(response.data.message, "success");
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
            setIsCodeVerificationBtnLoading(false);
        }
    }

    // handle reset password
    const handleResetPasswordSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (data.password.length < 8 && data.confirmPassword.length < 8) {
            return showToast("Password length must be 8 characters or longer", "error");
        }
        if (data.password !== data.confirmPassword) {
            return showToast("Password and confirm password do not match", "error");
        }
        setIsForgotPasswordBtnLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/user/forgotPassResetPassword`, {
                id: data.id,
                role: data.role,
                password: data.confirmPassword
            });
            if (response.data.success) {
                showToast(response.data.message, "success");
                onClose();
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
            setIsForgotPasswordBtnLoading(false);
        }
    }

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
                            <form onSubmit={handleVerifyEmailSubmit} className='w-full'>
                                <div
                                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-mail-line text-xl mr-3"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailInputRef}
                                        onChange={handleFormChange}
                                        value={data.email}
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
                                                Verifying...
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
                            <form onSubmit={handleVerifyCodeSubmit} className='w-full'>
                                <div className="flex justify-between">
                                    {verifyCode.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleVerifyCodeChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            required
                                            className="w-10 md:w-12 h-10 md:h-12 text-center text-base md:text-xl font-medium border-2 border-gray-300 rounded-md focus:outline-none focus:border-black focus:bg-white"
                                        />
                                    ))}
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
                                                Verifying...
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
                            <form onSubmit={handleResetPasswordSubmit} className='w-full'>
                                <div
                                    className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-lock-line text-xl mr-3"></i>
                                    <input
                                        type="text"
                                        name="password"
                                        ref={forgotPasswordInputRef}
                                        value={data.password}
                                        onChange={handleFormChange}
                                        autoComplete='off'
                                        placeholder='Enter new password'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <div
                                    className='mb-1 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-lock-line text-xl mr-3"></i>
                                    <input
                                        type="text"
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleFormChange}
                                        autoComplete='off'
                                        placeholder='Enter confirm password'
                                        required
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                {
                                    data.password !== data.confirmPassword
                                    &&
                                    <p className='text-red-500 text-sm'>Password and confirm password do not match</p>
                                }
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
                    <div
                        onClick={onClose}
                        className='bg-black w-7 h-7 text-center rounded-full absolute -top-3 -right-3 cursor-pointer'
                    >
                        <i className="ri-close-line text-white leading-7 text-xl"></i>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ForgotPassword
