import { useContext } from 'react'

import GameContext, { type GameContextType } from './GameContext'

const useGameContext = () => {
    const context = useContext(GameContext)

    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider')
    }

    return context as GameContextType
}

export default useGameContext
