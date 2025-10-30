# State Management

State management acts as the bridge between the game's pure logic/story and the reactive UI. It provides a single source of truth for all runtime data, ensuring the UI always reflects the current game state.

The implementation is divided into two core responsibilities:

1. **Context**: It serves as the bridge between the stores and the UI. It provides a single place for React components to access state and functions. This is implemented via a React Context provider and a custom hook: `useGameContext()`
2. **Stores**: These are vanilla TypeScript classes that hold and manage the runtime data. They are decoupled from React, which makes them highly portable and easy to test:
   1. _GameStore_: This store holds the runtime game state. Its primary role is to act as a bridge between the narrative (ink) layer and the game's systems. It implements this via the public `handleInkFunction` method, which serves as a dispatcher for all game actions triggered by the story.
   2. _StoryStore_: This store is responsible for managing the ink story engine. It handles loading the story, progressing the narrative, and retrieving the current line of text and choices. It interacts with the `GameStore` to reflect narrative choices in the game state and vice-versa.

**Project Structure & Responsibilities:**

```
src/
--state/
----contexts/   # React bridge
----store/      # Vanilla TS runtime state
```
