# UI

The UI is designed to be a pure, visual layer with minimal internal state, ensuring it remains fast, predictable, and completely decoupled from the core game logic. Its primary responsibility is to render the story created by ink.

**Key Design Decisions:**

- **Minimal State:** Components hold only the state necessary for their presentation. All meaningful state is owned and managed externally
- **Styling Architecture:** Styles are organized for clarity and modularity:
  - `src/ui/styles/`: Contains global foundations
  - `src/ui/**/*.module.css`: Co-located with components, these CSS Modules provide scoped, component-specific styles to prevent naming conflicts and enforce modularity

- **Integration:** UI subscribes to state via Game Context (see [State Management](./docs/state-management)).

**Project Structure & Responsibilities:**

```
src/
--ui/
----components/  # Reusable, stateless presentational components
----pages/       # Top-level page components that compose smaller components into views
----styles/      # Global style rules, variables, and resets
```

- Client-side routing is handled by **React Router**, with the main router configuration centralized in `src/App.tsx`.
