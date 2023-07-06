import cors from 'cors';
import express from 'express';

import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupSwagger from './swagger';

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app).catch(console.error);

export default app;
