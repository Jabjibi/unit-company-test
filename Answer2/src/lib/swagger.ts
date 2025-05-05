const swaggerJSDoc = require('swagger-jsdoc');

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo App API',
    version: '1.0.0',
    description: 'Swagger API documentation for the Todo app',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          description: { type: 'string' },
          due_date: { type: 'string', format: 'date' },
          priority: { type: 'string' },
          status: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
      NewTodo: {
        type: 'object',
        required: ['title', 'description', 'due_date', 'priority'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          due_date: { type: 'string', format: 'date' },
          priority: { type: 'string' },
        },
      },
    },
  },
};

export const options = {
  swaggerDefinition,
  apis: ['src/app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
