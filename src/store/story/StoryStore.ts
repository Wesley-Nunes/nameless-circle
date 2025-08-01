import { Story } from 'inkjs'

import type { InkStoryData } from 'story'

class StoryStore {
    private story: Story
    private updateCallback: (() => void) | null = null
    public content: string = ''
    public choices: { index: number; text: string }[] = []

    constructor(storyContent: InkStoryData) {
        this.story = new Story(storyContent)

        this.bindInkFunctions()
        this.progressStory()
    }

    private bindInkFunctions() {
        this.story.BindExternalFunction('setBattle', () => 'ok')
    }
    private progressStory() {
        let newContent = this.content

        while (this.story.canContinue) {
            newContent += this.story.Continue()
        }

        if (newContent !== this.content) {
            newContent += "\n\n"
        }

        this.content = newContent
        this.choices = this.story.currentChoices.map(
            (c) => ({ index: c.index, text: c.text })
        )

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

