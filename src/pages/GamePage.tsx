import React from 'react'

import { useStoryStore } from 'store/story'

import { Button, Card } from 'components'

import styles from './GamePage.module.css'

const GamePage: React.FC = () => {
    const { content, choices, makeChoice } = useStoryStore()

    return (
        <Card>
            {content.map(({ text, tags }, i) => {
                let classes = `${styles['game-text']} `

                if (tags?.length) {
                    classes = tags.map(className => styles[className]).join(' ')
                }

                return (
                    <p className={classes} key={i}>
                        {text}
                    </p>
                )
            })}
            {choices.map(({ index, text, props }) => (
                <Button
                    key={index}
                    onClick={() => makeChoice(index)}
                    {...props}
                >
                    {text}
                </Button>
            ))}
        </Card>
    )
}

export default GamePage
