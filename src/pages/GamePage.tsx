import { useStoryStore } from 'store/story'

const GamePage: React.FC = () => {
    const { content, choices, makeChoice } = useStoryStore()

    return (
        <div>
            <pre>{content}</pre>
            {choices.map(choice => (
                <button
                    key={choice.index}
                    onClick={() => makeChoice(choice.index)}
                >
                    {choice.text}
                </button>
            ))}
        </div>
    )
}

export default GamePage
