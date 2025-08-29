import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'

import { areStoresInitialized, useStoryStore } from 'store'

import {
    Button,
    Card,
    Divider,
    HomeIcon,
    EndGameMessage,
    Loading
} from 'components'

import styles from './GamePage.module.css'

const { container, navigation, textContent, actionWrapper } = styles

const GamePage: React.FC = () => {
    const { content, choices, makeChoice, isStoryFinished } = useStoryStore()
    const [storesInitialized, setStoresInitialized] = useState(
        areStoresInitialized()
    )
    const navigate = useNavigate()

    useEffect(() => {
        if (!areStoresInitialized()) {
            navigate('/welcome')
            return
        }

        setStoresInitialized(true)
    }, [navigate])

    if (!storesInitialized) {
        return <Loading />
    }

    if (isStoryFinished) {
        return (
            <Card isReadMode={true}>
                <EndGameMessage />
            </Card>
        )
    }

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
