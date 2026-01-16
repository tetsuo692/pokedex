# Contributing to Pokedex

Thank you for your interest in comparing to the Pokedex project! This document provides guidelines for setting up your environment, running tests, and understanding the CI/CD pipeline.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pokedex.git
    cd pokedex
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Development Workflow

### Running the App Locally
Start the development server:
```bash
npm run dev
```

### Running Tests
- **Unit Tests:** Run all unit tests with Jest.
    ```bash
    npm test
    ```
- **Test Coverage:** Generate a coverage report to verify code quality.
    ```bash
    npm run test:coverage
    ```
    Open `coverage/lcov-report/index.html` in your browser to inspect the report.

### Linting
Check for code style and potential errors:
```bash
npm run lint
```
Fix auto-fixable linting errors:
```bash
npm run lint -- --fix
```

## CI/CD Pipeline

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment.

### 1. Continuous Integration (CI)
The `CI - Build and Test` workflow runs on:
- Pushes to `main` and `dev` branches.
- Pull Requests targeting `main` and `dev`.

**It performs the following checks:**
- Installs dependencies.
- Runs Linting (`npm run lint`).
- Runs Tests with Coverage (`npm run test:coverage`).
- Builds the project (`npm run build`).
- Uploads the build output (`dist`) and coverage report as artifacts.

### 2. Continuous Delivery (CD)
The `CD - Deploy to GitHub Pages` workflow runs automatically **after the CI workflow successfully completes** on the `main` branch.

**It performs the following steps:**
- Downloads the `production-build` artifact from the successful CI run.
- Deploys the artifacts to GitHub Pages.

### Manual Workflow Triggers
You can manually re-run workflows from the "Actions" tab in GitHub if needed, though they are designed to run automatically.

## Pull Requests
- Ensure all tests pass locally before submitting.
- A coverage report will be generated in the CI pipeline; aim to maintain or improve code coverage.
- The CI status must pass before merging.
