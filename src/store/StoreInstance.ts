import GameStore from './game/GameStore'
import StoryStore from './story/StoryStore'

import type { InkStoryData } from 'libs/entities'

let gameStoreInstance: GameStore | null
let storyStoreInstance: StoryStore | null

const initStores = (storyContent: InkStoryData, playerName: string) => {
    if (!gameStoreInstance || !storyStoreInstance) {
        gameStoreInstance = new GameStore(playerName)
        storyStoreInstance = new StoryStore(
            storyContent,
            gameStoreInstance.handleInkFunction.bind(gameStoreInstance)
        )
    }
}

const getGameStore = (): GameStore | null => {
    return gameStoreInstance
}

const getStoryStore = (): StoryStore | null => {
    return storyStoreInstance
}

const areStoresInitialized = (): boolean =>
    Boolean(gameStoreInstance && storyStoreInstance)

const resetStores = (): void => {
    gameStoreInstance = null
    storyStoreInstance = null
}

export {
    areStoresInitialized,
    initStores,
    getGameStore,
    getStoryStore,
    resetStores
}
