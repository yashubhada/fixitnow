import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Profile: React.FC<{ onClose: () => void; }> = ({ onClose }) => {

    const { baseUrl, userData, showToast } = useContext(UserContext);

    interface ProfileType {
        name?: string;
        avatar?: any;
    }

    const [profile, setProfile] = useState<ProfileType>({
        name: userData?.user?.name,
        avatar: userData?.user?.avatar
    });

    const [newProfile, setNewProfile] = useState<ProfileType>({});

    const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const avatarFileRef = useRef<HTMLInputElement>(null);

    const handleEditAvatarClick = () => {
        if (avatarFileRef.current) {
            avatarFileRef.current.click();
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDisableBtn(false);
        const { name, value, files } = e.target;

        if (name === "avatar" && files && files[0]) {
            const selectedFile = files[0];
            const fileType = selectedFile.type;

            const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
            if (validExtensions.includes(fileType)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfile((prevData) => ({
                        ...prevData,
                        avatar: reader.result,
                    }));
                    setNewProfile((prev) => ({
                        ...prev,
                        avatar: selectedFile,
                    }));
                };
                reader.readAsDataURL(selectedFile);
            } else {
                showToast("Only .jpg, .jpeg, and .png images are allowed", "error");
            }
        }
        else {
            setNewProfile((prev) => ({
                ...prev,
                [name]: value,
            }));
            setProfile((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUpdateProfile: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsBtnLoading(true);
        try {
            const formData = new FormData();
            if (newProfile.name) {
                formData.append("name", newProfile.name);
            }
            if (newProfile.avatar) {
                formData.append("avatar", newProfile.avatar);
            }
            const response = await axios.patch(`${baseUrl}api/user/handleUpdateTaker/${userData.user.id}`,
                formData,
                { withCredentials: true }
            );
            showToast(response.data.message, "success");
            console.log(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 400) {
                        showToast(err.response.data.message, "error");
                    }
                }
            }
        } finally {
            setIsBtnLoading(false);
        }
    }

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
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">Profile</h1>
                    <form onSubmit={handleUpdateProfile} className='w-full'>
                        <div className='flex justify-center mb-7'>
                            <div className='relative'>
                                <img
                                    src={profile.avatar}
                                    className='w-28 h-28 rounded-full'
                                />
                                <div
                                    onClick={handleEditAvatarClick}
                                    className='bg-white w-9 h-9 text-center rounded-full absolute -top-1 -right-1 cursor-pointer shadow'
                                >
                                    <i className="ri-pencil-fill leading-9 text-xl"></i>
                                </div>
                                <input
                                    type="file"
                                    ref={avatarFileRef}
                                    onChange={handleFormChange}
                                    name="avatar"
                                    className='hidden'
                                />
                            </div>
                        </div>
                        <div
                            className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                        >
                            <i className="ri-user-line text-xl mr-3"></i>
                            <input
                                type="text"
                                autoComplete='off'
                                placeholder='Enter your name'
                                value={profile.name}
                                name='name'
                                onChange={handleFormChange}
                                required
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                            />
                        </div>
                        <div
                            className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                        >
                            <i className="ri-mail-line text-xl mr-3"></i>
                            <input
                                type="text"
                                autoComplete='off'
                                value={userData?.user?.email}
                                readOnly
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                            />
                        </div>
                        <button
                            type="submit"
                            className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                            disabled={isDisableBtn || isBtnLoading}
                        >
                            {
                                isBtnLoading
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
                                        saving...
                                    </>
                                    :
                                    'save changes'
                            }
                        </button>
                    </form>
                    <div
                        onClick={onClose}
                        className='bg-black w-7 h-7 text-center rounded-full absolute -top-3 -right-3 cursor-pointer'
                    >
                        <i className="ri-close-line text-white leading-7 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
