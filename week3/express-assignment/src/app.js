import express from 'express';
import cors from 'cors';
import userRouter from './api/routes/userRoutes.js';
import authRouter from './api/routes/authRoutes.js';
import catRouter from './api/routes/catRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cat', catRouter);

app.use(errorHandler);

export default app;
export { app };
