import path from 'path';
import express, { Request, Response, Application, NextFunction, Router } from 'express';
import { restRouteHandler } from './routers/utils/restRouteHandler';
import { contractorRouterConfig } from './routers/contractorRouter';
import { paymanRouterConfig } from './routers/paymanAirouter';
import cors from 'cors';

const app: Application = express();

const clientBuildPath = path.resolve(__dirname, '../../client/dist');

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
app.use(express.static(clientBuildPath));
app.use(express.json());

app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.options('*', cors());

app.use('/contractor', contractorRouterConfig.router);
app.use('/payment', paymanRouterConfig.router);

const routeConfigs = [contractorRouterConfig, paymanRouterConfig];

routeConfigs.forEach(routeConfig => {
  Object.entries(routeConfig.endpoints).forEach(([route, endpointConfig]) => {
    const { method } = endpointConfig;
    if (method === 'get') {
      routeConfig.router.get(route, restRouteHandler(endpointConfig));
    } else {
      routeConfig.router.post(route, restRouteHandler(endpointConfig));
    }
  });
});

app.get('/*', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error on handling request', err);
  res.status(500).send('Server error on handling request ');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception thrown', err);
});

process.on('unhandledRejection', (reason: string, promise: Promise<any>) => {
  console.error('Uncaught Rejection', reason);
});
