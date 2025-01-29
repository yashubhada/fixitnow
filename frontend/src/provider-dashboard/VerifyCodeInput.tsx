import React, { useEffect, useRef } from 'react'

const VerifyCodeInput: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on the input element when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Verify User Code</h1>
                    <div
                        className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <i className="ri-shield-check-line text-xl mr-3"></i>
                        <input
                            type="text"
                            ref={inputRef}
                            autoComplete='off'
                            placeholder='Enter verification code'
                            required
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyCodeInput
