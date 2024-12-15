import React, { useEffect, useState } from 'react'
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

    const [serviceInfo, setServiceInfo] = useState<boolean>(false);

    const toogleServiceInfo = (): void => {
        setServiceInfo((prev) => !prev);
    }

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center p-5 md:p-10">
                    <div className="relative bg-white block md:flex items-center gap-x-5 rounded-md z-10 w-full h-[500px] md:h-full overflow-hidden animate-fade-in">
                        <div className='w-full md:w-2/3 h-full'>
                            <iframe
                                className='w-full h-full border-0'
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21599.061544888482!2d71.2076751432344!3d21.604897466143488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395880c72d516845%3A0x4e950cffb505bb12!2sAmreli%2C%20Gujarat%20365601!5e0!3m2!1sen!2sin!4v1734238312174!5m2!1sen!2sin"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className={`absolute left-0 ${serviceInfo ? 'bottom-0' : '-bottom-[70%]'} md:static w-full md:w-auto p-3 md:p-0 bg-white transition-all duration-500 ease-in-out`}>
                            <div className='relative flex items-center justify-center'>
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
                                    <div className='bg-gray-300 p-[1px] rounded-full my-5 md:my-10'></div>
                                    <div className="text-sm md:text-base w-full h-10 flex items-center justify-center p-3 rounded-md border border-[#b3b3b3] select-none cursor-pointer group overflow-hidden relative">
                                        <p className="text-gray-700 absolute transition-all duration-500 ease-in-out group-hover:-translate-y-[200%]">
                                            Hover to know your request code
                                        </p>
                                        <p className="text-gray-700 absolute translate-y-[200%] transition-all duration-500 ease-in-out group-hover:translate-y-0">
                                            Your request code is <span className='text-gray-950'>123456</span>
                                        </p>
                                    </div>
                                    <div className='mt-3 md:mt-10'>
                                        <div className='flex items-center gap-x-3'>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-label="Rating"
                                                className="focus:outline-none w-[13px] md:w-[20px]"
                                            >
                                                <path
                                                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <p className='text-base'>Arriving time : 3 min</p>
                                        </div>
                                        <div className='flex items-center gap-x-3 mt-2'>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-label="Rating"
                                                className="focus:outline-none w-[13px] md:w-[20px]"
                                            >
                                                <path
                                                    d="M3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979ZM20.0049 10.9998H4.00488V18.9998H20.0049V10.9998ZM20.0049 8.99979V4.99979H4.00488V8.99979H20.0049ZM14.0049 14.9998H18.0049V16.9998H14.0049V14.9998Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <p className='text-base'>Cash payment : ₹390.00/-</p>
                                        </div>
                                        <div className='flex items-center gap-x-3 mt-2'>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-label="Rating"
                                                className="focus:outline-none w-[13px] md:w-[20px]"
                                            >
                                                <path
                                                    d="M9.97487 8.97487C11.3417 7.60804 11.3417 5.39196 9.97487 4.02513C8.60804 2.65829 6.39196 2.65829 5.02513 4.02513C3.65829 5.39196 3.65829 7.60804 5.02513 8.97487L7.5 11.4497L9.97487 8.97487ZM7.5 14.2782L3.61091 10.3891C1.46303 8.2412 1.46303 4.7588 3.61091 2.61091C5.7588 0.463029 9.2412 0.463029 11.3891 2.61091C13.537 4.7588 13.537 8.2412 11.3891 10.3891L7.5 14.2782ZM7.5 8C6.67157 8 6 7.32843 6 6.5C6 5.67157 6.67157 5 7.5 5C8.32843 5 9 5.67157 9 6.5C9 7.32843 8.32843 8 7.5 8ZM16.5 20.4497L18.9749 17.9749C20.3417 16.608 20.3417 14.392 18.9749 13.0251C17.608 11.6583 15.392 11.6583 14.0251 13.0251C12.6583 14.392 12.6583 16.608 14.0251 17.9749L16.5 20.4497ZM20.3891 19.3891L16.5 23.2782L12.6109 19.3891C10.463 17.2412 10.463 13.7588 12.6109 11.6109C14.7588 9.46303 18.2412 9.46303 20.3891 11.6109C22.537 13.7588 22.537 17.2412 20.3891 19.3891ZM16.5 17C15.6716 17 15 16.3284 15 15.5C15 14.6716 15.6716 14 16.5 14C17.3284 14 18 14.6716 18 15.5C18 16.3284 17.3284 17 16.5 17Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <p className='text-base'>Distance : 0.2 km</p>
                                        </div>
                                    </div>
                                    <div className='mt-5 md:mt-10'>
                                        <button className='px-5 py-2 text-white rounded-md bg-black hover:bg-[#333]'>
                                            cancel service
                                        </button>
                                    </div>
                                </div>
                                <div
                                    onClick={toogleServiceInfo}
                                    className='absolute -top-8 bg-white p-1 rounded-full md:hidden'
                                >
                                    <div className='bg-black text-white w-[24px] h-[24px] flex items-center justify-center rounded-full'>
                                        {
                                            serviceInfo
                                                ?
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-label="Rating"
                                                    className="focus:outline-none w-[20px]"
                                                >
                                                    <path
                                                        d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                :
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-label="Rating"
                                                    className="focus:outline-none w-[20px]"
                                                >
                                                    <path
                                                        d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceModal
