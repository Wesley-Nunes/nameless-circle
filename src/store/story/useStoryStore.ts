import { useState } from 'react'

import { getStoryStore } from './StoryInstance'

const useStoryStore = () => {
    const storyStore = getStoryStore()
    const [content, setContent] = useState(storyStore.content)
    const [choices, setChoices] = useState(storyStore.choices)

    storyStore.onUpdate(() => {
        setContent(storyStore.content)
        setChoices([...storyStore.choices])
    })

    return {
        content,
        choices,
        makeChoice: storyStore.makeChoice.bind(storyStore)
    }
}

export default useStoryStore

