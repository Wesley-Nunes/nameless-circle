import React from 'react'

import { useStoryStore } from 'store/story'

import { Card } from 'components/Card'

import styles from './GamePage.module.css'

const GamePage: React.FC = () => {
    const { content, choices, makeChoice } = useStoryStore()

    return (
        <Card>
            {content.map(({ text, tags }, i) => {
                let classes = ''

                if (tags?.length) {
                    classes = tags.map(className => styles[className]).join(' ')
                }

                return (
                    <p className={classes} key={i}>
                        {text}
                    </p>
                )
            })}
            {choices.map(choice => (
                <button
                    key={choice.index}
                    onClick={() => makeChoice(choice.index)}
                >
                    {choice.text}
                </button>
            ))}
        </Card>
    )
}

export default GamePage
