# Backend API - Primetrade REST API

Complete REST API built with Express.js, TypeScript, and PostgreSQL. Features JWT authentication, role-based access control, and comprehensive CRUD operations.

##  Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_secure_password
   DB_NAME=primetrade

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
   JWT_EXPIRE=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   API_VERSION=v1

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Create PostgreSQL database:**
   ```bash
   createdb primetrade
   ```

4. **Start development server:**
   ```bash
   npm run dev:watch
   ```

   Server will run on `http://localhost:5000`

##  Project Structure

```
backend/
 src/
    config/
       app.ts              # Express app configuration with middleware
       database.ts         # Sequelize database configuration

    controllers/            # Business logic handlers
       authController.ts   # Registration, login, logout
       taskController.ts   # Task CRUD operations
       commentController.ts # Comment management
       userController.ts   # User profile & management
       adminController.ts  # Admin operations

    models/                 # Database models
       User.ts             # User schema with roles
       Task.ts             # Task entity
       Comment.ts          # Comment entity

    routes/                 # Express routes
       auth.ts             # Authentication endpoints
       tasks.ts            # Task CRUD endpoints
       comments.ts         # Comment endpoints
       users.ts            # User endpoints
       admin.ts            # Admin endpoints

    middlewares/            # Custom middleware
       auth.ts             # JWT verification & role-based access
       validate.ts         # Request validation

    validators/             # Input validation schemas
       authValidator.ts    # Auth request validation
       taskValidator.ts    # Task request validation

    utils/                  # Helper functions
       jwt.ts              # Token generation & verification
       password.ts         # Password hashing & comparison
       response.ts         # Standardized API responses

    index.ts                # Server entry point

 dist/                       # Compiled JavaScript (generated)
 package.json
 tsconfig.json
 README.md                   # This file
```

##  Key Features

### Authentication & Security
- **User Registration:** Email, username, password with validation
- **User Login:** JWT token generation with 7-day expiry
- **Password Security:** bcryptjs hashing with 10 salt rounds
- **Token Verification:** Bearer token validation on protected routes
- **User Isolation:** Tasks scoped to authenticated user

### Authorization
- **Role-Based Access Control:** User and Admin roles
- **Authorization Middleware:** Role checking on protected endpoints
- **Admin Panel:** User management and role assignment
- **Status Checking:** Inactive users cannot access APIs

### API Features
- **RESTful Design:** Standard HTTP methods and status codes
- **API Versioning:** `/api/v1/` prefix
- **Input Validation:** Joi schemas for request validation
- **Error Handling:** Comprehensive error messages with proper status codes
- **CORS Support:** Configured for frontend integration

##  API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

**Register User**
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

Response: 201 Created
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

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
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

**Logout**
```http
POST /auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Logout successful"
}
```

### Task Endpoints

**Create Task**
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

Response: 201 Created
```

**Get All Tasks (with filtering)**
```http
GET /tasks
Authorization: Bearer <token>

Query Parameters:
- status: pending, in_progress, completed
- priority: low, medium, high

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "pending",
      "priority": "high",
      ...
    }
  ]
}
```

**Get Single Task**
```http
GET /tasks/:id
Authorization: Bearer <token>

Response: 200 OK
```

**Update Task**
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}

Response: 200 OK
```

**Delete Task**
```http
DELETE /tasks/:id
Authorization: Bearer <token>

Response: 200 OK
```

### Comment Endpoints

**Add Comment**
```http
POST /comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great progress!",
  "taskId": "task-uuid"
}

Response: 201 Created
```

**Get Task Comments**
```http
GET /comments/task/:taskId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "content": "Comment text",
      "userId": "user-uuid",
      "createdAt": "2026-06-01T12:00:00Z"
    }
  ]
}
```

**Delete Comment**
```http
DELETE /comments/:id
Authorization: Bearer <token>

Response: 200 OK
```

### User Endpoints

**Get Profile**
```http
GET /users/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "user",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Update Profile**
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe"
}

Response: 200 OK
```

**Get All Users (Admin Only)**
```http
GET /users
Authorization: Bearer <admin-token>

Response: 200 OK
```

### Admin Endpoints

**Update User Role (Admin Only)**
```http
PUT /admin/users/:userId/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin"
}

Response: 200 OK
```

##  Security Details

### Password Hashing
- Algorithm: bcryptjs
- Salt Rounds: 10 (OWASP compliant)
- Passwords are hashed before storage
- Password comparison uses secure comparison

### JWT Tokens
- Algorithm: HS256
- Expiration: 7 days (configurable)
- Includes: user ID, email, role
- Transmitted via Bearer token in Authorization header

### Input Validation
- Email format validation
- Username uniqueness enforcement
- Password strength requirements
- Type safety with TypeScript

### API Security
- CORS configured to frontend domain only
- Helmet.js for security headers
- Rate limiting ready (can be added)
- User isolation in queries (cannot access other users' data)

##  Database Schema

### Users Table
```sql
CREATE TABLE "Users" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL (bcrypt hash),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' (user, admin),
  isActive BOOLEAN DEFAULT TRUE,
  lastLogin TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE "Tasks" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending' (pending, in_progress, completed),
  priority VARCHAR(50) DEFAULT 'medium' (low, medium, high),
  dueDate DATE,
  userId UUID NOT NULL REFERENCES "Users"(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_id ON "Tasks"("userId");
CREATE INDEX idx_tasks_status ON "Tasks"(status);
```

### Comments Table
```sql
CREATE TABLE "Comments" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  userId UUID NOT NULL REFERENCES "Users"(id),
  taskId UUID NOT NULL REFERENCES "Tasks"(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_task_id ON "Comments"("taskId");
CREATE INDEX idx_comments_user_id ON "Comments"("userId");
```

##  Testing

### Authentication Flow Testing
For comprehensive authentication testing including invalid credentials, valid credentials, and edge cases, see [AUTH_TEST_GUIDE.md](../AUTH_TEST_GUIDE.md).

### Test All Endpoints
```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"testuser","password":"Test123!","firstName":"Test","lastName":"User"}'

# Login (copy token from response)
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'

# Create Task (replace TOKEN)
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","status":"pending","priority":"high"}'

# Get Tasks
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN"

# Health Check
curl http://localhost:5000/health
```

##  Production Deployment

### Build for Production
```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Run in Production
```bash
npm start
```

Or use PM2 for process management:
```bash
pm2 start dist/index.js --name "primetrade-api" --instances 4
pm2 startup
pm2 save
```

### Environment Variables for Production
```env
# Use strong JWT secret (min 32 chars)
JWT_SECRET=your_very_long_and_secure_secret_key_at_least_32_characters

# Use managed database (AWS RDS, etc.)
DB_HOST=your-db.rds.amazonaws.com
DB_USER=prod_user
DB_PASSWORD=very_secure_password

# Production settings
NODE_ENV=production
API_VERSION=v1
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

##  Performance Optimization

### Database Optimization
- Indexes on frequently queried columns
- Connection pooling configured
- Parameterized queries (prevents SQL injection)

### API Optimization
- Pagination ready (can be added to getTasks)
- Caching ready (Redis integration possible)
- Compression via gzip

### Scaling Strategy
See `../SCALABILITY.md` for detailed multi-instance and microservices approach.

##  Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432

Solution:
1. Ensure PostgreSQL is running
2. Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env
3. Verify database 'primetrade' exists: createdb primetrade
```

### JWT Token Error
```
Error: Invalid token: jwt malformed

Solution:
1. Ensure JWT_SECRET is set in .env
2. Token must be included in Authorization header: Bearer <token>
3. Token may have expired (7 days default)
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000

Solution:
1. Change PORT in .env to an available port
2. Or kill process using port 5000:
   lsof -ti:5000 | xargs kill -9
```

##  Scripts

```bash
# Development
npm run dev          # Run with ts-node
npm run dev:watch   # Run with auto-reload (nodemon)

# Production
npm run build       # Compile TypeScript to JavaScript
npm start           # Run compiled JavaScript

# Linting (if configured)
npm run lint        # Check code style
```

##  Related Documentation

- [Main Project README](../README.md) - Full project overview
- [Scalability Guide](../SCALABILITY.md) - How to scale the API
- [Frontend README](../frontend/README.md) - Frontend setup and usage

##  Support

For API-specific questions:
1. Check the API Endpoints section above
2. Review the code comments in `src/` files
3. Test with curl commands provided
4. Check database schema for data structure

---

**Version:** 1.0.0
**Last Updated:** June 1, 2026
**Status:** Production Ready
