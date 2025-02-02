import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const VerifyCodeInput: React.FC = () => {

    const { baseUrl, userData, showToast, setIsShowTimmer, handleEmitTimmerComponent } = useContext(UserContext);

    const navigate = useNavigate();

    const [takerId, setTakerId] = useState<string | null>(null);
    const [providerId, setProviderId] = useState<string | null>(null);

    // if taker id not found
    useEffect(() => {
        const id = localStorage.getItem("takerId");
        if (id) {
            setTakerId(id);
        }
        if (!id) {
            navigate("/provider-dashboard/not-found");
            return;
        }
    }, []);

    useEffect(() => {
        setProviderId(userData.user.id);
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on the input element when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const [id, setId] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [isVerifyLoading, setIsVerifyLoading] = useState<boolean>(false);

    useEffect(() => {
        setId(localStorage.getItem('requestId'));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value.toUpperCase());
    }

    const handleVerifyCode: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsVerifyLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/user/fetchSingleServiceRequest`,
                { id, verificationCode },
                { withCredentials: true }
            );
            if (response.data.success) {
                if (providerId && takerId) {
                    handleEmitTimmerComponent(providerId, takerId, 'open');
                }
                // localStorage.removeItem("takerId");
                showToast(response.data.message, "success");
                setIsShowTimmer(true); // show timmer
                navigate("/provider-dashboard");
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
            setIsVerifyLoading(false);
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-center px-5 md:px-0">
            <form
                onSubmit={handleVerifyCode}
                className="bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in shadow-xl border"
            >
                <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Verify User Code</h1>
                <div
                    className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                >
                    <i className="ri-shield-check-line text-xl mr-3"></i>
                    <input
                        type="text"
                        ref={inputRef}
                        value={verificationCode}
                        onChange={handleChange}
                        autoComplete='off'
                        placeholder='Enter verification code'
                        required
                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                    />
                </div>
                <button
                    type="submit"
                    disabled={isVerifyLoading}
                    className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                >
                    {
                        isVerifyLoading
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
    )
}

export default VerifyCodeInput
