import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import './styles/variables.css'
import './styles/normalize.css'
import './styles/globals.css'

import { GamePage, HomePage, WelcomePage } from 'pages'

const root = document.getElementById('root')!

createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/game' element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
