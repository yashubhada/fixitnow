import React, { useContext, useEffect, useRef, useState } from 'react'
import LogoBlack from '../images/fixitnow-logo-black.png'
import LogoWhite from '../images/fixitnow-logo-white.png'
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
import KeyFeatures from '../images/features.svg'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ServiceProviderList from './ServiceProviderList'
import { UserContext } from '../context/UserContext';
import ServiceModal from './ServiceModal'
import RequestLoading from './RequestLoading'
import LocationSearch from './LocationSearch'

const LandingPage: React.FC = () => {

    const { toggleLoginModal, loginFormModal, isSignupForm, getLoggedInUserData, userData, handleLogout } = useContext(UserContext);

    const currentYear = new Date().getFullYear();

    // location input ref
    const locationInputRef = useRef<HTMLInputElement>(null);
    const handleLocationInputRef = (): void => {
        locationInputRef.current?.focus();
    }

    // services input ref
    const servicesInputRef = useRef<HTMLInputElement>(null);
    const handleServicesInputRef = (): void => {
        servicesInputRef.current?.focus();
    }

    type ServiceCategoryType = {
        icon: string;
        title: string;
    };

    const serviceCategory: ServiceCategoryType[] = [
        {
            title: "Cleaning",
            icon: Cleaner
        },
        {
            title: "Plumbing",
            icon: Plumber
        },
        {
            title: "Electrician",
            icon: Electrician
        },
        {
            title: "Carpentry",
            icon: Carpenter
        },
        {
            title: "Garden",
            icon: Gardener
        },
        {
            title: "Painter",
            icon: Painter
        },
        {
            title: "Home Renovation",
            icon: HomeRenovation
        },
        {
            title: "Smart Home Installation",
            icon: SmartHome
        },
        {
            title: "Roofing",
            icon: Roofing
        },
        {
            title: "Flooring Specialist",
            icon: Flooring
        },
    ];

    const [serviceLocationValue, setServiceLocationValue] = useState<string | undefined>("");
    const handleServiceLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceLocationValue(e.target.value);
    }

    const [serviceProviderValue, setServiceProviderValue] = useState<string | undefined>("");
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
    }

    // service provider list modal handling
    const [isOpenServiceProviderListModal, setIsOpenServiceProviderListModal] = useState<boolean>(false);
    const handleServiceProviderListModal = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (serviceLocationValue !== "" && serviceProviderValue !== "") {
            setIsOpenServiceProviderListModal(true);
        }
    }
    const closeServiceProviderListModal = (): void => {
        setIsOpenServiceProviderListModal(false);
    }

    // Key features
    interface KeyFeatures {
        id: number;
        title: string;
        description: string;
    };

    const keyFeatures: KeyFeatures[] = [
        { id: 1, title: 'Find Trusted Service Providers', description: 'Say goodbye to endless searches and uncertainty. With Fixitnow, you get access to verified professionals in your area. Every service provider is reviewed and rated by real users, ensuring you always get the best service.' },
        { id: 2, title: 'Book Services Anytime, Anywhere', description: 'Life happens, and we’re here to help. Whether it’s a late-night plumbing emergency or a weekend home cleaning, our platform lets you book services on-demand, whenever you need them.' },
        { id: 3, title: 'Location-Based Service Matching', description: 'We make it easy to find help nearby. Our platform matches you with skilled professionals closest to your location, so you can save time and get quick assistance.' },
        { id: 4, title: 'Secure Payments', description: 'Your security is our priority. Pay for services conveniently and securely through our platform, with multiple payment options to suit your needs.' },
        { id: 5, title: 'Wide Range of Services', description: 'From home repairs to personal care, automotive needs, and more—our platform covers it all. Whatever you need, we’ve got the right expert for the job.' },
        { id: 6, title: 'Verified and Reliable Professionals', description: 'All service providers go through a strict verification process. We ensure only experienced and trustworthy professionals are listed on our platform, giving you peace of mind.' },
        { id: 7, title: 'Customer Reviews and Ratings', description: 'Make informed decisions with access to genuine customer reviews and ratings. See what others are saying about service providers before you book.' },
        { id: 8, title: 'Affordable and Transparent Pricing', description: 'No hidden charges, no surprises. Get upfront pricing for every service and choose what works best for your budget.' }
    ];
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleKeyFeatures = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    // service modal and requset loading
    const [isOpenServiceModal, setIsOpenServiceModal] = useState<boolean>(false);
    const [isOpenLoading, setIsOpenLoading] = useState<boolean>(false);

    const handleServiceModal = (): void => {
        setIsOpenLoading(true);
        setIsOpenServiceProviderListModal(false);
        setTimeout(() => {
            setIsOpenServiceModal(true);
            setIsOpenLoading(false);
        }, 5000);
    }

    const fetchUserData = async () => {
        await getLoggedInUserData();
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <>
            {/* if user is login */}
            <section className='fixed top-3 right-3 w-[130px] z-10'>
                <div className='relative group w-full flex justify-end'>
                    {
                        userData
                            ?
                            <>
                                <div className='w-full cursor-pointer flex items-center justify-center gap-x-3 bg-white p-2 shadow rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white'>
                                    <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className='focus:outline-none transform transition-transform duration-300 hover:scale-110'
                                    >
                                        <path
                                            d="M14 21L12 23L10 21H4.99509C3.89323 21 3 20.1074 3 19.0049V4.99509C3 3.89323 3.89262 3 4.99509 3H19.0049C20.1068 3 21 3.89262 21 4.99509V19.0049C21 20.1068 20.1074 21 19.0049 21H14ZM6.35687 18H17.8475C16.5825 16.1865 14.4809 15 12.1022 15C9.72344 15 7.62182 16.1865 6.35687 18ZM12 13C13.933 13 15.5 11.433 15.5 9.5C15.5 7.567 13.933 6 12 6C10.067 6 8.5 7.567 8.5 9.5C8.5 11.433 10.067 13 12 13Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div className='text-lg font-medium'>
                                        {userData.user.name}
                                    </div>
                                </div>
                                <div className='absolute top-full left-0 w-full shadow bg-white p-1 rounded-md hidden group-hover:block'>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <div className='flex items-center justify-center gap-x-2 py-2 bg-white rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white'>
                                                    <svg
                                                        width="20px"
                                                        height="20px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className='focus:outline-none transform transition-transform duration-300 hover:scale-110'
                                                    >
                                                        <path
                                                            d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <div className='text-lg font-medium'>
                                                        History
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={handleLogout}>
                                                <div className='flex items-center justify-center gap-x-2 py-2 bg-white rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white'>
                                                    <svg
                                                        width="20px"
                                                        height="20px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className='focus:outline-none transform transition-transform duration-300 hover:scale-110'
                                                    >
                                                        <path
                                                            d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <div className='text-lg font-medium'>
                                                        Logout
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                            :
                            <div
                                onClick={toggleLoginModal}
                                className='w-full cursor-pointer flex items-center justify-center gap-x-2 bg-white p-2 shadow rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white'
                            >
                                <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className='focus:outline-none transform transition-transform duration-300 hover:scale-110'
                                >
                                    <path
                                        d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <div className='text-lg font-medium'>
                                    Login
                                </div>
                            </div>
                    }
                </div>
            </section>

            {/* hero section */}
            <section className='max-w-[1360px] mx-auto flex items-center px-4 pt-10 md:px-10 md:pt-20'>
                <div className='flex items-center w-full'>
                    <div className='w-full md:w-1/2'>
                        <img
                            src={LogoBlack}
                            alt="fixitnow logo"
                            className='w-12 md:w-16'
                        />
                        <h1 className='mt-4 text-black text-[30px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Help is Just Around the Corner</h1>
                        <div className='font-roboto w-full md:w-[400px] mt-8'>
                            <form
                                onSubmit={handleServiceProviderListModal}
                                className='grid grid-cols-1 gap-3'
                            >
                                <div
                                    onClick={handleLocationInputRef}
                                    className='flex items-center justify-between py-[10px] px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <div className='mr-3'>
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Service location"
                                            className='focus:outline-none'
                                        >
                                            <path
                                                d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={serviceLocationValue}
                                        onChange={handleServiceLocationChange}
                                        ref={locationInputRef}
                                        required
                                        tabIndex={1}
                                        placeholder='Service location'
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                </div>
                                <div
                                    onClick={handleServicesInputRef}
                                    className='relative flex items-center justify-between py-[10px] px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <div className='mr-3'>
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className='focus:outline-none'
                                        >
                                            <path
                                                d="M5.32943 3.27158C6.56252 2.8332 7.9923 3.10749 8.97927 4.09446C9.96652 5.08171 10.2407 6.51202 9.80178 7.74535L20.6465 18.5902L18.5252 20.7115L7.67936 9.86709C6.44627 10.3055 5.01649 10.0312 4.02952 9.04421C3.04227 8.05696 2.7681 6.62665 3.20701 5.39332L5.44373 7.63C6.02952 8.21578 6.97927 8.21578 7.56505 7.63C8.15084 7.04421 8.15084 6.09446 7.56505 5.50868L5.32943 3.27158ZM15.6968 5.15512L18.8788 3.38736L20.293 4.80157L18.5252 7.98355L16.7574 8.3371L14.6361 10.4584L13.2219 9.04421L15.3432 6.92289L15.6968 5.15512ZM8.62572 12.9333L10.747 15.0546L5.79729 20.0044C5.2115 20.5902 4.26175 20.5902 3.67597 20.0044C3.12464 19.453 3.09221 18.5793 3.57867 17.99L3.67597 17.883L8.62572 12.9333Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        ref={servicesInputRef}
                                        required
                                        tabIndex={2}
                                        placeholder='Service type (e.g., Electrician)'
                                        value={serviceProviderValue}
                                        onChange={handleServiceProviderChange}
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
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
                                                        <div>
                                                            <div className='h-[20px] w-[20px]'>
                                                                <img src={service?.icon} className='w-full h-full object-contain' />
                                                            </div>
                                                        </div>
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
                                    <button
                                        tabIndex={3}
                                        className='font-poppins py-3 px-[25px] text-white bg-black hover:bg-[#333] rounded-md text-base font-medium leading-[20px]'
                                    >
                                        view
                                    </button>
                                </div>
                                <div
                                    onClick={toggleLoginModal}
                                    tabIndex={4}
                                    className="text-base mt-5 w-fit group relative cursor-pointer"
                                >
                                    <div className="text-sm md:text-base group-hover:text-black transition duration-300">
                                        Already have an account? Sign in
                                    </div>
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

            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-10'>
                    <div className=''>
                        <img src={AboutImg} />
                    </div>
                    <div className='text-justify'>
                        <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>About Fixitnow</h1>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>At Fixitnow, we believe that finding the right service professional should be simple, seamless, and stress-free. Our platform connects users with skilled and trusted service providers across a wide range of industries, from home repairs and maintenance to personal care, automotive services, and more.</p>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>We are dedicated to making life easier by bringing expert help right to your doorstep. Whether you need a plumber to fix a leak, a beautician for an at-home makeover, or a handyman for urgent repairs, we've got you covered.</p>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>Our mission is to empower both customers and service providers by creating a trusted space where quality meets convenience. We prioritize safety, reliability, and transparency, ensuring that every service provider on our platform is verified and reviewed by real users. With On Hand Services Provide, help is always within reach—just a few clicks away. Experience a new standard of service with us, where your needs come first, and your satisfaction is our top priority.</p>
                    </div>
                </div>
            </section>

            {/* services section */}
            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Our Services</h1>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 mt-10'>
                    {
                        serviceCategory.map((service, index) =>
                            <div key={index} className='border border-[#CCC] hover:border-black cursor-pointer rounded-md py-3 group'>
                                <div className='h-[80px] w-[50px] mx-auto'>
                                    <img src={service?.icon} className='w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110' />
                                </div>
                                <div className='text-center text-sm mt-3'>
                                    {service?.title}
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>

            {/* Key features */}
            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Key Features</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
                    <div className='grid grid-cols-1 gap-5'>
                        {keyFeatures.map(features => (
                            <div key={features.id}>
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => toggleKeyFeatures(features.id)}
                                >
                                    <img
                                        className={`w-2 mr-5 transform transition-transform duration-500 ${activeId === features.id ? 'rotate-90' : 'rotate-0'
                                            }`}
                                        src={RightAngleArrow}
                                        alt="Arrow"
                                    />
                                    <h1 className="text-lg md:text-2xl font-poppins font-medium">
                                        {features.title}
                                    </h1>
                                </div>
                                <div
                                    className={`ml-7 mt-1 overflow-hidden transition-all duration-500 ease-in-out ${activeId === features.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-base md:text-lg text-justify font-roboto">
                                        {features.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <img src={KeyFeatures} alt="Key features" />
                    </div>
                </div>
            </section>

            {/* Contact us */}
            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins text-center'>Contact us</h1>
                <div className='w-full md:w-1/2 mt-10 mx-auto'>
                    <form className='w-full'>
                        <div
                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                        >
                            <div className='mr-3'>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className='w-5 focus:outline-none'
                                >
                                    <path
                                        d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder='Enter your full name'
                                required
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                            />
                        </div>
                        <div
                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                        >
                            <div className='mr-3'>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className='w-5 focus:outline-none'
                                >
                                    <path
                                        d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                required
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                            />
                        </div>
                        <div
                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                        >
                            <div className='mr-3'>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className='w-5 focus:outline-none'
                                >
                                    <path
                                        d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM6 7V9H14V7H6ZM6 11V13H14V11H6ZM6 15V17H11V15H6Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder='Enter your subject (e.g., Service Issue, General Inquiry)'
                                required
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                            />
                        </div>
                        <div
                            className='flex items-start justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                        >
                            <div className='mr-3'>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className='w-5 focus:outline-none'
                                >
                                    <path
                                        d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM7 10V12H9V10H7ZM11 10V12H13V10H11ZM15 10V12H17V10H15Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <textarea
                                placeholder='Message'
                                required
                                rows={5}
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                            >
                            </textarea>
                        </div>
                        <button
                            className='w-full md:w-fit mt-5 font-poppins py-[10px] px-6 text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none'
                        >
                            contact
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-black w-full px-4 md:px-10 py-5 mt-10 md:mt-20'>
                <div className='max-w-[1360px] mx-auto block md:flex items-center justify-between'>
                    <div className='flex md:block items-center justify-center'>
                        <img className='w-10' src={LogoWhite} />
                    </div>
                    <div className='text-white text-sm md:text-base text-center md:text-right mt-5 md:mt-0'>
                        <p>© {currentYear} fixitnow, All Rights Reserved</p>
                    </div>
                </div>
            </footer>

            {
                loginFormModal && <LoginForm />
            }

            {
                isSignupForm && <SignupForm />
            }

            {
                isOpenServiceProviderListModal &&
                <ServiceProviderList
                    serviceLocation={serviceLocationValue}
                    serviceType={serviceProviderValue}
                    openServiceModal={handleServiceModal}
                    closeClick={closeServiceProviderListModal}
                />
            }

            {
                isOpenServiceModal &&
                <ServiceModal />
            }

            {
                isOpenLoading &&
                <RequestLoading />
            }
        </>
    )
}

export default LandingPage
