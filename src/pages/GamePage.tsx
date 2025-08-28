import React from 'react'
import { NavLink } from 'react-router'

import { useStoryStore } from 'store/story'

import { Button, Card, Divider, HomeIcon } from 'components'

import styles from './GamePage.module.css'

const { container, navigation, textContent, actionWrapper } = styles

const GamePage: React.FC = () => {
    const { content, choices, makeChoice } = useStoryStore()

    return (
        <Card isReadMode={true}>
            <div className={container}>
                <nav className={navigation}>
                    <NavLink to='/' end>
                        <HomeIcon />
                    </NavLink>
                </nav>
                <main className={textContent}>
                    {content.map(({ text, tags }, i) => {
                        let classes = ''

                        if (tags?.length) {
                            classes = tags
                                .map(className => styles[className])
                                .join(' ')
                        }

                        return (
                            <p className={classes} key={i}>
                                {text}
                            </p>
                        )
                    })}
                    <div className={actionWrapper}>
                        <Divider />
                        {choices.map(({ index, text, props }) => (
                            <Button
                                key={index}
                                onClick={() => makeChoice(index)}
                                {...props}
                            >
                                {text}
                            </Button>
                        ))}
                    </div>
                </main>
            </div>
        </Card>
    )
}

export default GamePage
