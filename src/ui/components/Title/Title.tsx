import React from 'react'

import styles from './Title.module.css'

const Title: React.FC<{
    children: React.ReactNode
    size?: 'small' | 'medium' | 'large'
}> = ({ children, size = 'large' }) => (
    <h1 className={`${styles.title} ${styles[size]}`}>{children}</h1>
)

export default Title
