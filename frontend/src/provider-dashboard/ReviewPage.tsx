import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const ReviewPage: React.FC = () => {
    const { baseUrl, userData, showToast } = useContext(UserContext);
    const [id, setId] = useState<string | null>(null);
    const [reviews, setReviews] = useState<any[]>([]); // Initialize as an empty array
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userData?._id) {
            setId(userData._id);
        }
    }, [userData]);

    const fetchProviderReview = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}api/user/fetchSingleProvider/${id}`);
            if (response.data.success) {
                setReviews(response.data.provider.reviews);
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
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProviderReview();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center w-full h-full'>
                <div className="spinner">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div
                            key={i}
                            className="spinner-blade"
                            style={{
                                animationDelay: `${i * 0.083}s`,
                                transform: `rotate(${i * 30}deg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='w-full md:w-[600px] mx-auto'>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className='border-b pb-5 mb-5'>
                        <div className='flex items-center mb-2'>
                            <img
                                src={review.userAvatar}
                                alt={review.userName}
                                className='w-14 h-14 rounded-full border mr-2'
                            />
                            <div>
                                <h1 className='text-lg font-medium'>{review.userName}</h1>
                                <div>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <i
                                            key={i}
                                            className={`ri-star-${i < review.rating ? 'fill' : 'line'}`}
                                        ></i>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className='pl-[64px] text-base'>{review.message}</p>
                    </div>
                ))
            ) : (
                <p className='text-center text-gray-500 mt-20'>No reviews found</p>
            )}
        </div>
    );
};

export default ReviewPage;