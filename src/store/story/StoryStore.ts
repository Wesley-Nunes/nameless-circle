import { Story } from 'inkjs'

import type { InkStoryData } from 'story'

class StoryStore {
    private inkFunctionHandler:
        | ((funcName: string, ...args: any[]) => void)
        | null = null
    private story: Story
    private updateCallback: (() => void) | null = null
    public content: string = ''
    public choices: { index: number; text: string }[] = []

    constructor(
        storyContent: InkStoryData,
        inkFunctionHandler?: (funcName: string, ...args: any[]) => void
    ) {
        this.story = new Story(storyContent)

        if (inkFunctionHandler) {
            this.inkFunctionHandler = inkFunctionHandler

            this.bindInkFunctions()
        }

        this.progressStory()
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
            'end_skill_turn'
        ].forEach(fn => {
            this.story.BindExternalFunction(fn, (...args) => {
                return this.inkFunctionHandler!(fn, ...args)
            })
        })
    }
    private progressStory() {
        let newContent = this.content

        while (this.story.canContinue) {
            newContent += this.story.Continue()
        }

        if (newContent !== this.content) {
            newContent += '\n\n'
        }

        this.content = newContent
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
