import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import route from './routes/CarRoutes';

const app = express();

app.use(express.json());
app.use(route);
app.use(errorHandler);

export default app;
