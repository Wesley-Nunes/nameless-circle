import React from 'react'

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
    Title
} from 'components'

import styles from './HomePage.module.css'
import { Link } from 'react-router'

const HomePage: React.FC = () => (
    <>
        <Card>
            <main className={styles.main}>
                <Title>Nameless Circle</Title>
                <Divider />
                <div className={styles.description}>
                    <p>
                        Nameless Circle is a unique text-based RPG with an
                        original dark fantasy narrative.
                    </p>
                    <p>
                        It combines immersive storytelling with strategic
                        gameplay and unique features.
                    </p>
                </div>
                <div className={styles['cta-container']}>
                    <Link to='/welcome'>
                        <Button>Unseal The Forsaken Truth</Button>
                    </Link>
                </div>
                <div className={styles.features}>
                    <span className={styles['feature-item']}>
                        <span
                            className={`${styles['feature-icon']} ${styles['feature-icon-dice']}`}
                        >
                            <DiceD20Icon />
                        </span>{' '}
                        5E compatible
                    </span>
                    <span className={styles['feature-item']}>
                        <span
                            className={`${styles['feature-icon']} ${styles['feature-icon-scroll']}`}
                        >
                            <ScrollIcon />
                        </span>{' '}
                        Original Narrative
                    </span>
                    <span className={styles['feature-item']}>
                        <span
                            className={`${styles['feature-icon']} ${styles['feature-icon-bottle']}`}
                        >
                            <BottleTonicSkullIcon />
                        </span>{' '}
                        Unique Features
                    </span>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    className={styles['footer-item']}
                    href='mailto:wesnmonteiro@gmail.com'
                    target='_blank'
                >
                    <EmailIcon />
                    <span className={styles['footer-item-text']}>Email</span>
                </a>
                <a
                    className={styles['footer-item']}
                    href='https://linkedin.com/in/dev-wesley-nunes'
                    target='_blank'
                >
                    <LinkedinIcon />
                    <span className={styles['footer-item-text']}>LinkedIn</span>
                </a>
                <a
                    className={styles['footer-item']}
                    href='https://github.com/Wesley-Nunes/nameless-circle'
                    target='_blank'
                >
                    <GithubIcon />
                    <span className={styles['footer-item-text']}>GitHub</span>
                </a>
            </footer>
            <div className={styles['blue-effect']} />
        </Card>
    </>
)

export default HomePage
