import { useEffect, useState } from 'react'
import { getStoryStore } from './StoryInstance'

const useStoryStore = () => {
    const storyStore = getStoryStore()
    const [content, setContent] = useState(storyStore.content)
    const [choices, setChoices] = useState(storyStore.choices)

    useEffect(() => {
        storyStore.onUpdate(() => {
            setContent(storyStore.content)
            setChoices([...storyStore.choices])
        })

        return () => storyStore.onUpdate(null)
    }, [storyStore])

    return {
        content,
        choices,
        makeChoice: storyStore.makeChoice.bind(storyStore)
    }
}

export default useStoryStore

