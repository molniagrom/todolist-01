# Developer Guide - TodoList Application

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
http://localhost:3000
```

## Project Layout at a Glance

```
src/
├── app/           # Core: Store, API setup, Root component
├── features/      # Business logic: auth, todolists, tasks
├── common/        # Shared: components, hooks, utils, types
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/store.ts` | Redux store configuration |
| `src/app/baseApi.ts` | RTK Query API setup |
| `src/app/App.tsx` | Root component with providers |
| `src/common/routing/Routing.tsx` | Route definitions |
| `src/common/components/Header.tsx` | App header with navigation |
| `src/features/todolists/api/todolistsApi.ts` | Todolist CRUD endpoints |
| `src/features/todolists/api/tasksApi.ts` | Task CRUD endpoints |
| `src/features/auth/ui/Login/Login.tsx` | Login page |

## Common Tasks

### Adding a New Feature
1. Create directory: `src/features/your-feature/`
2. Add API: `src/features/your-feature/api/yourApi.ts`
3. Add types: `src/features/your-feature/lib/types/`
4. Add UI: `src/features/your-feature/ui/YourComponent.tsx`
5. Export from index files

### Adding a New API Endpoint
```typescript
// In your feature's API file
export const yourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => 'items',
      providesTags: ['Item'],
    }),
    addItem: builder.mutation<Item, CreateItemDto>({
      query: (body) => ({
        url: 'items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Item'],
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation } = yourApi;
```

### Adding a New Component
```typescript
// In src/common/components/YourComponent.tsx
import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '@/common/hooks';

interface YourComponentProps {
  title: string;
}

export const YourComponent: FC<YourComponentProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.someSlice.data);

  return (
    <div>
      <h1>{title}</h1>
      {/* Your JSX */}
    </div>
  );
};
```

### Adding a New Route
1. Add path to `src/common/routing/Routing.tsx`:
```typescript
export const Path = {
  // ... existing paths
  NewPage: 'new-page',
} as const;
```

2. Add route to `Routing` component:
```typescript
<Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
  <Route path={Path.NewPage} element={<NewPage />} />
</Route>
```

3. Add navigation in `Header.tsx` if needed

## Debugging Tips

### Redux DevTools
- Install Redux DevTools browser extension
- Store is exposed as `window.store` in development

### API Testing
- Check Network tab in browser DevTools
- Look for RTK Query cache in Redux DevTools
- API base URL configured in `.env` file

### Common Issues

**Authentication errors:**
- Check `VITE_API_KEY` in `.env`
- Verify auth token in localStorage
- Check network requests for 401/403 responses

**Styling issues:**
- Check MUI theme in `src/common/theme/theme.ts`
- Use Redux DevTools to toggle theme mode
- Verify CSS Module imports

**State not updating:**
- Check RTK Query cache tags
- Verify mutation invalidates correct tags
- Use Redux DevTools to inspect state

## Code Style

### TypeScript
- Strict mode enabled
- Use interfaces for object shapes
- Use type aliases for unions/primitives
- Prefer `const` over `let`

### React
- Use functional components with hooks
- Destructure props in function signature
- Use custom hooks for shared logic
- Keep components small and focused

### Redux
- Use RTK Query for server state
- Use slices for local UI state
- Prefer cache mutations over separate state
- Use typed hooks (`useAppDispatch`, `useAppSelector`)

### Styling
- Use MUI components when possible
- Use CSS Modules for feature-specific styles
- Use `sx` prop for one-off styles
- Follow MUI theme for consistent design

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test src/path/to/file.test.tsx
```

## Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

```bash
# Deploy to GitHub Pages
pnpm deploy
```

## Environment Variables

Create `.env` file in root:
```
VITE_BASE_URL=https://your-api-url.com/
VITE_API_KEY=your-api-key
```

## Useful Commands

```bash
# Install new package
pnpm add package-name

# Install dev dependency
pnpm add -D package-name

# Remove package
pnpm remove package-name

# Update packages
pnpm update

# Check for outdated packages
pnpm outdated
```

## Architecture Patterns

### Feature-Sliced Design (FSD)
- **Features**: Business logic modules
- **Shared**: Reusable code
- **App**: Application core

### RTK Query Patterns
- **Code Splitting**: Features extend baseApi
- **Tag-Based Caching**: Automatic cache invalidation
- **Optimistic Updates**: Immediate UI feedback

### Component Patterns
- **Container/Presentational**: Separate logic from UI
- **Compound Components**: Complex components built from simpler ones
- **Render Props**: Flexible component composition