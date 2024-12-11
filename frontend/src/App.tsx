import React from 'react'
import { UserContextProvider } from '../src/context/UserContext'
import LandingPage from './components/LandingPage'

const App: React.FC = () => {
    return (
        <>
            <UserContextProvider>
                <LandingPage />
            </UserContextProvider>
        </>
    )
}

export default App
