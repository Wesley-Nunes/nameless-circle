import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './ui/styles/variables.css'
import './ui/styles/normalize.css'
import './ui/styles/globals.css'

import App from 'App'

const root = document.getElementById('root')!

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>
)
