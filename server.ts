import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import cryptoRoutes from './crypto/routers';

const router: Express = express();


// TO be continued