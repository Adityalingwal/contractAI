import path from 'path';
import express, { Request, Response, Application, NextFunction, Router } from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { restRouteHandler } from './routers/utils/restRouteHandler';


const app: Application = express();

const clientBuildPath = path.resolve(__dirname, '../../client/build');

app.use(express.static(clientBuildPath));
app.use(express.json());


app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(cookieParser());
app.use(passport.initialize());

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'localhost') {
    next();
    return;
  }
});


const routeConfigs = [
  router,
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


app.get('/*', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'localhost') {
    next(err);
    return;
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'localhost') {
    console.error('Server error on handling request', err);
  }
  res.status(500).send('Server error on handling request ');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'localhost') {
    console.log(`Server is Fire at http://localhost:${PORT}`);
    return;
  }
});

process.on('uncaughtException', function (err) {
  if (process.env.NODE_ENV === 'localhost') {
    console.error('Uncaught Exception thrown', err);
    return;
  }
});

process.on('unhandledRejection', (reason: string, promise: Promise<any>) => {
  if (process.env.NODE_ENV === 'localhost') {
    console.error('Uncaught Rejection', reason);
    return;
  }
});
