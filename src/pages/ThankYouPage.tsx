import React, { useEffect } from 'react'

import { Button, Card } from 'components'
import { resetStores } from 'store'

import styles from './ThankYouPage.module.css'
import { Link } from 'react-router'

const {
    centralize,
    message,
    subtitle,
    subtitleVariation,
    linksContainer,
    links,
    buttonWrapper
} = styles

const ThankYouPage: React.FC = () => {
    useEffect(() => {
        resetStores()
    }, [])

    return (
        <Card isReadMode={true}>
            <div className={centralize}>
                <div className={message}>
                    <h2 className={subtitle}>Thanks for Playing!</h2>
                    <div>
                        <p>You've reached the end of the current prototype.</p>
                        <p>
                            New versions are in development — soon this
                            prototype will have more content!
                        </p>
                    </div>
                    <div className={linksContainer}>
                        <h2 className={subtitleVariation}>
                            Stay tuned for updates:
                        </h2>
                        <ul>
                            <li className={links}>
                                {' '}
                                <a
                                    href='mailto:wesnmonteiro@gmail.com'
                                    target='_blank'
                                >
                                    Email
                                </a>
                            </li>
                            <li className={links}>
                                {' '}
                                <a
                                    href='https://linkedin.com/in/dev-wesley-nunes'
                                    target='_blank'
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li className={links}>
                                {' '}
                                <a
                                    href='https://github.com/Wesley-Nunes/nameless-circle'
                                    target='_blank'
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={buttonWrapper}>
                        <Link to='/'>
                            <Button dataTestId='home-page-button'>Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ThankYouPage
