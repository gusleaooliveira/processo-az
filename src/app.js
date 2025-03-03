import express from 'express';
import cors from 'cors';
import routes from './routes';
import { swaggerUi, swaggerSpec } from './swagger';  
import './database'

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  
  middlewares() {
    //tamanho configurado no express e no nginx
    this.server.use(express.json({limit: '100mb'}));
  }

  routes() {
    this.server.use(cors());

    // Rota para a documentação Swagger
    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

     // Rota para obter o JSON da especificação
     this.server.get('/docs-json', (req, res) => res.json(swaggerSpec));
     
    this.server.use(routes);

    
  }
}

export default new App().server;
