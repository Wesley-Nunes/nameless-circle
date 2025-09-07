import { describe, it, expect, vi, beforeEach } from 'vitest'
import StoryStore from './StoryStore'

const storyContent = {
    inkVersion: 21,
    root: [
        [
            '^Once upon a time...',
            '\n',
            [
                'ev',
                { '^->': '0.2.$r1' },
                { 'temp=': '$r' },
                'str',
                { '->': '.^.s' },
                [{ '#n': '$r1' }],
                '/str',
                '/ev',
                { '*': '0.c-0', flg: 18 },
                {
                    s: [
                        '^There were two choices. ',
                        '#',
                        '^Disabled',
                        '/#',
                        { '->': '$r', var: true },
                        null
                    ]
                }
            ],
            [
                'ev',
                { '^->': '0.3.$r1' },
                { 'temp=': '$r' },
                'str',
                { '->': '.^.s' },
                [{ '#n': '$r1' }],
                '/str',
                '/ev',
                { '*': '0.c-1', flg: 18 },
                {
                    s: [
                        '^There were four lines of content.',
                        { '->': '$r', var: true },
                        null
                    ]
                }
            ],
            {
                'c-0': [
                    'ev',
                    { '^->': '0.c-0.$r2' },
                    '/ev',
                    { 'temp=': '$r' },
                    { '->': '0.2.s' },
                    [{ '#n': '$r2' }],
                    '\n',
                    { '->': '0.g-0' },
                    { '#f': 5 }
                ],
                'c-1': [
                    'ev',
                    { '^->': '0.c-1.$r2' },
                    '/ev',
                    { 'temp=': '$r' },
                    { '->': '0.3.s' },
                    [{ '#n': '$r2' }],
                    '\n',
                    { '->': '0.g-0' },
                    { '#f': 5 }
                ],
                'g-0': [
                    '^They lived happily ever after.',
                    '\n',
                    'end',
                    ['done', { '#f': 5, '#n': 'g-1' }],
                    { '#f': 5 }
                ]
            }
        ],
        'done',
        { '#f': 1 }
    ],
    listDefs: {}
}
describe('StoryStore', () => {
    let inkFnHandler: ReturnType<typeof vi.fn>
    let store: StoryStore

    beforeEach(() => {
        inkFnHandler = vi.fn()
        store = new StoryStore(storyContent, inkFnHandler)
    })

    it('should register and trigger the update callback - onUpdate', () => {
        const cb = vi.fn()
        store.onUpdate(cb)

        if (store.choices && store.choices.length > 0) {
            store.makeChoice(store.choices[0].index)
        }

        expect(cb).toHaveBeenCalled()
    })
    it('should advance the story when a choice is made - makeChoice', () => {
        const initialContentLength = store.content?.length || 0
        const initialChoicesLength = store.choices?.length || 0

        expect(initialChoicesLength).toBeGreaterThan(0)

        store.makeChoice(store.choices![0].index)

        expect(store.content!.length).toBeGreaterThan(initialContentLength)
        expect(store.choices!.length).toBeGreaterThanOrEqual(0)
    })
    it('should eventually finish the story after choices - makeChoice', () => {
        while (!store.isFinished && store.choices!.length > 0) {
            store.makeChoice(store.choices![0].index)
        }

        expect(store.isFinished).toBe(true)
    })
})
