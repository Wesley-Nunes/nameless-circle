import { createContext } from 'react'

import type { Choice, Content } from 'state/store'

export type StoresStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'
export type GameContextType = {
    resetStores: () => void
    getStoresStatus: () => StoresStatus
    gameStore: {
        setPlayerName: (name: string) => void
        getPlayerName: () => string
    }
    storyStore: {
        content: Content[] | null
        choices: Choice[] | null
        makeChoice: (choice: number) => void
        isFinished: boolean
    }
}

const GameContext = createContext<GameContextType | null>(null)

export default GameContext
