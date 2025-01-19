import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import RoleImg1 from '../images/service-provider.png'
import RoleImg2 from '../images/user.png'
import { UserContext } from '../context/UserContext';

const SignupForm: React.FC = () => {

    const { baseUrl, closeSignupForm, openLoginModal, showToast } = useContext(UserContext);

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

    // Show and hide password    
    const [showUserPassword, setShowUserPassword] = useState<boolean>(true);
    const handleUserTogglePassword = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowUserPassword((prev) => !prev);
    };

    const [selectedRole, setSelectedRole] = useState('serviceTaker');

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
    };

    const [isUserSignUpFormLoading, setIsUserSignUpFormLoading] = useState<boolean>(false);

    // image chage
    const [userAvatarImg, setUserAvatarImg] = useState<File | null>(null);

    // user data for sign up

    const [userData, setUserData] = useState<{
        name: string;
        password: string;
        email: string;
        avatar: File | null;
    }>({
        name: "",
        password: "",
        email: "",
        avatar: null,
    });

    const handleUserAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validExtensions = ["image/jpeg", "image/png", "image/jpg"];

            if (validExtensions.includes(fileType)) {
                setUserAvatarImg(file);

                // Update userData state
                setUserData((prevData) => ({
                    ...prevData,
                    avatar: file,
                }));
            } else {
                showToast("Only .jpg, .jpeg, and .png images are allowed", "error");
            }
        }
    };

    const handleUserSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsUserSignUpFormLoading(true);
        try {
            if (userData.password.length < 8) {
                return showToast("Password length must be 8 characters or longer", "error");
            }

            // Create FormData instance and append the fields
            const userFormData = new FormData();
            userFormData.append("name", userData.name);
            userFormData.append("email", userData.email);
            userFormData.append("password", userData.password);
            if (userData.avatar) {
                userFormData.append("avatar", userData.avatar);
            }

            const response = await axios.post(`${baseUrl}api/user/userSignup`, userFormData);
            showToast(response.data.message, "success");
            if (response.data.success) {
                openLoginModal();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 400) {
                        showToast(err.response.data.message, "error");
                    }
                }
            }
        } finally {
            setIsUserSignUpFormLoading(false);
        }
    };

    const handleUserSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    // provider form

    const [showProviderPassword, setShowProviderPassword] = useState<boolean>(true);
    const handleProviderTogglePassword = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowProviderPassword((prev) => !prev);
    };

    const [isProviderSignUpFormLoading, setIsProviderSignUpFormLoading] = useState<boolean>(false);

    // image chage
    const [providerAvatarImg, setProviderAvatarImg] = useState<File | null>(null);
    const [providerIdentityProof, setProviderIdentityProof] = useState<File | null>(null);

    // user data for sign up

    const [providerData, setProviderData] = useState<{
        name: string;
        email: string;
        service: string;
        price: number | null;
        address: string;
        password: string;
        avatar: File | null;
        identityProof: File | null;
    }>({
        name: "",
        email: "",
        service: "",
        price: 0,
        address: "",
        password: "",
        avatar: null,
        identityProof: null,
    });

    const handleProviderAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validExtensions = ["image/jpeg", "image/png", "image/jpg"];

            if (validExtensions.includes(fileType)) {
                setProviderAvatarImg(file);

                // Update setProviderData state
                setProviderData((prevData) => ({
                    ...prevData,
                    avatar: file,
                }));
            } else {
                showToast("Only .jpg, .jpeg, and .png images are allowed", "error");
            }
        }
    };

    const handleProviderIdentityProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validExtensions = ["application/pdf"];

            if (validExtensions.includes(fileType)) {
                setProviderIdentityProof(file);

                // Update setProviderData state
                setProviderData((prevData) => ({
                    ...prevData,
                    identityProof: file,
                }));
            } else {
                showToast("Only PDF files are allowed", "error");
            }
        }
    };

    const handleProviderSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsProviderSignUpFormLoading(true);
        try {
            if (providerData.password.length < 8) {
                return showToast("Password length must be 8 characters or longer", "error");
            }

            // Create FormData instance and append the fields
            const providerFormData = new FormData();
            providerFormData.append("name", providerData.name);
            providerFormData.append("email", providerData.email);
            providerFormData.append("service", providerData.service);
            providerFormData.append("price", providerData.price !== null ? providerData.price.toString() : "");
            providerFormData.append("address", providerData.address);
            providerFormData.append("password", providerData.password);
            if (providerData.avatar) {
                providerFormData.append("avatar", providerData.avatar);
            }
            if (providerData.identityProof) {
                providerFormData.append("identityProof", providerData.identityProof);
            }

            const response = await axios.post(`${baseUrl}api/user/providerSignup`, providerFormData);
            showToast(response.data.message, "success");
            if (response.data.success) {
                openLoginModal();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 400) {
                        showToast(err.response.data.message, "error");
                    }
                }
            }
        } finally {
            setIsProviderSignUpFormLoading(false);
        }
    };

    const handleProviderSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProviderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in max-h-[530px]">
                        <div className="grid grid-cols-2 gap-5 items-stretch justify-items-center mb-5">
                            <label
                                className={`relative flex items-center justify-between p-6 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all w-full ${selectedRole === 'serviceTaker' ? 'border-black bg-gray-50' : ''
                                    }`}
                                onClick={() => handleRoleChange('serviceTaker')}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    className="sr-only peer"
                                    checked={selectedRole === 'serviceTaker'}
                                    readOnly
                                />
                                <div>
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                        <img src={RoleImg2} alt="ClientRoleImg" className="w-[25px]" />
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-base text-center">Service Taker</h3>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all">
                                    <span className="w-2 h-2 bg-white rounded-full peer-checked:block hidden"></span>
                                </span>
                                <div className="absolute inset-0 border-2 rounded-lg border-transparent peer-checked:border-black transition-all"></div>
                            </label>

                            <label
                                className={`relative flex items-center justify-between p-6 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all w-full ${selectedRole === 'serviceProvider' ? 'border-black bg-gray-50' : ''
                                    }`}
                                onClick={() => handleRoleChange('serviceProvider')}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    className="sr-only peer"
                                    checked={selectedRole === 'serviceProvider'}
                                    readOnly
                                />
                                <div>
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                        <img src={RoleImg1} alt="FreeLancerRoleImg" className="w-[25px]" />
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-base text-center">Service Provider</h3>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all">
                                    <span className="w-2 h-2 bg-white rounded-full peer-checked:block hidden"></span>
                                </span>
                                <div className="absolute inset-0 border-2 rounded-lg border-transparent peer-checked:border-black transition-all"></div>
                            </label>
                        </div>

                        <div className='w-full'>

                            {
                                selectedRole === 'serviceTaker'
                                    ?
                                    <form onSubmit={handleUserSignUp} className='w-full max-h-[300px] md:max-h-[350px] overflow-y-scroll overflow-x-hidden custom-scrollbar'>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <div className='mr-3'>
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                onChange={handleUserSignUpChange}
                                                name="name"
                                                value={userData.name}
                                                autoComplete='off'
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
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                onChange={handleUserSignUpChange}
                                                name="email"
                                                value={userData.email}
                                                autoComplete='off'
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
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-label="Lock"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm3 8V7a3 3 0 1 0-6 0v3h6zm-3 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type={
                                                    showUserPassword ? 'password' : 'text'
                                                }
                                                placeholder='Enter your password'
                                                onChange={handleUserSignUpChange}
                                                name="password"
                                                value={userData.password}
                                                autoComplete='off'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                            <div
                                                onClick={handleUserTogglePassword}
                                                className='ml-3'
                                            >
                                                {
                                                    showUserPassword
                                                        ?
                                                        <svg
                                                            width="20px"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className='cursor-pointer focus:outline-none'
                                                        >
                                                            <path
                                                                d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        :
                                                        <svg
                                                            width="20px"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className='cursor-pointer focus:outline-none'
                                                        >
                                                            <path
                                                                d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-pointer w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                                        >
                                            <div className="mr-3">
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="focus:outline-none"
                                                >
                                                    <path
                                                        d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <label htmlFor="fileUpload" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent outline-none focus:text-black truncate">
                                                {userAvatarImg ? userAvatarImg.name : "Choose a file"}
                                            </label>
                                            <input
                                                id="fileUpload"
                                                type="file"
                                                onChange={handleUserAvatarChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                            disabled={isUserSignUpFormLoading}
                                        >
                                            {
                                                isUserSignUpFormLoading
                                                    ?
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
                                                    :
                                                    'Sign up'
                                            }
                                        </button>
                                        <div className='my-7 relative'>
                                            <div className='w-full p-[0.1px] bg-[#3333]'></div>
                                            <div className="w-fit bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                Or
                                            </div>
                                        </div>
                                        <div className="text-center text-base"
                                            onClick={openLoginModal}
                                        >
                                            <span className='cursor-pointer'>
                                                Already have an account? Sign in
                                            </span>
                                        </div>
                                    </form>
                                    :
                                    <form onSubmit={handleProviderSignUp} className='w-full max-h-[300px] md:max-h-[350px] overflow-y-scroll overflow-x-hidden custom-scrollbar'>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <div className='mr-3'>
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='name'
                                                value={providerData.name}
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
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='email'
                                                value={providerData.email}
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
                                                    width="24px"
                                                    height="24px"
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
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='service'
                                                value={providerData.service}
                                                placeholder='Enter your service (e.g., Electrician)'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <div className='mr-3'>
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="number"
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='price'
                                                value={providerData.price?.toString()}
                                                placeholder='Enter your hourly price (e.g., 500)'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <div className='mr-3'>
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
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
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='address'
                                                value={providerData.address}
                                                placeholder='Enter your service address'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <div className='mr-3'>
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-label="Lock"
                                                    className='focus:outline-none'
                                                >
                                                    <path
                                                        d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm3 8V7a3 3 0 1 0-6 0v3h6zm-3 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type={
                                                    showProviderPassword ? 'password' : 'text'
                                                }
                                                placeholder='Enter your password'
                                                onChange={handleProviderSignUpChange}
                                                name='password'
                                                value={providerData.password}
                                                autoComplete='off'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                            <div
                                                onClick={handleProviderTogglePassword}
                                                className='ml-3'
                                            >
                                                {
                                                    showProviderPassword
                                                        ?
                                                        <svg
                                                            width="20px"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className='cursor-pointer focus:outline-none'
                                                        >
                                                            <path
                                                                d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        :
                                                        <svg
                                                            width="20px"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className='cursor-pointer focus:outline-none'
                                                        >
                                                            <path
                                                                d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-pointer w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                                        >
                                            <div className="mr-3">
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="focus:outline-none"
                                                >
                                                    <path
                                                        d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <label htmlFor="providerAvatar" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent outline-none focus:text-black truncate">
                                                {providerAvatarImg ? providerAvatarImg.name : "Choose your avtar"}
                                            </label>
                                            <input
                                                id="providerAvatar"
                                                type="file"
                                                onChange={handleProviderAvatarChange}
                                                className="hidden"
                                            />

                                        </div>
                                        <div
                                            className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-pointer w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                                        >
                                            <div className="mr-3">
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="focus:outline-none"
                                                >
                                                    <path
                                                        d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <label htmlFor="providerIdentityProof" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent outline-none focus:text-black truncate">
                                                {providerIdentityProof ? providerIdentityProof.name : "Upload your work license"}
                                            </label>
                                            <input
                                                id="providerIdentityProof"
                                                type="file"
                                                onChange={handleProviderIdentityProofChange}
                                                className="hidden"
                                            />

                                        </div>
                                        <button
                                            type="submit"
                                            className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                            disabled={isProviderSignUpFormLoading}
                                        >
                                            {
                                                isProviderSignUpFormLoading
                                                    ?
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
                                                    :
                                                    'Sign up'
                                            }
                                        </button>
                                        <div className='my-7 relative'>
                                            <div className='w-full p-[0.1px] bg-[#3333]'></div>
                                            <div className="w-fit bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                Or
                                            </div>
                                        </div>
                                        <div className="text-center text-base"
                                            onClick={openLoginModal}
                                        >
                                            <span className='cursor-pointer'>
                                                Already have an account? Sign in
                                            </span>
                                        </div>
                                    </form>
                            }
                        </div>
                        <div
                            onClick={closeSignupForm}
                            className='bg-black p-1 rounded-full absolute -top-3 -right-3 cursor-pointer'
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                className="focus:outline-none"
                            >
                                <path
                                    d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignupForm
