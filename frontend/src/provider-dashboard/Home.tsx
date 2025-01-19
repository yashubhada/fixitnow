import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const { getLoggedInUserData, userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        getLoggedInUserData();
    }, []);

    useEffect(() => {
        if (!userData || userData.user.role !== "serviceProvider") {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <h1>Home</h1>
        </>
    )
}

export default Home
