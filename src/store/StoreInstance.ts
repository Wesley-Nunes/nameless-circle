import GameStore from './game/GameStore'
import StoryStore from './story/StoryStore'

import type { InkStoryData } from 'libs/entities'

let gameStoreInstance: GameStore
let storyStoreInstance: StoryStore

const initStores = (storyContent: InkStoryData, playerName: string) => {
    if (!gameStoreInstance || !storyStoreInstance) {
        gameStoreInstance = new GameStore(playerName)
        storyStoreInstance = new StoryStore(
            storyContent,
            gameStoreInstance.handleInkFunction.bind(gameStoreInstance)
        )
    }
}

const getGameStore = (): GameStore => {
    return gameStoreInstance
}

const getStoryStore = (): StoryStore => {
    return storyStoreInstance
}

const areStoresInitialized = (): boolean =>
    Boolean(gameStoreInstance && storyStoreInstance)

export { areStoresInitialized, initStores, getGameStore, getStoryStore }
