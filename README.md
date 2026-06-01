# Primetrade REST API: Scalable REST API with Authentication & Role-Based Access

A full-stack application featuring a secure REST API with JWT authentication, role-based access control, and a responsive Next.js frontend. Built with Express.js, TypeScript, PostgreSQL, and Next.js.

## Project Overview

This project demonstrates a production-ready backend system with:

- Secure Authentication: JWT-based with bcryptjs password hashing
- Role-Based Access Control: User and Admin roles with middleware enforcement
- CRUD APIs: Complete task management system with comments
- Scalable Architecture: Modular structure with separation of concerns
- Type Safety: Full TypeScript support for backend and frontend
- Input Validation: Comprehensive request validation with Joi
- Security Headers: Helmet.js for protection against common vulnerabilities
- Responsive UI: Next.js with Tailwind CSS and Shadcn/UI components

## Architecture

### Backend Structure

```
backend/
 src/
    config/          # App and database configuration
    controllers/     # Business logic (auth, tasks, comments, users, admin)
    models/          # Database models (User, Task, Comment)
    routes/          # Express route definitions
    middlewares/     # Authentication and validation middleware
    validators/      # Input validation schemas
    utils/           # JWT, password hashing, response formatting
 dist/                # Compiled JavaScript
 package.json
 tsconfig.json
```

### Frontend Structure

```
frontend/
 app/                 # Next.js app directory
    (auth)/          # Authentication pages (login, register)
    (dashboard)/     # Protected dashboard pages
    layout.tsx       # Root layout
 components/          # React components
    ui/              # Shadcn/UI components
    tasks/           # Task management components
 lib/                 # Utility functions (API client, helpers)
 hooks/               # Custom React hooks
 types/               # TypeScript types
 package.json
```

##  Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=primetrade

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
   JWT_EXPIRE=7d

   # API
   PORT=5000
   NODE_ENV=development
   API_VERSION=v1

   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Create PostgreSQL database:**
   ```bash
   createdb primetrade
   ```

5. **Start the server:**
   ```bash
   # Development with auto-reload
   npm run dev:watch

   # Production build
   npm run build
   npm start
   ```

   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`

##  API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "user",
    "token": "eyJhbGc..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "user",
    "token": "eyJhbGc..."
  }
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logout successful"
}
```

### Task Endpoints

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the  project",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2026-06-05"
}
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>

Query Parameters:
- status: pending, in_progress, completed
- priority: low, medium, high
```

#### Get Task by ID
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

### Comment Endpoints

#### Add Comment
```http
POST /comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great progress!",
  "taskId": "task-uuid"
}
```

#### Get Task Comments
```http
GET /comments/task/:taskId
Authorization: Bearer <token>
```

#### Delete Comment
```http
DELETE /comments/:id
Authorization: Bearer <token>
```

### User Endpoints

#### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe"
}
```

#### Get All Users (Admin Only)
```http
GET /users
Authorization: Bearer <admin-token>
```

### Admin Endpoints

#### Update User Role
```http
PUT /admin/users/:userId/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin"
}
```

### API Documentation Interface

Access interactive API documentation:
```
http://localhost:5000/api-docs
```

##  Security Features

### Authentication & Authorization
- **JWT Tokens:** 7-day expiring tokens with HS256 algorithm
- **Password Hashing:** bcryptjs with 10 salt rounds (OWASP compliant)
- **Bearer Token:** Required in `Authorization` header for protected endpoints
- **User Isolation:** Tasks and comments scoped to authenticated user

### Input Validation
- **Request Validation:** Joi schemas for all inputs
- **Email Validation:** Duplicate email prevention
- **Username Uniqueness:** Enforced at database level
- **Type Safety:** TypeScript strict mode enabled

### Security Headers
- **Helmet.js:** Protects against XSS, clickjacking, CSRF
- **CORS:** Configured to only allow frontend domain
- **Content Security Policy:** Enabled via Helmet

### Data Protection
- **Password Never Stored:** Only bcrypt hashes stored
- **Token Validation:** Each request verifies token validity
- **User Status Check:** Inactive users cannot access APIs
- **Role-Based Access:** Authorization middleware enforces roles

##  Scalability Architecture

### Current Implementation
- RESTful API design following HTTP standards
- Modular controller-based architecture
- Database abstraction via Sequelize ORM
- Middleware pattern for cross-cutting concerns

### Scaling Strategies

#### Horizontal Scaling
1. **Load Balancer:** Use nginx or HAProxy to distribute requests
2. **Stateless API:** Sessions stored in JWT tokens (not server memory)
3. **Database Replication:** PostgreSQL read replicas for query scaling
4. **Message Queue:** Add Bull/RabbitMQ for async task processing

#### Caching Layer
1. **Redis Cache:** Cache frequently accessed data
   - User profiles (cache-aside pattern)
   - Task lists (invalidate on create/update)
   - Comment counts
2. **Frontend Caching:** Next.js ISR (Incremental Static Regeneration)

#### Microservices Architecture
```
API Gateway (nginx)
     Auth Service (Port 5001)
     Task Service (Port 5002)
     User Service (Port 5003)
     Comment Service (Port 5004)

Shared Resources:
     PostgreSQL Master (write)
     PostgreSQL Read Replicas
     Redis (session & cache)
     Message Queue (async tasks)
```

#### Database Optimization
1. **Indexing:** Add indexes on frequently queried columns
   - `users.email` (login)
   - `tasks.userId` (user's tasks)
   - `comments.taskId` (task comments)
2. **Query Optimization:** Use Sequelize query optimization
3. **Connection Pooling:** Configure connection limits

#### Content Delivery
1. **CDN:** Serve frontend assets via CloudFront/Cloudflare
2. **Compression:** Enable gzip compression in Express
3. **Caching Headers:** Set appropriate Cache-Control headers

#### Monitoring & Logging
1. **Centralized Logging:** ELK Stack or Datadog
2. **Metrics:** Prometheus for system metrics
3. **Uptime Monitoring:** NewRelic or Sentry for error tracking
4. **Database Monitoring:** Query performance insights

### Deployment Options

#### Docker Containerization
```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

#### Cloud Deployment
- **AWS:** ECS/EKS for containers, RDS for database
- **Azure:** App Service with Azure Database for PostgreSQL
- **GCP:** Cloud Run for serverless, Cloud SQL for database
- **Heroku:** Simple deployment with environment variables

##  Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests (if setup)
cd frontend
npm test
```

##  Database Schema

### User Table
```sql
CREATE TABLE "Users" (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  isActive BOOLEAN DEFAULT TRUE,
  lastLogin TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Task Table
```sql
CREATE TABLE "Tasks" (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'medium',
  dueDate DATE,
  userId UUID NOT NULL REFERENCES "Users"(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Comment Table
```sql
CREATE TABLE "Comments" (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  userId UUID NOT NULL REFERENCES "Users"(id),
  taskId UUID NOT NULL REFERENCES "Tasks"(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

##  Contributing

This is an  project. For improvements or bug reports, please open an issue or submit a pull request.

##  License

MIT License - See LICENSE file for details

##  Author

**Kshitij** -  Project 2026

---

##  Support

For issues or questions:
1. Check the API documentation at `/api-docs`
2. Review the code comments
3. Test endpoints using the provided examples

---

**Last Updated:** June 1, 2026
**Version:** 1.0.0
**Status:** Production Ready
