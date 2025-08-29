import { useState } from 'react'

import { getStoryStore } from '../StoreInstance'

const useStoryStore = () => {
    const storyStore = getStoryStore() || {
        content: [],
        choices: [],
        onUpdate: () => {},
        makeChoice: () => {},
        isStoryFinished: false
    }
    const [content, setContent] = useState(storyStore.content)
    const [choices, setChoices] = useState(storyStore.choices)
    const [isStoryFinished, setStoryFinishedState] = useState(
        storyStore.isFinished
    )

    storyStore.onUpdate(() => {
        setContent(storyStore.content)
        setChoices([...storyStore.choices])
        setStoryFinishedState(storyStore.isFinished)
    })

    return {
        content,
        choices,
        makeChoice: storyStore.makeChoice.bind(storyStore),
        isStoryFinished
    }
}

export default useStoryStore
