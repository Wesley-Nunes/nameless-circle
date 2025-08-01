import { GameStore } from './game'
import { StoryStore } from './story'

import type { InkStoryData } from 'story'

let gameStoreInstance: GameStore | null = null
let storyStoreInstance: StoryStore | null = null

const initStores = (storyContent: InkStoryData) => {
    if (!gameStoreInstance || !storyStoreInstance) {

        gameStoreInstance = new GameStore()
        storyStoreInstance = new StoryStore(
            storyContent,
            gameStoreInstance.handleInkFunction.bind(gameStoreInstance)
        )
    }
}

const getGameStore = (): GameStore => {
    if (!gameStoreInstance) {
        throw new Error('Game Store not initialized')
    }

    return gameStoreInstance
}

const getStoryStore = (): StoryStore => {
    if (!storyStoreInstance) {
        throw new Error('Story Store not initialized')
    }

    return storyStoreInstance
}

export { initStores, getGameStore, getStoryStore }

