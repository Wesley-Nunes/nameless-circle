import React from 'react'

import styles from './Card.module.css'

const Card: React.FC<{ children: React.ReactNode; isReadMode?: boolean }> = ({
    children,
    isReadMode = false
}) => (
    <section className={`${styles.card} ${isReadMode ? styles.readMode : ''}`}>
        {children}
    </section>
)

export default Card
