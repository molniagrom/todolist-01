# TodoList Application

A modern TodoList application built with React, Redux Toolkit, and Material UI. Features include user authentication, CRUD operations for todolists and tasks, pagination, filtering, and dark/light theme support.

## Features

- User authentication (login/logout with session management)
- Full CRUD operations for todolists and tasks
- Server-side pagination with configurable page size
- Client-side filtering (All/Active/Completed)
- Dark/light theme toggle
- Optimistic updates with server sync
- Global error handling with toast notifications
- Responsive design with Material UI components

## Tech Stack

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5 with SWC plugin
- **State Management**: Redux Toolkit 2.8.2 with RTK Query
- **UI Library**: Material UI (MUI) 7.1.1 + Emotion
- **Routing**: React Router 7.6.2
- **Forms**: React Hook Form 7.58.1 + Zod 3.25.67
- **HTTP Client**: Axios 1.10.0 (though RTK Query uses fetch)
- **Testing**: Vitest 3.2.4
- **Deployment**: gh-pages

## Live Demo

[todolist-01-eight.vercel.app](https://todolist-01-eight.vercel.app)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Deploy to gh-pages
pnpm deploy
```

## Project Structure

```
todolist-01/
├── src/                    # Source code
│   ├── app/                # Application core
│   │   ├── App.tsx         # Root component with providers
│   │   ├── store.ts        # Redux store configuration
│   │   ├── baseApi.ts      # RTK Query base API setup
│   │   └── app-slice.ts    # App-level state (theme, auth, errors)
│   │
│   ├── features/           # Feature-sliced modules
│   │   ├── auth/           # Authentication feature
│   │   ├── captcha/        # CAPTCHA verification
│   │   ├── todolists/      # Core todo/task management
│   │   ├── faq/            # FAQ page
│   │   └── pages/          # Shared page placeholders
│   │
│   ├── common/             # Shared utilities and components
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── theme/          # MUI theme configuration
│   │   ├── routing/        # Route definitions
│   │   ├── enums/          # TypeScript enums
│   │   ├── types/          # Shared type definitions
│   │   ├── constants/      # Application constants
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Shared styles
│   │   └── actions/        # Shared Redux actions
│   │
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── dist/                   # Build output
├── .storybook/             # Storybook configuration
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment config
```

## Key Features & Logic

### 1. Authentication System
- **Login/Logout**: RTK Query mutations for session management
- **Auth Check**: `useMeQuery` verifies session on app mount
- **Route Protection**: `ProtectedRoute` component guards authenticated routes
- **Token Storage**: Auth token stored in localStorage

### 2. TodoList Management
- **CRUD Operations**: Create, read, update, delete todolists
- **Optimistic Updates**: Immediate UI feedback with server sync
- **Cache Invalidation**: Tag-based cache management via RTK Query

### 3. Task Management
- **CRUD Operations**: Create, read, update, delete tasks within todolists
- **Pagination**: Server-side pagination with configurable page size
- **Filtering**: Client-side filtering (All/Active/Completed) via cache mutation
- **Status Tracking**: Task status enum (New, InProgress, Completed, Draft)

### 4. Theme System
- **Dark/Light Modes**: Toggle via header switch
- **MUI Integration**: Custom theme factory with color palettes
- **Persistent State**: Theme preference stored in Redux

### 5. Error Handling
- **Global Error Display**: ErrorSnackbar component for toast notifications
- **Centralized Handler**: `handleError` utility for RTK Query errors
- **API Response Codes**: Standardized result codes for success/error states

## Key Patterns

### Feature-Sliced Design (FSD)
Each feature follows a consistent structure:
- `api/` - RTK Query endpoints and API types
- `lib/` - Domain types, utilities, validation schemas
- `ui/` - React components organized by feature

### RTK Query Patterns
- **Code Splitting**: Features extend `baseApi` via `injectEndpoints`
- **Tag-Based Caching**: Queries provide tags, mutations invalidate them
- **Optimistic Updates**: Cache modifications before server response with rollback

### Component Architecture
- **Container/Presentational**: Smart components handle logic, dumb components handle UI
- **Shared Components**: Reusable UI elements in `common/components`
- **Feature Components**: Feature-specific components in `features/*/ui/`

## Configuration Details

### Vite Configuration
- Path alias: `@/` maps to `src/`
- SWC plugin for fast React compilation
- Development server on port 3000

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured
- ES2020 target with DOM support
- React JSX transform

### Environment Variables
- `VITE_BASE_URL`: API base URL
- `VITE_API_KEY`: API authentication key

## Development Workflow

1. **Development**: `pnpm dev` (starts Vite dev server on port 3000)
2. **Build**: `pnpm build` (TypeScript compilation + Vite build)
3. **Testing**: `pnpm test` (Vitest)
4. **Deployment**: `pnpm deploy` (gh-pages)

## Summary

This is a well-structured, production-ready TodoList application demonstrating modern React patterns with Redux Toolkit for state management, RTK Query for server state, Material UI for styling, and feature-sliced architecture for maintainable code organization.