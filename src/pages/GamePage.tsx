import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'

import { useGameContext } from 'contexts'
import { Button, Card, Divider, HomeIcon, Loading } from 'components'

import styles from './GamePage.module.css'

const { container, navigation, textContent, actionWrapper } = styles

const GamePage: React.FC = () => {
    const { storyStore, getStoresStatus } = useGameContext()
    const { content, choices, makeChoice, isFinished } = storyStore
    const navigate = useNavigate()

    useEffect(() => {
        if (getStoresStatus() !== 'READY') {
            navigate('/welcome')
        }
    }, [getStoresStatus, navigate])
    useEffect(() => {
        if (isFinished) {
            navigate('/thank-you')
        }
    }, [isFinished, navigate])

    if (getStoresStatus() === 'READY') {
        return (
            <Card isReadMode={true}>
                <div className={container}>
                    <nav className={navigation}>
                        <NavLink to='/' end>
                            <HomeIcon data-test-id={'home-page-button'} />
                        </NavLink>
                    </nav>
                    <main className={textContent}>
                        {content &&
                            content.map(({ text, tags }, i) => {
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
                            {choices &&
                                choices.map(({ index, text, props }) => (
                                    <Button
                                        key={index}
                                        dataTestId={`choice-${index}`}
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

    if (getStoresStatus() === 'ERROR') {
        return <h1>ERROR</h1>
    }

    return <Loading />
}

export default GamePage
