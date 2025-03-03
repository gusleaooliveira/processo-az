// src/routes.js
import { Router } from 'express';
import DashboardsController from './app/controllers/DashboardsController';
import SessionsController from './app/controllers/SessionsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();


// Rota de login 
/**
 * @swagger
 * /proof/session:
 *   post:
 *     summary: Autenticação do usuário
 *     description: Realiza a autenticação do usuário com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "teste@azape.co"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 */
routes.post('/proof/session', SessionsController.store);



// Middleware de autenticação
routes.use(authMiddleware);

// Rota do dashboard
/**
 * @swagger
 * /proof/dashboard:
 *   get:
 *     summary: Retorna o dashboard com os resumos de pedidos e vendas
 *     description: >
 *       Retorna dados agregados, como total de pedidos, total de vendas, ticket médio e a lista de pedidos.
 *       É possível filtrar os pedidos por data utilizando os parâmetros `startDate` e `endDate` (opcional).
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial para filtrar os pedidos (opcional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final para filtrar os pedidos (opcional)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders_total:
 *                   type: number
 *                   example: 35441.14
 *                 orders_count:
 *                   type: number
 *                   example: 14
 *                 sales_total:
 *                   type: number
 *                   example: 35441.14
 *                 sales_count:
 *                   type: number
 *                   example: 14
 *                 average_ticket:
 *                   type: number
 *                   example: 2531.51
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "70c9babe0d06c6d06"
 *                       customer:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Mateus Eduardo Taufer dos Santos"
 *                           doc:
 *                             type: string
 *                             example: "01335224054"
 *                           email:
 *                             type: string
 *                             example: "mateus.taufer@azape.co"
 *                           phone:
 *                             type: string
 *                             example: "5551983859494"
 *                       seller:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "76f4e96c8fc8588e6"
 *                           name:
 *                             type: string
 *                             example: "Nereu da Silva Moises"
 *                           email:
 *                             type: string
 *                             example: "nereu@seller.com"
 *                       payment:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                             example: 100
 *                           discount:
 *                             type: number
 *                             example: 30
 *                           status:
 *                             type: string
 *                             example: "succeeded"
 *                           method:
 *                             type: string
 *                             example: "pix"
 *                           installments:
 *                             type: number
 *                             example: 0
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2022-01-01T22:00:00.000Z"
 */
routes.get('/proof/dashboard', DashboardsController.index);

export default routes;
