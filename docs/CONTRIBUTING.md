# How to Contribute

Thank you for your interest in contributing to The Nameless Circle! As a solo developer, contributions that improve code quality, documentation, or user experience are especially valuable.

This project follows to **YAGNI (You Aren't Gonna Need It)** and **KISS (Keep It Simple, Stupid)** principles. Please keep this in mind for all contributions.

## Development Workflow

- The `main` branch represents the latest stable production release.
- The `staging` branch is the primary development branch. **All Pull Requests should be made into `staging`.**
- Please ensure there is a GitHub Issue for any change you wish to make before starting work.

## Reporting Bugs

_Bugs are tracked as [GitHub Issues](https://github.com/Wesley-Nunes/nameless-circle/issues)._

**Before submitting a bug report**:

- Check existing issues to see if the problem has already been reported.
- If you can, try to reproduce the issue on the latest `staging` branch.

**When creating a bug report, please include:**

- A clear and descriptive title.
- A detailed description of the behavior (expected vs. actual).
- Step-by-step instructions to reproduce the bug.
- Screenshots or a screen recording, if applicable.
- Your OS, Browser, and Node version.

## Suggesting New Features

I welcome ideas for new features and mechanics that align with the game's dark fantasy theme and core text-based RPG loop.

**Please note:** This project uses the [SRD 5e](https://www.dndbeyond.com/srd) as its core mechanic. New features _should_ maintain compatibility with this system.

**Before suggesting a feature:**

- Check existing issues to see if your idea has already been proposed.

**When suggesting a feature:**

- Use a clear and descriptive title.
- Provide a detailed description of the proposed feature and how it would enhance the game.
- Provide any specific examples or mockups, if you have them.
- Add the label **'status: needs discussion'** to the issue.

> **For non-code contributions (story, music/sfx, art):** Please get in touch with me directly _before_ starting work. You can message me on [LinkedIn](https://www.linkedin.com/in/dev-wesley-nunes) or send me an [Email](mailto:wesnmonteiro@gmail.com).

## Pull Requests (Code Contributions)

**Please do not open a pull request without a related GitHub Issue.** For new features, ensure the proposal has been approved before starting work.

1.  **Set Up the Project** locally. See the [How to Run](../README.md#how-to-run) section in the README.
2.  Create your branch from `staging`. Use a descriptive name based on the related issue (e.g., `centralize-game-data-access-20`).
3.  **Make Your Changes.**
    - Follow the existing code style and project structure. See the [Design & Architecture](../README.md#design-and-architecture) section. Ensure your IDE is using the project's `.prettierrc.json` config.
    - Use **TypeScript** with strict typing for new components.
    - **Tests are required:**
      - New/Modified `src/game/systems`: Add **unit tests**.
      - New/Modified `src/state/store/`: Add **integration tests**.
      - Bug fixes: Add **e2e regression tests** in `cypress/e2e/regression-tests`.
      - New core functionality: Add **e2e tests** in `cypress/e2e/core-flows`.
4.  **Test Your Changes.**
    - Run `npm run test:unit` and `npm run test:e2e` to ensure you didn't break anything. **The PR will be automatically rejected if any tests fail.**
    - Test your changes manually in the browser.
5.  **Commit Your Changes.** Please use [conventional commit messages](https://www.conventionalcommits.org/).
6.  **Push your branch** and open a Pull Request to the `staging` branch.
7.  **Describe Your Changes** in the PR, clearly detailing what you did and linking to the relevant issue.

## Getting Help

If you have any questions, feel free to reach out by sending a message on [LinkedIn](https://www.linkedin.com/in/dev-wesley-nunes) or an [Email](mailto:wesnmonteiro@gmail.com).

Thank you again for your interest and contribution!
