import React from 'react'

import styles from './PulseEffect.module.css'

const PulseEffect: React.FC<{
    accentColor: 'reward' | 'magic' | 'positive' | 'danger'
}> = ({ accentColor }) => (
    <div
        className={`${styles.effect} ${styles.animated} ${styles[accentColor]}`}
    />
)

export default PulseEffect
