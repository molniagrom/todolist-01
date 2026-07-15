# TodoList Application - Detailed Documentation

## Architecture Overview

This application follows **Feature-Sliced Design (FSD)** architecture, which organizes code by features rather than by technical layers. This makes the codebase more maintainable and scalable.

### Core Principles

1. **Separation of Concerns**: Each feature is self-contained with its own API, logic, and UI
2. **Shared Utilities**: Common components, hooks, and utilities are centralized in `common/`
3. **Type Safety**: Full TypeScript coverage with strict mode enabled
4. **Server State Management**: RTK Query handles all server state with caching and invalidation

## Detailed Project Structure

### Application Core (`src/app/`)

#### `App.tsx`
- Root component that wraps the entire application
- Provides authentication check on mount
- Manages theme switching (dark/light)
- Renders layout with Header, Routing, and ErrorSnackbar

#### `store.ts`
- Configures Redux store with two main reducers:
  - `app`: Local application state (theme, status, errors, auth)
  - `todolistsApi`: RTK Query reducer for server state
- Sets up RTK Query middleware for caching and polling
- Enables refetch-on-focus and refetch-on-reconnect

#### `baseApi.ts`
- Creates RTK Query API slice with shared configuration
- Handles authentication headers (API key + auth token)
- Provides centralized error handling
- Features extend this via `injectEndpoints()`

#### `app-slice.ts`
- Manages local application state:
  - `themeMode`: "dark" | "light"
  - `status`: Request status (idle/loading/succeeded/failed)
  - `error`: Global error message
  - `isLoggedIn`: Authentication state
- Uses RTK Query matchers to automatically update status based on API calls

### Feature Modules (`src/features/`)

#### Authentication Feature (`auth/`)
**API Endpoints:**
- `login`: POST to authenticate user
- `logout`: DELETE to end session
- `me`: GET to verify current session

**Components:**
- `Login.tsx`: Login form with email, password, remember me, and optional captcha
- Uses React Hook Form with Zod validation
- Handles captcha flow when required by server

#### CAPTCHA Feature (`captcha/`)
**API Endpoints:**
- `getCaptcha`: GET captcha image URL

**Components:**
- `Captcha.tsx`: Displays captcha image and input field
- Used by login feature when captcha is required

#### Todolists Feature (`todolists/`)
**API Endpoints:**
- `getTodolists`: GET all todolists
- `addTodolist`: POST new todolist
- `removeTodolist`: DELETE todolist (with optimistic update)
- `updateTodolistTitle`: PUT todolist title
- `getTasks`: GET tasks for a todolist (with pagination)
- `addTask`: POST new task
- `removeTask`: DELETE task
- `updateTask`: PUT task (with optimistic update across all cached pages)

**Components:**
- `Todolists.tsx`: Top-level container that fetches and renders all todolists
- `TodolistItem.tsx`: Single todolist card with title, tasks, and filters
- `TodolistTitle.tsx`: Editable title with delete button
- `Tasks.tsx`: Task list with pagination and client-side filtering
- `TaskItem.tsx`: Single task with checkbox, editable title, and delete button
- `FilterButtons.tsx`: All/Active/Completed filter toggles
- `TasksPagination.tsx`: Pagination component

#### FAQ Feature (`faq/`)
- Static page with hardcoded Q&A items
- Uses MUI Accordion components
- No API calls or state management

#### Pages Feature (`pages/`)
- `StubPage.tsx`: Reusable placeholder page for unimplemented routes

### Shared Utilities (`src/common/`)

#### Components (`components/`)
- `CreateItemForm.tsx`: Reusable form for creating new items
- `EditableSpan.tsx`: Double-click-to-edit inline text
- `ErrorSnackbar.tsx`: Global error toast notifications
- `Header.tsx`: App header with navigation, theme toggle, and logout
- `NavButton.tsx`: Styled MUI button with consistent design
- `PageNotFound.tsx`: 404 error page
- `ProtectedRoute.tsx`: Route guard for authentication

#### Hooks (`hooks/`)
- `useAppDispatch`: Typed Redux dispatch hook
- `useAppSelector`: Typed Redux selector hook

#### Theme (`theme/`)
- `getTheme()`: Factory function creating MUI theme based on mode
- Light mode: Pink primary, yellow secondary, beige background
- Dark mode: Yellow primary, near-black background

#### Routing (`routing/`)
- `Routing.tsx`: Route definitions with protected routes
- `Path` constant: Maps logical names to URL paths

#### Enums (`enums/`)
- `TaskStatus`: New, InProgress, Completed, Draft
- `TaskPriority`: Low, Middle, Hi, Urgently, Later
- `ResultCode`: Success, Error, CaptchaError

#### Types (`types/`)
- `FieldError`: API field-level error
- `BaseResponse<T>`: Standard API response envelope
- `RequestStatus`: Async request status

#### Constants (`constants/`)
- `AUTH_TOKEN`: localStorage key for auth token
- `PAGE_SIZE`: Default pagination size (4)

#### Utils (`utils/`)
- `createAppSlice`: Pre-configured Redux slice creator
- `handleError`: Centralized RTK Query error handler
- `isErrorWithMessage`: Type guard for error objects

## Key Patterns Explained

### 1. RTK Query Code Splitting
Each feature creates its own API slice by extending `baseApi`:
```typescript
// In features/todolists/api/todolistsApi.ts
export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<Todolist[], void>({
      query: () => 'todo-lists',
      providesTags: ['Todolist'],
    }),
    // ... more endpoints
  }),
});
```

### 2. Tag-Based Cache Invalidation
- Queries provide tags (e.g., `providesTags: ['Todolist']`)
- Mutations invalidate tags (e.g., `invalidatesTags: ['Todolist']`)
- Tasks are invalidated per-todolist: `{ type: 'Task', id: todolistId }`

### 3. Optimistic Updates
Both `removeTodolist` and `updateTask` use optimistic updates:
```typescript
removeTodolist: builder.mutation<void, string>({
  query: (id) => ({ url: `todo-lists/${id}`, method: 'DELETE' }),
  async onQueryStarted(id, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (draft) => {
        const index = draft.findIndex(t => t.id === id);
        if (index !== -1) draft.splice(index, 1);
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo(); // Rollback on failure
    }
  },
}),
```

### 4. Client-Side Filter as Cache Mutation
Instead of Redux state, filters are stored in RTK Query cache:
```typescript
// FilterButtons.tsx
const changeFilter = (filter: FilterValues, todolistId: string) => {
  dispatch(
    todolistsApi.util.updateQueryData('getTodolists', undefined, (draft) => {
      const todolist = draft.find(t => t.id === todolistId);
      if (todolist) todolist.filter = filter;
    })
  );
};
```

### 5. Zod for Type Safety
API response types are defined as Zod schemas:
```typescript
const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
});

type Todolist = z.infer<typeof TodolistSchema>;
```

## Development Guidelines

### Adding a New Feature
1. Create feature directory under `src/features/`
2. Follow FSD structure: `api/`, `lib/`, `ui/`
3. Create API endpoints using `baseApi.injectEndpoints()`
4. Add necessary types in `lib/types/`
5. Create UI components in `ui/`
6. Export hooks and components from index files

### Adding New API Endpoints
1. Define endpoint in feature's API file
2. Use appropriate cache tags for invalidation
3. Consider optimistic updates for mutations
4. Handle errors with `handleError` utility

### State Management Guidelines
- Use RTK Query for all server state
- Use Redux slices for local UI state only
- Prefer cache mutations over separate Redux state when possible
- Use typed hooks (`useAppDispatch`, `useAppSelector`)

### Component Guidelines
- Use MUI components for consistent styling
- Create reusable components in `common/components/`
- Use CSS Modules for feature-specific styles
- Follow container/presentational pattern

## Testing Strategy

### Unit Tests
- Test utility functions in isolation
- Test Redux slices and reducers
- Test custom hooks

### Component Tests
- Test component rendering
- Test user interactions
- Test integration with Redux

### Integration Tests
- Test API endpoints with mocked responses
- Test feature workflows end-to-end

## Performance Considerations

1. **RTK Query Caching**: Automatic caching reduces API calls
2. **Optimistic Updates**: Immediate UI feedback improves perceived performance
3. **Pagination**: Server-side pagination for large datasets
4. **Code Splitting**: Feature-based code splitting via FSD
5. **SWC Compilation**: Fast TypeScript compilation with SWC

## Security Considerations

1. **Authentication**: Token-based authentication with localStorage
2. **Route Protection**: Protected routes prevent unauthorized access
3. **Input Validation**: Zod schemas validate all user input
4. **Error Handling**: Centralized error handling prevents information leakage

## Deployment

### Vercel Configuration
- Automatic deployments from main branch
- Environment variables configured in Vercel dashboard
- Custom domain support

### GitHub Pages
- Build and deploy with `pnpm deploy`
- Uses gh-pages package for deployment

## Future Enhancements

1. **Drag-and-Drop**: Reordering tasks and todolists
2. **Real-time Updates**: WebSocket integration for live updates
3. **Offline Support**: Service worker for offline functionality
4. **Internationalization**: Multi-language support
5. **Advanced Filtering**: Date ranges, tags, and custom filters
6. **Batch Operations**: Select and modify multiple items
7. **Data Export**: Export tasks to CSV/PDF
8. **Mobile App**: React Native version