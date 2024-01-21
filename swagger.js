const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express");
const version = require('./package.json')
require('dotenv/config')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment Service API",
      description:
        "API endpoints for a payment service documented on swagger",
      contact: {
        name: "Oladosu Larinde",
        email: "larindeakin@gmail.com",
        url: "https://github.com/Dosu333/payment-service",
      },
      version: "1.0.0",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
    ],
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./routers/*.js", "./models/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use(`${process.env.API_URL}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get(`${process.env.API_URL}/docs.json`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
module.exports = swaggerDocs;
