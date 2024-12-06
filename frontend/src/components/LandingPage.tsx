import React, { useState } from 'react'
import Logo from '../images/fixitnow-logo-black.png'
import Gardener from '../images/gardener.png'
import Cleaner from '../images/cleaner.png'
import Plumber from '../images/plumber.png'
import Electrician from '../images/electrician.png'
import Carpenter from '../images/carpenter.png'
import Roofing from '../images/roofing.png'
import Painter from '../images/painter.png'
import SmartHome from '../images/smart-home.png'
import HomeRenovation from '../images/renovation.png'
import Flooring from '../images/flooring.png'
import LandingImage from '../images/landingImg.svg'
import RightAngleArrow from '../images/right-angle-arrow.png'
import AboutImg from '../images/about.svg'

const LandingPage: React.FC = () => {

    type ServiceCategoryType = {
        icon: JSX.Element;
        title: string;
    };

    const serviceCategory = [
        {
            title: "Cleaning",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Cleaner} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Plumbing",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Plumber} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Electrician",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Electrician} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Carpentry",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Carpenter} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Garden",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Gardener} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Painter",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Painter} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Home Renovation & Remodeling",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={HomeRenovation} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Smart Home Installation",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={SmartHome} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Roofing",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Roofing} className='w-full h-full object-contain' />
                </div>
            ),
        },
        {
            title: "Flooring Specialist",
            icon: (
                <div className='h-[20px] w-[20px]'>
                    <img src={Flooring} className='w-full h-full object-contain' />
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
        <>
            <section className='w-full flex items-center px-4 pt-10 md:px-20 md:pt-20'>
                <div className='flex items-center w-full'>
                    <div className='w-full md:w-1/2'>
                        <img
                            src={Logo}
                            alt="fixitnow logo"
                            className='w-12 md:w-16'
                        />
                        <h1 className='mt-4 text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Help is Just Around the Corner</h1>
                        <div className='font-roboto w-full md:w-[400px] mt-8'>
                            <form className='grid grid-cols-1 gap-3'>
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
                                        <ul className='absolute z-10 max-h-[350px] top-[48px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
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
                                <div className="font-roboto text-base mt-5 w-fit group relative">
                                    <a href="#" className="group-hover:text-black transition duration-300">
                                        Already have an account? Sign in
                                    </a>
                                    <div className="w-full h-[1px] bg-[#cbcbcb] relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"
                                            style={{
                                                transformOrigin: 'left',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='hidden md:block w-1/2'>
                        <div className='w-full h-full'>
                            <img
                                src={LandingImage}
                                draggable='false'
                                className='w-full h-full object-contain'
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About us  */}

            <section className='w-full px-4 pt-10 md:px-20 md:pt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-10'>
                    <div className=''>
                        <img src={AboutImg} />
                    </div>
                    <div className='text-justify'>
                        <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>About Fixitnow</h1>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>At On Hand Services Provide, we believe that finding the right service professional should be simple, seamless, and stress-free. Our platform connects users with skilled and trusted service providers across a wide range of industries, from home repairs and maintenance to personal care, automotive services, and more.</p>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>We are dedicated to making life easier by bringing expert help right to your doorstep. Whether you need a plumber to fix a leak, a beautician for an at-home makeover, or a handyman for urgent repairs, we've got you covered.</p>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>Our mission is to empower both customers and service providers by creating a trusted space where quality meets convenience. We prioritize safety, reliability, and transparency, ensuring that every service provider on our platform is verified and reviewed by real users. With On Hand Services Provide, help is always within reach—just a few clicks away. Experience a new standard of service with us, where your needs come first, and your satisfaction is our top priority.</p>
                    </div>
                    {/* <div>
                        <div className='flex items-center'>
                            <img className='w-2 mr-5' src={RightAngleArrow} />
                            <div>
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Wide Range of Services</h1>
                                <p className='text-base font-roboto'>From home maintenance to personal care.</p>
                            </div>
                        </div>
                        <div className='flex items-center mt-5'>
                            <img className='w-2 mr-5' src={RightAngleArrow} />
                            <div>
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Trusted Professionals</h1>
                                <p className='text-base font-roboto'>Verified and reviewed service providers.</p>
                            </div>
                        </div>
                        <div className='flex items-center mt-5'>
                            <img className='w-2 mr-5' src={RightAngleArrow} />
                            <div>
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Location-Based</h1>
                                <p className='text-base font-roboto'> Connect with experts in your area.</p>
                            </div>
                        </div>
                        <div className='flex items-center mt-5'>
                            <img className='w-2 mr-5' src={RightAngleArrow} />
                            <div>
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Convenient & Reliable</h1>
                                <p className='text-base font-roboto'>Service on demand, whenever you need it.</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            <section className='w-full px-4 pt-10 md:px-20 md:pt-20'>
                <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Key Features</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div className='grid grid-cols-1 gap-10'>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Find Trusted Service Providers</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>Say goodbye to endless searches and uncertainty. With On Hand Services Provide, you get access to verified professionals in your area. Every service provider is reviewed and rated by real users, ensuring you always get the best service.</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'> Book Services Anytime, Anywhere</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>Life happens, and we’re here to help. Whether it’s a late-night plumbing emergency or a weekend home cleaning, our platform lets you book services on-demand, whenever you need them.</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Seamless Communication</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>Connect with service providers directly through our platform. Send messages, make voice calls, and stay updated on your service requests—all in one place.</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Location-Based Service Matching</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>We make it easy to find help nearby. Our platform matches you with skilled professionals closest to your location, so you can save time and get quick assistance.</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-10'>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Secure Payments</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>Your security is our priority. Pay for services conveniently and securely through our platform, with multiple payment options to suit your needs.</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Verified and Reliable Professionals</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>All service providers go through a strict verification process. We ensure only experienced and trustworthy professionals are listed on our platform, giving you peace of mind.</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Easy Scheduling and Tracking</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>Schedule services at your convenience and track their progress in real-time. Our intuitive interface keeps you informed every step of the way.</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <img className='w-2 mr-5' src={RightAngleArrow} />
                                <h1 className='text-xl md:text-2xl font-poppins font-semibold'>Customer Reviews and Ratings</h1>
                            </div>
                            <div>
                                <p className='text-base text-justify font-roboto ml-7 mt-1'>Make informed decisions with access to genuine customer reviews and ratings. See what others are saying about service providers before you book.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage
