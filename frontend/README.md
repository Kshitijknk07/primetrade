# Frontend UI - Primetrade REST API

Modern React/Next.js frontend application with TypeScript, Tailwind CSS, and Shadcn/UI components. Features user authentication, protected routes, and comprehensive task management interface.

##  Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file:**
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Application will run on `http://localhost:3000`

##  Project Structure

```
frontend/
 app/                        # Next.js App Router
    (auth)/                # Authentication route group
       layout.tsx         # Auth layout wrapper
       login/
          page.tsx       # Login page
       register/
           page.tsx       # Registration page

    (dashboard)/           # Protected route group
       layout.tsx         # Dashboard layout with sidebar
       dashboard/
          page.tsx       # Main dashboard (task list)
       admin/
          page.tsx       # Admin panel (user management)
       profile/
           page.tsx       # User profile page

    layout.tsx             # Root layout
    page.tsx               # Home/landing page
    globals.css            # Global styles

 components/                # React components
    ui/                    # Shadcn/UI base components
       button.tsx
       input.tsx
       card.tsx
       dialog.tsx
       alert-dialog.tsx
       table.tsx
       label.tsx
       checkbox.tsx
       separator.tsx
       ... (other UI components)

    login-form.tsx         # Login form component
    PasswordInput.tsx       # Password input with visibility toggle
    PasswordStrengthGuide.tsx # Password strength indicator
    AdminPanel.tsx         # Admin user management

    tasks/                 # Task management components
        TaskList.tsx       # Displays all user tasks
        TaskCard.tsx       # Individual task display
        TaskForm.tsx       # Create/edit task form
        TaskFilters.tsx    # Filter tasks by status/priority
        TaskComments.tsx   # Comments section for tasks
        BulkActions.tsx    # Bulk task operations

 hooks/                     # Custom React hooks
    useTasks.ts           # Task CRUD operations hook
    useTaskComments.ts    # Comment management hook

 lib/                       # Utility functions
    api.ts                # API client with bearer token
    storage.ts            # localStorage/cookie management
    task-utils.ts         # Task-related utilities
    utils.ts              # General utilities

 types/                     # TypeScript type definitions
    task.ts               # Task and comment types

 middleware.ts             # Next.js middleware for route protection
 next.config.ts           # Next.js configuration
 tsconfig.json            # TypeScript configuration
 tailwind.config.ts       # Tailwind CSS configuration
 components.json          # Shadcn/UI components config
 postcss.config.mjs       # PostCSS configuration
 package.json
 README.md                # This file
```

##  Key Features

### Authentication
- **Registration Page:** Create new user account with validation
- **Login Page:** Authenticate and receive JWT token
- **Token Management:** Automatically stored in localStorage
- **Auto Logout:** Redirect to login on 401 response
- **Protected Routes:** Middleware prevents unauthorized access

### Dashboard & Task Management
- **Task List:** Display all user's tasks with real-time data
- **Create Task:** Form to add new tasks with title, description, priority, due date
- **Edit Task:** Update task details (status, priority, etc.)
- **Delete Task:** Remove tasks with confirmation dialog
- **Filter Tasks:** Filter by status (pending, in progress, completed) or priority
- **Task Comments:** Add and view comments on individual tasks

### User Features
- **User Profile:** View and edit profile information
- **Admin Panel:** (Admin users only) Manage users and roles
- **Role-Based UI:** Different features shown based on user role

### UI/UX
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Dark/Light Theme:** Theme support via next-themes
- **Toast Notifications:** Success and error messages via Sonner
- **Loading States:** Visual feedback during API calls
- **Error Handling:** User-friendly error messages
- **Confirmation Dialogs:** Alert dialogs for destructive actions

##  Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/UI (Radix UI)
- **Icons:** Lucide React, Hugeicons
- **Notifications:** Sonner
- **Theme:** next-themes
- **HTTP Client:** Fetch API

##  Pages & Routes

### Public Routes (No Auth Required)
```
/                  - Home/Landing page
/login             - User login
/register          - User registration
```

### Protected Routes (Auth Required)
```
/dashboard         - Main dashboard with task list
/dashboard/admin   - Admin panel (admin users only)
/dashboard/profile - User profile page
```

##  Components Overview

### Task Management Components

**TaskList.tsx**
- Displays all user's tasks
- Shows task count and status indicators
- Integrates with TaskCard and TaskForm

**TaskCard.tsx**
- Individual task display card
- Shows title, description, status, priority
- Edit and delete buttons
- Due date display

**TaskForm.tsx**
- Create new task form
- Edit existing task form
- Form validation
- API integration

**TaskFilters.tsx**
- Filter by status (pending, in_progress, completed)
- Filter by priority (low, medium, high)
- Clear filters button

**TaskComments.tsx**
- Display comments for a task
- Add new comment form
- Delete comment functionality
- Comment author and timestamp

**BulkActions.tsx**
- Select multiple tasks
- Bulk status update
- Bulk delete with confirmation

### Authentication Components

**LoginForm.tsx**
- Email and password inputs
- Form validation
- Error message display
- Submit button with loading state
- Link to registration

**PasswordInput.tsx**
- Password input with show/hide toggle
- Eye icon for visibility control

**PasswordStrengthGuide.tsx**
- Real-time password strength indicator
- Shows requirements:
  - At least 8 characters
  - Contains uppercase letter
  - Contains number
  - Contains special character

##  Security Features

### Authentication
- JWT tokens stored securely in localStorage
- Bearer token included in all API requests
- Automatic logout on 401 errors
- Token expiration handling

### Route Protection
- Middleware checks for token on protected routes
- Unauthenticated users redirected to login
- Authenticated users redirected from public routes to dashboard

### Form Security
- Input validation on client side
- Password strength requirements
- CSRF protection via next/link
- XSS prevention (React escapes content)

### API Security
- CORS enforced by backend
- Only authenticated requests succeed
- Error responses don't leak sensitive info

##  Styling

### Tailwind CSS
- Utility-first CSS framework
- Responsive design with breakpoints
- Dark mode support via next-themes
- Custom configuration in `tailwind.config.ts`

### Shadcn/UI Components
Pre-built, accessible components:
- Button, Input, Label
- Card, Dialog, AlertDialog
- Table, Checkbox
- Separator, Select, etc.

##  Custom Hooks

### useTasks
```typescript
const {
  tasks,
  loading,
  error,
  createTask,
  updateTask,
  deleteTask,
  fetchTasks
} = useTasks();
```

Handles task CRUD operations and state management.

### useTaskComments
```typescript
const {
  comments,
  addComment,
  deleteComment,
  fetchComments
} = useTaskComments(taskId);
```

Manages comments for a specific task.

##  API Integration

### API Client (`lib/api.ts`)
- Centralized API configuration
- Automatic Bearer token injection
- Error handling with proper status codes
- 401 logout redirect

### Endpoints Used
```
POST   /auth/register        - Create user account
POST   /auth/login           - Authenticate user
POST   /auth/logout          - Logout user
GET    /users/profile        - Get current user
PUT    /users/profile        - Update profile
GET    /tasks                - List user's tasks
POST   /tasks                - Create task
GET    /tasks/:id            - Get specific task
PUT    /tasks/:id            - Update task
DELETE /tasks/:id            - Delete task
GET    /comments/task/:id    - Get task comments
POST   /comments             - Add comment
DELETE /comments/:id         - Delete comment
GET    /users                - List all users (admin)
PUT    /admin/users/:id/role - Update user role (admin)
```

##  Development

### Run Development Server
```bash
npm run dev
```

Opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Creates optimized production build in `.next/` folder.

### Production Serve
```bash
npm run start
```

Serves the production build.

##  Responsive Design

Breakpoints for responsive design:
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

##  Testing

### Manual Testing Checklist
- [ ] Can register new user
- [ ] Can login with email and password
- [ ] Dashboard loads after login
- [ ] Can create new task
- [ ] Can edit task
- [ ] Can delete task (with confirmation)
- [ ] Can filter tasks by status
- [ ] Can filter tasks by priority
- [ ] Can add comment to task
- [ ] Can delete comment
- [ ] Can view user profile
- [ ] Can logout
- [ ] 401 errors redirect to login
- [ ] Form validation works
- [ ] Error messages display
- [ ] Success messages display

##  Environment Configuration

### Development
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Production
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
```

##  State Management

Uses React hooks for state management:
- `useState` for component-level state
- `useEffect` for side effects
- Custom hooks for shared logic
- localStorage for token persistence

##  Performance Optimization

- Next.js static generation where possible
- Image optimization
- Code splitting per route
- CSS minification via Tailwind
- Efficient re-renders with React.memo
- ISR (Incremental Static Regeneration) ready

##  Troubleshooting

### Cannot connect to API
```
Error: fetch failed

Solution:
1. Ensure backend is running on port 5000
2. Check NEXT_PUBLIC_API_URL in .env.local
3. Verify backend CORS_ORIGIN includes http://localhost:3000
```

### Token not persisting
```
Issue: Logged out after page reload

Solution:
1. localStorage should store 'token' key
2. Check browser's Application  Storage  LocalStorage
3. Middleware might be clearing it on 401
```

### Styles not loading
```
Issue: No Tailwind styling visible

Solution:
1. Run npm install to get all dependencies
2. Check tailwind.config.ts has correct content paths
3. Restart dev server
```

### TypeScript errors
```
Issue: Type errors during build

Solution:
1. Run npm install to ensure all types are installed
2. Check tsconfig.json is properly configured
3. Verify @types packages are in devDependencies
```

##  Scripts

```bash
# Development
npm run dev       # Start dev server with hot reload

# Production
npm run build    # Build for production
npm run start    # Start production server

# Code Quality
npm run lint     # Run ESLint (if configured)
```

##  Related Documentation

- [Main Project README](../README.md) - Full project overview
- [Backend README](../backend/README.md) - Backend API documentation
- [Scalability Guide](../SCALABILITY.md) - How to scale the application

##  Support

For frontend-specific questions:
1. Review the component code in `components/`
2. Check hooks in `hooks/`
3. Review API integration in `lib/api.ts`
4. Check type definitions in `types/`
5. Test endpoints using browser DevTools Network tab

##  Customization

### Change API URL
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

### Customize Theme
Edit `tailwind.config.ts` to change colors, fonts, and spacing.

### Add New Pages
Create files in `app/(dashboard)/` or `app/(auth)/` following Next.js conventions.

### Add New Components
Create components in `components/` and import in pages.

---

**Version:** 1.0.0
**Last Updated:** June 1, 2026
**Status:** Production Ready
