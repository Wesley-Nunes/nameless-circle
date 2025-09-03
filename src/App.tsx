import { BrowserRouter, Route, Routes } from 'react-router'

import { GameProvider } from 'contexts'
import { storyContent } from 'story'
import { GamePage, HomePage, ThankYouPage, WelcomePage } from 'pages'

import type React from 'react'

const App: React.FC = () => (
    <GameProvider storyContent={storyContent}>
        <BrowserRouter>
            <Routes>
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/game' element={<GamePage />} />
                <Route path='/thank-you' element={<ThankYouPage />} />
                <Route path='/*' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    </GameProvider>
)

export default App
