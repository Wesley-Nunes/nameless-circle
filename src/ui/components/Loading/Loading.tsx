import React from 'react'

import styles from './Loading.module.css'

const { loadingContainer, stoneLoader, stonePiece, loadingText } = styles

const Loading: React.FC = () => (
    <div className={loadingContainer}>
        <div className={stoneLoader}>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
            <div className={stonePiece}></div>
        </div>
        <div className={loadingText}>Loading game data</div>
    </div>
)

export default Loading
