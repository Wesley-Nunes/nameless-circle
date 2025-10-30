# Logic

The game’s architecture is data-oriented: it structures code around efficient data transformations, with a clear separation between data, the logic that operates on it, and the types that define it. This makes testing and future modifications easier.

The implementation is divided into three distinct concerns:

1. **Types**: Anything in the game that could be used, hold data, or perform an action is constructed using _types_. They hold only type definitions.
2. **Data**: This folder holds the data to be used in the game and is divided into:
   1. _Static_: The static data used to create the entities, For example, `heroes/player.ts` have the player information.
   2. _Accessors_: The accessors offer helper functions to retrieve data. For example, `getHeroById.ts` can be used to get the static data for any hero by their ID.
   3. _Factories_: The factories create entity instances using static data as a template. They can introduce slight variations (e.g., randomizing health) to create unique entity instances while ensuring those instances respect the defined types. For example, `enemyFactory.ts` uses a base enemy's static data to generate a unique enemy instance for combat.
3. **Systems**: Systems are collections of pure functions that operate on entities.

> **Entities**: Runtime objects(instances) created using the types and data.

- Integration: The game state (composed of these entities) is managed by the game store (detailed in [state management](./docs/state-management)). The logic layer provides the functions to initialize and manipulate this state.

**Project Structure & Responsibilities:**

```
src/
--game/
----types/     # type definitions
----data/      # actual game data
----systems/   # pure functions
```

**Game Mechanics & Compatibility**
The core rules and mechanics for this game (including but not limited to ability scores, skills, combat, and spells) are developed to be compatible with the fifth edition of the world's most popular roleplaying game.
