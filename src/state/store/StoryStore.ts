import { Story } from 'inkjs'

type EventType = 'turn'
type TurnAction = 'start' | 'end'
export type Choice = {
    index: number
    text: string
    props?: Record<string, boolean>
}
export type Content = { text: string | null; tags: string[] | null }

class StoryStore {
    private inkFunctionHandler: // eslint-disable-next-line
    (funcName: string, ...args: any[]) => void
    private story: Story
    private turnStartIndex: number | null
    private updateCallback: (() => void) | null

    public choices: Choice[] | null
    public content: Content[] | null
    public isFinished: boolean = false

    constructor(
        storyContent: object,
        // eslint-disable-next-line
        inkFunctionHandler: (funcName: string, ...args: any[]) => void
    ) {
        if (!storyContent) {
            throw new Error('Missing storyContent')
        }
        if (!inkFunctionHandler) {
            throw new Error('Missing inkFunctionHandler')
        }

        this.story = new Story(storyContent)
        this.turnStartIndex = null
        this.choices = []
        this.content = []
        this.inkFunctionHandler = inkFunctionHandler
        this.bindInkFunctions()
        this.progressStory()
        this.updateCallback = null
    }

    private bindInkFunctions() {
        ;[
            'add_to_hero_party',
            'set_combat',
            'get_character_info',
            'get_party_size',
            'is_player_action',
            'attack',
            'get_action_result',
            'end_turn',
            'get_combat_status',
            'ai_action',
            'add_mount',
            'get_mount_info',
            'get_combat_result',
            'get_combat_round',
            'get_alive_characters_size',
            'get_player_name'
        ].forEach(fn => {
            this.story.BindExternalFunction(fn, (...args) => {
                return this.inkFunctionHandler!(fn, ...args)
            })
        })
    }
    private handleEvent(type: EventType, action: TurnAction) {
        const event = {
            turn: {
                start: () => {
                    this.turnStartIndex = this.content!.length
                },
                end: () => {
                    if (this.turnStartIndex === null) {
                        throw new Error('End event without matching start!')
                    }

                    this.content = this.content!.slice(0, this.turnStartIndex)
                    this.turnStartIndex = null
                }
            }
        }

        event[type][action]()
    }
    private progressStory() {
        while (this.story.canContinue) {
            const text = this.story.Continue()
            const tags = this.story.currentTags
            let cssClass: string[] = []

            if (tags && tags?.length) {
                tags.forEach(tag => {
                    const [type, ...rest] = tag.split(' ')

                    try {
                        switch (type) {
                            case 'event': {
                                const [eventType, action] = rest as [
                                    EventType,
                                    TurnAction
                                ]
                                this.handleEvent(eventType, action)

                                break
                            }
                            case 'style': {
                                cssClass = rest

                                break
                            }
                        }
                    } catch (error) {
                        console.error(`Error processing tag '${tag}':`, error)
                    }
                })
            }

            if ((text !== '\n' && text) || cssClass?.length) {
                const newContent = { text, tags: cssClass }

                this.content!.push(newContent)
            }
        }

        this.choices = this.story.currentChoices.map(c => ({
            index: c.index,
            text: c.text,
            props: this.propMaker(c.tags) || {}
        }))

        this.isFinished =
            !this.story.canContinue && this.story.currentChoices.length === 0

        this.triggerUpdate()
    }
    private propMaker(tags: string[] | null): null | Record<string, boolean> {
        if (tags && tags?.length) {
            // NOTE: Right now, it's only creating boolean props
            return tags.reduce((acc: Record<string, boolean>, tag) => {
                if (tag.startsWith('prop ')) {
                    const propName = tag.split(' ')[1]
                    acc[propName] = true
                }
                return acc
            }, {})
        }

        return null
    }
    private triggerUpdate() {
        if (this.updateCallback) this.updateCallback()
    }

    public makeChoice = (index: number) => {
        this.story.ChooseChoiceIndex(index)
        this.progressStory()
    }
    public onUpdate = (callback: (() => void) | null) => {
        this.updateCallback = callback
    }
}

export default StoryStore
