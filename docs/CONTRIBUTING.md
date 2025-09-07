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

1. **Fork the repository.** Click the "Fork" button at the top of this repository's page on GitHub.
2. **Set Up the Project Locally.**
    - `git clone git@github.com:your-username/nameless-circle.git` (Clone your fork to your machine, **not** the original repository).
    - `cd nameless-circle` (Navigate into the project directory).
    - `npm install` (Install all project dependencies).
    - **Add the Upstream Remote:** Connect your local clone to the original repository to stay updated:
        ```bash
        git remote add upstream git@github.com:Wesley-Nunes/nameless-circle.git
        ```
    - See the [How to Run](../README.md#how-to-run) section in the README for more application-specific setup.

3. **Sync Your Fork (Before Creating a Branch):** Ensure you are starting from the latest `staging` branch.
    - `git fetch upstream`
    - `git switch staging`
    - `git merge upstream/staging`

4. **Create Your Feature Branch.** Create a new branch from the updated `staging` branch. Use a descriptive name based on the related issue (e.g., `feat/centralize-game-data-access-20` where `20` is the issue number).
    - `git switch -c your-branch-name`
5. **Make Your Changes.**
    - Follow the existing code style and project structure. See the [Design & Architecture](../README.md#design-and-architecture) section. Ensure your IDE is using the project's `.prettierrc.json` config.
    - Use **TypeScript** with strict typing for new components.
    - **Tests are required:**
        - New/Modified `src/game/systems`: Add **unit tests**.
        - New/Modified `src/state/store/`: Add **integration tests**.
        - Bug fixes: Add **e2e regression tests** in `cypress/e2e/regression-tests`.
        - New core functionality: Add **e2e tests** in `cypress/e2e/core-flows`.
6. **Test Your Changes.**
    - Run `npm run test:unit` and `npm run test:e2e` to ensure you didn't break anything. **The PR will be automatically rejected if any tests fail.**
    - Test your changes manually in the browser.
7. **Commit Your Changes.** Please use [conventional commit messages](https://www.conventionalcommits.org/).
8. **Push to Your Fork**
9. **Open a Pull Request** from your branch (in your fork) to the `staging` branch of this repository.
10. **Describe Your Changes** in the PR, clearly detailing what you did and linking to the relevant issue.

## Getting Help

If you have any questions, feel free to reach out by sending a message on [LinkedIn](https://www.linkedin.com/in/dev-wesley-nunes) or an [Email](mailto:wesnmonteiro@gmail.com).

Thank you again for your interest and contribution!
