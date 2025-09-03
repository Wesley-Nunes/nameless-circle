import { useCallback, useEffect, useState } from 'react'

import { GameStore, StoryStore } from 'store'
import GameContext from './GameContext'

import type React from 'react'
import type { InkStoryData } from 'libs/entities'
import type { StoresStatus } from './GameContext'
import type { Choice, Content } from 'store'

const GameProvider: React.FC<{
    storyContent: InkStoryData
    children: React.ReactNode
}> = ({ storyContent, children }) => {
    const [status, setStatus] = useState<StoresStatus>('IDLE')
    const [_gameStore, setGameStore] = useState<GameStore | null>(null)
    const [_storyStore, setStoryStore] = useState<StoryStore | null>(null)
    const [content, setContent] = useState<Content[] | null>([
        { text: null, tags: null }
    ])
    const [choices, setChoices] = useState<Choice[] | null>([
        { text: '', index: 0 }
    ])
    const [isFinished, setIsFinished] = useState<boolean>(false)

    useEffect(() => {
        if (status === 'IDLE') {
            try {
                setStatus('PENDING')
                const newGameStore = new GameStore()
                const newStoryStore = new StoryStore(
                    storyContent,
                    newGameStore.handleInkFunction.bind(newGameStore)
                )
                setContent(newStoryStore.content)
                setChoices(newStoryStore.choices)
                setIsFinished(newStoryStore.isFinished)

                setStatus('SUCCESS')

                setGameStore(newGameStore)
                setStoryStore(newStoryStore)

                setStatus('READY')
            } catch (e) {
                console.error(e)
                setStatus('ERROR')
            }
        }
    }, [status, storyContent])
    useEffect(() => {
        if (status === 'READY') {
            _storyStore?.onUpdate(() => {
                setContent(_storyStore.content)
                setChoices(_storyStore.choices)
                setIsFinished(_storyStore.isFinished)
            })
        }
    }, [status, _storyStore])
    const makeChoice = useCallback(
        (index: number) => _storyStore?.makeChoice(index),
        [_storyStore]
    )
    const setPlayerName = useCallback(
        (name: string) => _gameStore?.setPlayerName(name),
        [_gameStore]
    )
    const getPlayerName = useCallback(
        () => _gameStore?.getPlayerName() || '',
        [_gameStore]
    )

    const resetStores = useCallback(() => {
        setStatus('PENDING')

        setGameStore(null)
        setStoryStore(null)
        setContent(null)
        setChoices(null)
        setIsFinished(false)

        setStatus('IDLE')
    }, [])
    const getStoresStatus = () => status
    const gameStore = {
        setPlayerName,
        getPlayerName
    }
    const storyStore = {
        content,
        choices,
        makeChoice,
        isFinished
    }

    return (
        <GameContext.Provider
            value={{
                resetStores,
                getStoresStatus,
                gameStore,
                storyStore
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider
