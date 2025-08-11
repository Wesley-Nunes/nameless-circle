import type { Hero } from 'libs/entities'

const getSkillSceneModifier = (heroes: Hero[]): number => {
    // NOTE: Simple implementation below,
    // the function needs a better logic
    const modifier = heroes.reduce((acc, cur) => acc + cur.level, 0)

    return modifier
}

export default getSkillSceneModifier
