import React from 'react'

import styles from './SideToSideEffect.module.css'

const SideToSideEffect: React.FC<{
    accentColor: 'reward' | 'magic' | 'positive' | 'danger'
}> = ({ accentColor }) => (
    <div
        className={`${styles.effect} ${styles.animated} ${styles[accentColor]}`}
    />
)

export default SideToSideEffect
