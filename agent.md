# Règles et Standards du Projet Pokedex

Ce fichier définit les règles, conventions et standards à suivre pour le développement de l'application Pokedex. L'IA et les développeurs doivent s'y référer pour maintenir la cohérence et la qualité du code.

## 1. Vue d'ensemble du Projet
- **Type**: Application Web Single Page (SPA)
- **Framework**: React 19
- **Langage**: TypeScript (Strict Mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3.4 + Framer Motion
- **Gestionnaire de Paquets**: npm

## 2. Standards de Code

### TypeScript & React
- **Composants Fonctionnels**: Utiliser exclusivement des composants fonctionnels avec des Hooks.
- **Interfaces**: Toujours définir des interfaces détaillées pour les props et les données API. Préfixer les interfaces par `I` est optionnel, mais la cohérence est requise. Utiliser `type` pour les unions complexes.
- **Hook personnalisés**: Extraire la logique métier complexe dans des custom hooks placés dans `src/hooks`.
- **Nommage**:
  - `PascalCase` pour les composants, interfaces et types.
  - `camelCase` pour les variables, fonctions et hooks.
  - `kebab-case` pour les noms de fichiers (sauf les composants React qui suivent le PascalCase, ex: `PokemonCard.tsx`).

### Styling (Tailwind CSS)
- Utiliser les classes utilitaires de Tailwind autant que possible.
- Éviter d'écrire du CSS brut dans des fichiers `.css` ou `.scss`, sauf pour les configurations globales dans `index.css`.
- Pour les styles conditionnels complexes, utiliser des bibliothèques comme `clsx` ou `tailwind-merge` si nécessaire (ou des templates literals propres).
- Respecter le thème défini dans `tailwind.config.js` (couleurs, espacements).
- **Accessibilité**: S'assurer que les combinaisons de couleurs respectent les standards WCAG.

### Gestion d'État
- Utiliser `React.useState` pour l'état local simple.
- Utiliser `React.Context` pour l'état global léger (comme le thème ou les préférences utilisateur).
- Éviter Redux à moins que la complexité ne le justifie absolument (ce projet semble préférer une approche plus légère).
- Data Fetching: Utiliser des hooks personnalisés (`usePokemon`) avec `axios`.

## 3. Architecture des Fichiers
La structure du dossier `src/` doit être respectée :
- `api/` : Clients et fonctions d'appel API.
- `components/` : Composants UI réutilisables.
- `hooks/` : Hooks React personnalisés.
- `types/` : Définitions de types TypeScript partagées.
- `utils/` : Fonctions utilitaires pures.
- `App.tsx` : Composant racine et routing.
- `main.tsx` : Point d'entrée de l'application.

## 4. Tests et Qualité
- **Framework**: Jest + React Testing Library.
- **Couverture**: Viser une couverture de test raisonnable pour les utilitaires et les composants critiques.
- **Commande**: `npm test` pour lancer les tests unitaires.
- **Storybook**: Documenter les composants UI dans Storybook (`npm run storybook`).

## 5. Workflow et CI/CD
- **Linting**: Le code doit passer le linter (`npm run lint`) sans erreur avant tout commit.
- **Tests**: Les tests doivent passer (`npm test`) avant tout push.
- **Pipeline**: GitHub Actions est configuré pour:
  - CI: Build, Lint, Test & Coverage sur push/PR vers `main` et `dev`.
  - CD: Déploiement automatique sur GitHub Pages après succès de la CI sur `main`.

## 6. Internationalisation (i18n)
- Le projet utilise `i18next` et `react-i18next`.
- Ne pas coder de chaînes de caractères en dur dans les composants. Utiliser le hook `useTranslation`.
- Les fichiers de traduction sont situés dans `public/locales` (ou structure équivalente configurée).

## 7. Règles Spécifiques à l'IA
- Lors de la génération de code, toujours vérifier que les imports sont corrects et que les types sont bien définis.
- Proposer des améliorations d'accessibilité (a11y) proactivement (aria-labels, focus management).
- Si une nouvelle dépendance est nécessaire, demander l'approbation explicite de l'utilisateur.
