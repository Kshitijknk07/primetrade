import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Primetrade REST API',
      description: 'Production-ready REST API with JWT Authentication and Role-Based Access Control',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'support@primetrade.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server',
      },
      {
        url: 'https://api.primetrade.com/api/v1',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authentication token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'username', 'password'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            firstName: {
              type: 'string',
              description: 'First name',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
            },
            isActive: {
              type: 'boolean',
              description: 'User active status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date',
            },
          },
        },
        Task: {
          type: 'object',
          required: ['title', 'status', 'priority'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Task ID',
            },
            title: {
              type: 'string',
              description: 'Task title',
            },
            description: {
              type: 'string',
              description: 'Task description',
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed'],
              description: 'Task status',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Task priority',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Task due date',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'Owner user ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation date',
            },
          },
        },
        Comment: {
          type: 'object',
          required: ['content', 'taskId'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Comment ID',
            },
            content: {
              type: 'string',
              description: 'Comment text',
            },
            taskId: {
              type: 'string',
              format: 'uuid',
              description: 'Associated task ID',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'Author user ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Comment creation date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            status: {
              type: 'integer',
              description: 'HTTP status code',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
