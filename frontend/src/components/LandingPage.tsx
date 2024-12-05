import React, { useState } from 'react'
import Logo from '../images/fixitnow-logo-black.png'
import Gardener from '../images/gardener.png'
import Cleaner from '../images/cleaner.png'
import Plumber from '../images/plumber.png'
import Electrician from '../images/electrician.png'
import Carpenter from '../images/carpenter.png'

const LandingPage: React.FC = () => {

    type ServiceCategoryType = {
        icon: JSX.Element;
        title: string;
    };

    const serviceCategory = [
        {
            title: "Cleaning service",
            icon: (
                <div className='h-[24px] w-[24px]'>
                    <img src={Cleaner} className='w-full h-full object-contain'/>
                </div>
            ),
        },
        {
            title: "Plumbing service",
            icon: (
                <div className='h-[24px] w-[24px]'>
                    <img src={Plumber} className='w-full h-full object-contain'/>
                </div>
            ),
        },
        {
            title: "Electrical service",
            icon: (
                <div className='h-[24px] w-[24px]'>
                    <img src={Electrician} className='w-full h-full object-contain'/>
                </div>
            ),
        },
        {
            title: "Carpentry service",
            icon: (
                <div className='h-[24px] w-[24px]'>
                    <img src={Carpenter} className='w-full h-full object-contain'/>
                </div>
            ),
        },
        {
            title: "Gardener service",
            icon: (
                <div className='h-[24px] w-[24px]'>
                    <img src={Gardener} className='w-full h-full object-contain'/>
                </div>
            ),
        },
    ];


    const [serviceProviderValue, setServiceProviderValue] = useState<string | number | readonly string[] | undefined>("");
    const [filteredServiceCategory, setFilteredServiceCategory] = useState<ServiceCategoryType[]>([]);

    const handleServiceProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let word = e.target.value.toLowerCase();
        setServiceProviderValue(word);
        if (word !== "") {
            let filteredData = serviceCategory.filter(service => service.title.toLowerCase().includes(word));
            setFilteredServiceCategory(filteredData)
        } else {
            setFilteredServiceCategory([]);
        }
        console.log(filteredServiceCategory);
    }


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
                                    value={serviceProviderValue}
                                    onChange={handleServiceProviderChange}
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
                                {
                                    filteredServiceCategory.length > 0 &&
                                    <ul className='absolute max-h-[220px] top-[48px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
                                        {filteredServiceCategory.length > 0 ? (
                                            filteredServiceCategory.map((service, index) => (
                                                <li
                                                    key={index}
                                                    className='flex items-center gap-x-3 cursor-pointer hover:bg-[#f3f3f3] p-2 overflow-hidden'
                                                    onClick={
                                                        (): void => {
                                                            setServiceProviderValue(service?.title)
                                                            setFilteredServiceCategory([])
                                                        }
                                                    }
                                                >
                                                    <div>{service?.icon}</div>
                                                    <div>{service?.title}</div>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500 p-2">No results found</li>
                                        )}
                                    </ul>
                                }
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
