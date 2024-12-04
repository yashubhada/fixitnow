import React from 'react'
import Logo from '../images/fixitnow-logo-black.png'

const LandingPage: React.FC = () => {

    const serviceCategory = [
        {
            title: "Cleaning service",
            icon: (
                <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Cleaning service"
                    tabIndex={0}
                >
                    <path
                        d="M4 12h16v8H4v-8Zm12-4V4H8v4H5V4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4h-3Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            title: "Plumbing service",
            icon: (
                <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Plumbing service"
                    tabIndex={0}
                >
                    <path
                        d="M20.39 6.61a2 2 0 0 0-2.83 0L12 12.17l-2.79-2.8a3 3 0 0 0-4.24 4.24L10 18h4l3.93-3.93 2.46 2.47a1.49 1.49 0 0 0 2.11 0 1.49 1.49 0 0 0 0-2.11ZM5.71 12.71a1 1 0 0 1 1.42 0L10 15.59V16h-1.58L5.71 12.71ZM18 16h-1v-1h1Zm0 2h-1v1h1Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            title: "Electrical service",
            icon: (
                <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Electrical service"
                    tabIndex={0}
                >
                    <path
                        d="M13 3L3 14h6v7l10-11h-6V3Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            title: "Carpentry service",
            icon: (
                <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Carpentry service"
                    tabIndex={0}
                >
                    <path
                        d="M13 2L2 13h3v8h8v-3h8v-8h3L13 2Zm0 2.83L16.17 8H9.83L13 4.83ZM7 10h2v3H7v-3Zm8 0h2v3h-2v-3Zm-4 6h4v2h-4v-2Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
    ];


    return (
        <section className='h-screen w-full flex items-center px-20'>
            <div className='flex items-center w-full'>
                <div className='pr-28 w-1/2'>
                    <img
                        src={Logo}
                        alt="fixitnow logo"
                        className='w-16'
                    />
                    <h1 className='mt-4 text-black text-[52px] font-semibold leading-[64px] font-poppins'>Find local home service providers</h1>
                    <div className='font-roboto w-[400px] mt-8'>
                        <form className='grid grid-cols-1 gap-3 w-full'>
                            <div className='flex items-center justify-between py-[10px] pl-7 pr-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'>
                                <input
                                    type="text"
                                    placeholder='Service location'
                                    className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                />
                                <div className='ml-3'>
                                    <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-label="Service location"
                                        tabIndex={0}
                                    >
                                        <path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <div className='relative flex items-center justify-between py-[10px] pl-7 pr-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'>
                                <input
                                    type="text"
                                    placeholder='Enter your service'
                                    className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                />
                                <div className='ml-3'>
                                    <svg
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        tabIndex={0}
                                    >
                                        <path
                                            d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM3 22a8 8 0 0 1 16 0H3Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                {/* serviceCategory list */}
                                <ul className='hidden absolute max-h-[170px] top-[48px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
                                    {
                                        serviceCategory.map((service) =>
                                            <li className='flex items-center gap-x-3 cursor-pointer hover:bg-[#f3f3f3] p-2 overflow-hidden'>
                                                <div>
                                                    {service.icon}
                                                </div>
                                                <div>
                                                    {service.title}
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className='w-fit'>
                                <button className='font-poppins py-3 px-[25px] text-white bg-black hover:bg-[#333] rounded-md text-base font-medium leading-[20px]'>
                                    view
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='w-full h-[570px] bg-red-300'>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingPage
