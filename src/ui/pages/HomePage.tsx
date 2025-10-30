import React from 'react'
import { Link } from 'react-router'

import {
    BottleTonicSkullIcon,
    Button,
    Card,
    DiceD20Icon,
    Divider,
    EmailIcon,
    GithubIcon,
    LinkedinIcon,
    ScrollIcon,
    SideToSideEffect,
    Title
} from 'ui/components'

import styles from './HomePage.module.css'

const {
    main,
    description,
    ctaContainer,
    features,
    featureIcon,
    featureItem,
    featureIconDice,
    featureIconScroll,
    featureIconBottle,
    footer,
    footerItem,
    footerItemText
} = styles

const HomePage: React.FC = () => (
    <>
        <Card>
            <main className={main}>
                <Title>Nameless Circle</Title>
                <Divider />
                <div className={description}>
                    <p>
                        Nameless Circle is a unique text-based RPG with an
                        original dark fantasy narrative.
                    </p>
                    <p>
                        It combines immersive storytelling with strategic
                        gameplay and unique features.
                    </p>
                </div>
                <div className={ctaContainer}>
                    <Link to='/welcome'>
                        <Button dataTestId='welcome-page-button'>
                            Unseal The Forsaken Truth
                        </Button>
                    </Link>
                </div>
                <div className={features}>
                    <span className={featureItem}>
                        <span className={`${featureIcon} ${featureIconDice}`}>
                            <DiceD20Icon />
                        </span>{' '}
                        5E compatible
                    </span>
                    <span className={featureItem}>
                        <span className={`${featureIcon} ${featureIconScroll}`}>
                            <ScrollIcon />
                        </span>{' '}
                        Original Narrative
                    </span>
                    <span className={featureItem}>
                        <span className={`${featureIcon} ${featureIconBottle}`}>
                            <BottleTonicSkullIcon />
                        </span>{' '}
                        Unique Features
                    </span>
                </div>
            </main>
            <footer className={footer}>
                <a
                    className={footerItem}
                    href='mailto:wesnmonteiro@gmail.com'
                    target='_blank'
                >
                    <EmailIcon />
                    <span className={footerItemText}>Email</span>
                </a>
                <a
                    className={footerItem}
                    href='https://linkedin.com/in/dev-wesley-nunes'
                    target='_blank'
                >
                    <LinkedinIcon />
                    <span className={footerItemText}>LinkedIn</span>
                </a>
                <a
                    className={footerItem}
                    href='https://github.com/Wesley-Nunes/nameless-circle'
                    target='_blank'
                >
                    <GithubIcon />
                    <span className={footerItemText}>GitHub</span>
                </a>
            </footer>
            <SideToSideEffect accentColor='magic' />
        </Card>
    </>
)

export default HomePage
