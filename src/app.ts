import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import routes from './routes/CarRoutes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
