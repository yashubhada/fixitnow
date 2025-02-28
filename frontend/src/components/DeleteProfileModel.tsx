import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const DeleteProfileModel: React.FC<{ close: () => void }> = ({ close }) => {

    const { baseUrl, userData, setUserData, socket, showToast } = useContext(UserContext);

    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsBtnLoading(true);
        try {
            const response = await axios.delete(`${baseUrl}api/user/deleteAccount`, {
                data: {
                    id: userData?._id,
                    avatarPublicId: userData?.avatarPublicId,
                    identityProofPublicId: userData?.identityProofPublicId,
                    userRole: userData?.userRole
                },
                withCredentials: true
            });

            if (response.data.success) {
                socket?.disconnect();
                showToast(response.data.message, "success");
                setUserData(null);
                close();
                navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                showToast(err.response.data.message || "An error occurred", "error");
            }
        } finally {
            setIsBtnLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-20">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <div className='flex items-center gap-3 p-3 border-b'>
                        <div className='text-red-500 text-3xl md:text-4xl'>
                            <i className="ri-alert-line"></i>
                        </div>
                        <p className='text-lg md:text-xl text-red-500 font-semibold'>Delete Account</p>
                    </div>
                    <p className='p-3 font-semibold'>Are you sure you want to delete your account?</p>
                    <div className='flex items-center justify-end gap-3 p-3 border-t'>
                        <button
                            onClick={close}
                            className='px-3 py-2 text-white bg-black hover:bg-[#333] rounded'
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            onClick={handleDeleteAccount}
                            className='flex justify-center items-center px-3 py-2 text-red-600 bg-red-100 hover:bg-red-200 border border-red-500 rounded disabled:opacity-65 disabled:cursor-not-allowed'
                            disabled={isBtnLoading}
                        >
                            {
                                isBtnLoading
                                    ?
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-red-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                                        Deleting...
                                    </>
                                    :
                                    'Delete'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProfileModel
