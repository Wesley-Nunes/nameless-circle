import { Story } from 'inkjs'

import type { InkStoryData } from 'story'

class StoryStore {
    private inkFunctionHandler: // eslint-disable-next-line
    (funcName: string, ...args: any[]) => void
    private story: Story
    private updateCallback: (() => void) | null
    public choices: { index: number; text: string }[]
    public content: { text: string | null; tags: string[] | null }[]

    constructor(
        storyContent: InkStoryData,
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
            'get_action_order',
            'is_player_action',
            'attack',
            'get_action_result',
            'end_turn',
            'get_combat_status',
            'ai_action',
            'add_mount',
            'has_mounts',
            'get_mount_info',
            'get_combat_result',
            'set_skill_scene',
            'get_action_skills_count',
            'get_scene_skill_info',
            'attempt_skill',
            'last_attempt_skill_result',
            'get_attempt_skill_count',
            'end_skill_turn',
            'end_skill_scene'
        ].forEach(fn => {
            this.story.BindExternalFunction(fn, (...args) => {
                return this.inkFunctionHandler!(fn, ...args)
            })
        })
    }
    private progressStory() {
        while (this.story.canContinue) {
            const text = this.story.Continue()
            const tags = this.story.currentTags

            // NOTE: Formatting will be done using tags
            if ((text !== '\n' && text) || tags?.length) {
                const newContent = { text, tags }
                this.content.push(newContent)
            }
        }

        this.choices = this.story.currentChoices.map(c => ({
            index: c.index,
            text: c.text
        }))

        this.triggerUpdate()
    }
    private triggerUpdate() {
        if (this.updateCallback) this.updateCallback()
    }

    public makeChoice(index: number) {
        this.story.ChooseChoiceIndex(index)
        this.progressStory()
    }
    public onUpdate(callback: (() => void) | null) {
        this.updateCallback = callback
    }
}

export default StoryStore
