# Modern React Pokedex

A modern, interactive Pokedex application built with React, TypeScript, and Tailwind CSS, utilizing the PokeAPI.

## Features

- **Modern Interface**: Clean, responsive design with glassmorphism effects and smooth animations.
- **Interactive Grid**: Browse Pokemon with lazy-loaded cards.
- **Detailed View**: Click any Pokemon to see comprehensive stats, abilities, and type information in a beautiful modal.
- **Search & Filter**: Real-time search by name and filtering by Pokemon type.
- **Pagination**: Navigate through the entire Pokemon collection.
- **Loading States**: Skeleton screens for a polished user experience.

## Tech Stack

- **Core**: React 19, TypeScript, **Vite** (Build Tool)
- **Styling**: Tailwind CSS v3.4, Framer Motion (Animations)
- **Data Fetching**: Axios, PokeAPI
- **Testing**: Jest, React Testing Library
- **Documentation**: Storybook

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository (if applicable) or navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Running Tests

Unit and integration tests are computed using Jest.

```bash
npm test
```

## Storybook

Component documentation and isolated development.

```bash
npm run storybook
```

## Technical Choices

- **Vite**: Chosen for its superior dev server performance and HMR implementation compared to CRA.
- **Tailwind CSS**: Used for rapid UI development and consistent design tokens.
- **Framer Motion**: Implemented for complex layout transitions (Modals, List reordering) that are hard to achieve with pure CSS keyframes.
- **Custom Hooks** (`usePokemon`, `usePokemonFilter`): Logic is separated from UI components to ensure testability and reusability. `usePokemonFilter` implements a hybrid strategy combining server-side list fetching with client-side filtering for search responsiveness.
- **Jest**: Configured with `ts-jest` for robust TypeScript testing support.

## Project Structure

```
src/
├── api/            # API clients and services
├── components/     # UI Components (List, Card, Modal)
├── hooks/          # React hooks (Data fetching, Logic)
├── types/          # TypeScript interfaces
├── utils/          # Helper functions (Colors, Formatters)
└── ...
```
