import roll from './roll'

const disadvantageRoll = (): { total: number; rolls: number[] } => {
    const dice1 = roll()
    const dice2 = roll()

    return { total: Math.min(dice1, dice2), rolls: [dice1, dice2] }
}

export default disadvantageRoll
