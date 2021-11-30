import http from 'http';
import express, { Express } from 'express';
import logging from './config/logger';
import config from './config/config';
import healthRouter from './routers/health/health.router';
import coinmarkcapRouter from './routers/crypto/coinmarkcap.router';
import twelvedataRouter from './routers/crypto/twelvedata.router';
import cors from 'cors';

const NAMESPACE = 'Server';
const app: Express = express();

/** Register middlewares */
app.use(cors());

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});

/** API Rules */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});

/** Routes*/
app.use('/api/health', healthRouter);
app.use('/api/crypto/coinmark', coinmarkcapRouter);
app.use('/api/crypto/healthdata', twelvedataRouter);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
