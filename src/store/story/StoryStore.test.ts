import { describe, it, expect, vi } from 'vitest'
import type { InkStoryData } from 'story'
import StoryStore from './StoryStore'

const storyContent: InkStoryData = {
    inkVersion: 21,
    root: [
        [
            "^Once upon a time...",
            "\n",
            [
                "ev",
                { "^->": "0.2.$r1" },
                { "temp=": "$r" },
                "str",
                { "->": ".^.s" },
                [{ "#n": "$r1" }],
                "/str",
                "/ev",
                { "*": "0.c-0", flg: 18 },
                { s: ["^There were two choices.", { "->": "$r", var: true }, null] }
            ],
            [
                "ev",
                { "^->": "0.3.$r1" },
                { "temp=": "$r" },
                "str",
                { "->": ".^.s" },
                [{ "#n": "$r1" }],
                "/str",
                "/ev",
                { "*": "0.c-1", flg: 18 },
                { s: ["^There were four lines of content.", { "->": "$r", var: true }, null] }
            ],
            {
                "c-0": [
                    "ev",
                    { "^->": "0.c-0.$r2" },
                    "/ev",
                    { "temp=": "$r" },
                    { "->": "0.2.s" },
                    [{ "#n": "$r2" }],
                    "\n",
                    { "->": "0.g-0" },
                    { "#f": 5 }
                ],
                "c-1": [
                    "ev",
                    { "^->": "0.c-1.$r2" },
                    "/ev",
                    { "temp=": "$r" },
                    { "->": "0.3.s" },
                    [{ "#n": "$r2" }],
                    "\n",
                    { "->": "0.g-0" },
                    { "#f": 5 }
                ],
                "g-0": [
                    "^They lived happily ever after.",
                    "\n",
                    "end",
                    ["done", { "#f": 5, "#n": "g-1" }],
                    { "#f": 5 }
                ]
            }
        ],
        "done",
        { "#f": 1 }
    ],
    listDefs: {}
}

describe('StoryStore', () => {
    it('should initialize with first story segment and two newlines', () => {
        const expectedContent = 'Once upon a time...\n\n\n'
        const expectedChoices = [
            { index: 0, text: 'There were two choices.' },
            { index: 1, text: 'There were four lines of content.' }
        ]

        const store = new StoryStore(storyContent)

        expect(store.content).toBe(expectedContent)
        expect(store.choices).toStrictEqual(expectedChoices)
    })
    it('should accumulate content when making choices', () => {
        const expectedContent = "Once upon a time...\n\n\n" +
            "There were two choices.\n" +
            "They lived happily ever after.\n\n\n"

        const store = new StoryStore(storyContent)
        store.makeChoice(0)

        expect(store.content).toBe(expectedContent)
    })
    it('should trigger update callback with correct content state', () => {
        const expectedContent = "Once upon a time...\n\n\n" +
            "There were four lines of content.\n" +
            "They lived happily ever after.\n\n\n"

        const store = new StoryStore(storyContent)
        const updateCallback = vi.fn()
        store.onUpdate(updateCallback)
        store.makeChoice(1)

        expect(updateCallback).toHaveBeenCalledTimes(1)
        expect(store.content).toBe(expectedContent)
    })
})

