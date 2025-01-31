import React from "react";

const ChatComponent: React.FC = () => {
    return (
        <>
            <div
                className='w-full md:w-[600px] bg-white rounded-t-md mx-auto'
            >
                <div className='flex items-center pb-2'>
                    <div className='relative mr-2'>
                        <img
                            className='w-10 rounded-full'
                            src="https://res.cloudinary.com/dfcfncp2q/image/upload/v1738250475/fixitnow/id9x8ezfo1lbhqy6yjmi.jpg"
                            alt="Provider Avatar"
                        />
                        <div className='absolute h-3 w-3 bg-green-500 rounded-full bottom-0 right-0 border-white border-2'></div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-black">yash</h1>
                    </div>
                </div>
                {/* Message Container */}
                <div className='w-full h-[calc(100vh-150px)] bg-red-100'>
                    {/* Message content goes here */}
                </div>
                {/* Send Message */}
                <div className='w-full pt-2'>
                    <div className='flex items-center justify-between py-[6px] px-2 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'>
                        <input
                            type="text"
                            autoComplete='off'
                            placeholder={`Send a message to yash...`}
                            required
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black pr-2'
                        />
                        <div className='px-1 text-lg bg-black text-white cursor-pointer rounded-md'>
                            <i className="ri-send-plane-2-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;