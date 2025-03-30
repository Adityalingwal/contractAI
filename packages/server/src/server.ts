declare module 'express-session';
declare module 'pg';
import path from 'path';
import express, { Request, Response, Application, NextFunction, Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { restRouteHandler } from './routers/utils/restRouteHandler';
import { contractorRouterConfig } from './routers/contractorRouter';
import { companyRouterConfig } from './routers/companyRouter';
import { taskRouterConfig } from './routers/taskRouter';
import { skillRouterConfig } from './routers/skillRouter';
import { invoiceRouterConfig } from './routers/invoiceRouter';
import { paymanRouterConfig } from './routers/paymanAirouter';

const app: Application = express();

const clientBuildPath = path.resolve(__dirname, '../../client/dist');

app.use(express.static(clientBuildPath));
app.use(express.json());

app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(cookieParser());
app.use(passport.initialize());

// Register all the router configurations
app.use('/contractor', contractorRouterConfig.router);
app.use('/company', companyRouterConfig.router);
app.use('/task', taskRouterConfig.router);
app.use('/skill', skillRouterConfig.router);
app.use('/invoice', invoiceRouterConfig.router);
app.use('/payman', paymanRouterConfig.router);

const routeConfigs = [
  contractorRouterConfig,
  companyRouterConfig,
  taskRouterConfig,
  skillRouterConfig,
  invoiceRouterConfig,
  paymanRouterConfig,
];

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

// All other GET requests not handled before will return our React app
app.get('/*', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Simple pass-through without environment checks
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log all errors directly to console
  console.error('Server error on handling request', err);
  res.status(500).send('Server error on handling request ');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Global error handlers - always log to console
process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception thrown', err);
});

process.on('unhandledRejection', (reason: string, promise: Promise<any>) => {
  console.error('Uncaught Rejection', reason);
});
