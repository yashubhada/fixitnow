import React from 'react'
import { UserContextProvider } from '../src/context/UserContext'
import LandingPage from './components/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './provider-dashboard/Home'
import LoginForm from './components/LoginForm'

const App: React.FC = () => {
    return (
        <>
            <Router>
                <UserContextProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/provider-dashboard" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </UserContextProvider>
            </Router>
        </>
    )
}

export default App
