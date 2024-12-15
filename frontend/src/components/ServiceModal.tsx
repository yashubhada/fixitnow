import React, { useEffect } from 'react'
import UserImage from '../images/user-image.jpg'

const ServiceModal: React.FC = () => {

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
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center p-10">
                    <div className="relative bg-white flex items-center gap-x-5 rounded-md z-10 w-full h-[600px] overflow-hidden animate-fade-in">
                        <div className='w-2/3 h-full'>
                            <iframe
                                className='w-full h-full border-0'
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21599.061544888482!2d71.2076751432344!3d21.604897466143488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395880c72d516845%3A0x4e950cffb505bb12!2sAmreli%2C%20Gujarat%20365601!5e0!3m2!1sen!2sin!4v1734238312174!5m2!1sen!2sin"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div>
                            <div className='flex items-center gap-x-3 rounded'>
                                <div className='w-28 h-24 md:w-32 md:h-32 rounded md:rounded-full overflow-hidden'>
                                    <img
                                        src={UserImage}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-1 mb-2">
                                        <h1 className="text-base md:text-3xl font-medium text-black">Mike's Plumbing</h1>
                                        <div>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-label="Verified"
                                                className="focus:outline-none w-[20px]"
                                            >
                                                <path
                                                    d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-x-1 md:gap-x-2 text-gray-500 mb-2">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Location"
                                            className="focus:outline-none w-[15px] md:w-[20px]"
                                        >
                                            <path
                                                d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <p className='text-sm md:text-xl'>Amreli</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <svg
                                                key={index}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-label="Rating"
                                                className="focus:outline-none w-[13px] md:w-[20px]"
                                            >
                                                <path
                                                    d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                                                    fill={index < 4 ? "rgba(234,113,46,1)" : "#555"}
                                                />
                                            </svg>
                                        ))}
                                        <div className="text-gray-500 text-sm md:text-base">(4.0)</div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-300 p-[1px] rounded-full my-10'></div>
                            <div className="w-full h-10 flex items-center justify-center p-3 rounded-md border border-[#b3b3b3] select-none cursor-pointer group overflow-hidden relative">
                                <p className="text-base text-gray-700 absolute transition-all duration-500 ease-in-out group-hover:-translate-y-[200%]">
                                    Hover to know your request code
                                </p>
                                <p className="text-base text-gray-700 absolute translate-y-[200%] transition-all duration-500 ease-in-out group-hover:translate-y-0">
                                    Your request code is <span className='text-gray-950'>123456</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceModal
