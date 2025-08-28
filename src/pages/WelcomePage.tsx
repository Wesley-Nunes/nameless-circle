import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'

import {
    Button,
    Card,
    HomeIcon,
    PulseEffect,
    SideToSideEffect,
    SpiderIcon,
    Title,
    TornadoIcon
} from 'components'

import styles from './WelcomePage.module.css'

const {
    container,
    navigation,
    header,
    author,
    description,
    action,
    subtitle,
    descriptionList,
    descriptionListItem,
    flexCol8,
    inputLabel,
    input,
    info,
    spiderEffect,
    tornadoEffect,
    inputError,
    inputErrorMessage
} = styles

const WelcomePage: React.FC = () => {
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value)
        setError('')
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!nickname.trim()) {
            setError('Nickname is required')
            return
        }
        if (nickname.length < 2) {
            setError('Nickname must be at least 2 characters long')
            return
        }
        if (nickname.length > 10) {
            setError('Nickname must be less than 10 characters')
            return
        }

        window.localStorage.setItem('heroName', nickname)
        navigate('/game')
    }

    return (
        <Card>
            <div className={container}>
                <nav className={navigation}>
                    <NavLink to='/' end>
                        <HomeIcon />
                    </NavLink>
                </nav>
                <header className={header}>
                    <Title>Nameless Circle</Title>
                    <p className={author}>
                        created by{' '}
                        <a
                            href='https://linkedin.com/in/dev-wesley-nunes'
                            target='_blank'
                        >
                            Wesley Nunes
                        </a>
                    </p>
                </header>
                <section className={`${description} ${flexCol8}`}>
                    <h2 className={subtitle}>You're a pioneer!</h2>
                    <p>This prototype is actively evolving, which means:</p>
                    <ul className={`${descriptionList} ${flexCol8}`}>
                        <li className={descriptionListItem}>
                            <SpiderIcon
                                className={spiderEffect}
                                width={24}
                                height={24}
                            />
                            <span>Expect unfinished elements & bugs</span>
                        </li>
                        <li className={descriptionListItem}>
                            <TornadoIcon
                                className={tornadoEffect}
                                width={24}
                                height={24}
                            />
                            <span>Systems may change radically</span>
                        </li>
                    </ul>
                </section>
                <main className={action}>
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className={flexCol8}
                    >
                        <h2 className={subtitle}>
                            Let's personalize your adventure!
                        </h2>
                        <label htmlFor='nickname' className={inputLabel}>
                            Enter a nickname:
                        </label>
                        <input
                            type='text'
                            name='nickname'
                            id='nickname'
                            className={`${input} ${error ? inputError : ''}`}
                            value={nickname}
                            onChange={handleChange}
                            required
                        />
                        {error && (
                            <div className={inputErrorMessage}>{error}</div>
                        )}
                        <p className={info}>
                            This name will be used for in-game references
                        </p>
                        <Button>Begin Journey</Button>
                    </form>
                </main>
            </div>
            <SideToSideEffect accentColor='positive' />
            <PulseEffect accentColor='danger' />
        </Card>
    )
}

export default WelcomePage
