import React from 'react'
import { UserContextProvider } from '../src/context/UserContext'
import LandingPage from './components/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLandingPage from './provider-dashboard/LandingPage'
import History from './provider-dashboard/History'
import VerifyCodeInput from './provider-dashboard/VerifyCodeInput'
import ChatComponent from './provider-dashboard/ChatComponent'

const App: React.FC = () => {
    return (
        <>
            <Router>
                <UserContextProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/provider-dashboard/*" element={<DashboardLandingPage />}>
                            <Route path="history" element={<History />} />
                            <Route path="verify-code" element={<VerifyCodeInput />} />
                            <Route path="chat" element={<ChatComponent />} />
                        </Route>
                    </Routes>
                </UserContextProvider>
            </Router>
        </>
    )
}

export default App
