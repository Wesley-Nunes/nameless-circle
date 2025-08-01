import type { InkStoryData } from 'story'
import StoryStore from './StoryStore'

let storyInstance: StoryStore | null = null

const initStoryStore = (storyContent: InkStoryData) => {
    if (!storyInstance) {
        storyInstance = new StoryStore(storyContent)
    }
}

const getStoryStore = (): StoryStore => {
    if (!storyInstance) {
        throw new Error('Story Store not initialized')
    }

    return storyInstance
}

export { initStoryStore, getStoryStore }

