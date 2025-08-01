import React from 'react'

import { GamePage } from 'pages'

import { initStores } from 'store'
import { storyContent } from 'story'

const App: React.FC = () => {
    initStores(storyContent)

    return <GamePage />
}

export default App

