import config from 'config';
import express from 'express';
import compression from 'compression';
import router from '../controllers/router';

const app = express();

app.use(compression(config.get('compression')));
app.use(express.json(config.get('express.json')));
app.use(router);

export default app;
