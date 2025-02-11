import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

interface ReviewFormProps {
    onClose: () => void;
    providerId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose, providerId }) => {

    const { baseUrl, showToast, userData } = useContext(UserContext);

    const [formData, setFormData] = useState({
        rating: 0,
        message: "",
    });

    const handleSpanClick = (index: number) => {
        const ratingValue = index + 1;
        setFormData((prev) => ({ ...prev, rating: ratingValue }));
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, message: e.target.value }));
    };

    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.rating !== 0) {
            setIsBtnLoading(true);
            try {
                const response = await axios.post(`${baseUrl}api/user/addReview/${providerId}`,
                    {
                        userId: userData._id,
                        userName: userData.name,
                        userAvatar: userData.avatar,
                        rating: formData.rating,
                        message: formData.message
                    }
                );
                if (response.data.success) {
                    showToast(response.data.message, "success");
                    onClose();
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    // Check for Axios-specific errors
                    if (err.response) {
                        showToast(err.response.data.message, "error");
                    }
                }
            } finally {
                setIsBtnLoading(false);
            }
        } else {
            showToast("Rating is required", "error");
        }
    };

    console.log(providerId);

    const ratingTitles = ["Poor", "Average", "Good", "Very Good", "Excellent"];

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <h1 className="text-black text-center text-lg md:text-2xl font-semibold font-poppins mb-7">Share Your Experience</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between items-center mb-4">
                            {[...Array(5)].map((_, index) => (
                                <i
                                    key={index}
                                    onClick={() => handleSpanClick(index)}
                                    className={`text-3xl cursor-pointer transition-all duration-300 ${formData.rating >= index + 1 ? "ri-star-fill text-black" : "ri-star-line text-gray-400"
                                        }`}
                                ></i>
                            ))}

                        </div>
                        <div className="h-2 w-full bg-gray-300 rounded-full relative mb-4">
                            <div
                                className="h-full bg-black rounded-full transition-all duration-300"
                                style={{ width: `${formData.rating * 20}%` }}
                            ></div>
                        </div>

                        <div className="text-center mb-4">
                            {formData.rating ? (
                                <p className="text-black font-medium">{ratingTitles[formData.rating - 1]}</p>
                            ) : (
                                <p className="text-gray-500">Select a rating</p>
                            )}
                        </div>

                        <textarea
                            placeholder="Write your review here..."
                            value={formData.message}
                            onChange={handleMessageChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
                            rows={4}
                            required
                        />

                        <div className='grid grid-cols-2 gap-5'>
                            <button
                                type="submit"
                                className='w-full flex items-center justify-center bg-black hover:bg-[#333] text-white py-2 rounded disabled:bg-[#333] disabled:cursor-not-allowed'
                                disabled={isBtnLoading}
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
                                            Submitting...
                                        </>
                                        :
                                        'Submit'
                                }
                            </button>
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className='w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
