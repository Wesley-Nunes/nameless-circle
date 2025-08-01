import React from 'react'

import { GamePage } from 'pages'

import { initStoryStore } from 'store/story'
import { storyContent } from 'story'

const App: React.FC = () => {
    initStoryStore(storyContent)

    return <GamePage />
}

export default App

