import React, { useEffect } from 'react'

import { Card, EndGameMessage } from 'components'
import { resetStores } from 'store'

const ThankYouPage: React.FC = () => {
    useEffect(() => {
        resetStores()
    }, [])

    return (
        <Card isReadMode={true}>
            <EndGameMessage />
        </Card>
    )
}

export default ThankYouPage
