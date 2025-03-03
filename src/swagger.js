// src/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Documentação da API - Desafio Back-End',
        version: '1.0.0',
        description: 'Documentação da API desenvolvida para o desafio de back-end.',
      },
      servers: [
        {
          url: 'http://localhost:3333',
        },
      ],
    },
    apis: ['./src/routes.js', './src/app/controllers/*.js'], 
components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  
  };
  

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
