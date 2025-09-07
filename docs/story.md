# Story

The Story module is responsible for all narrative content. It is strictly a data source and does not contain game logic.
The Inky editor compiles the Ink files into a single output file. That compiled file has two primary responsibilities:

1. Provides the narrative text, including any associated tags, and presents the available choices.
2. Exposes the functions (available at story/functions.ink) expected by the Ink runtime. These functions must be implemented in TypeScript.

The story on the Ink side is written in the [Inky editor](https://github.com/inkle/inky). To learn more about Ink, I recommend checking out the [Ink documentation](https://github.com/inkle/ink/tree/master/Documentation) and the [InkJS documentation](https://github.com/inkle/inkjs/tree/master/docs).

**Integration flow**:

- `App` imports `story.ts`
- `App` passes it to the `GameProvider`
- `GameProvider` injects it into the `StoryStore`
- `StoryStore` initializes a new Ink story instance

**Project Structure & Responsibilities:**

```
src/
--story/
----function.ink    # Functions used in ink
----story.ink       # Story content in ink format
----story.ts        # Story content in TypeScript format
```
