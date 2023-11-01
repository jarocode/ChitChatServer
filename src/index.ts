import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { initSocket } from './config/socket';
import { connectDB } from './config/db';
import authRoutes from './api/routes/auth.routes';

dotenv.config();

const app = express();
const httpServer = initSocket(app).server;

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(function (_req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});
app.use('/api', authRoutes);

connectDB();

// console.log('env', process.env.NODE_ENV);

// Only generate a token for lower level environments
// if (process.env.NODE_ENV !== 'production') {
//   console.log('JWT', generateToken());
//   console.log('VALIDATED_JWT', validateToken(generateToken()));
// }

// the rest logic

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

export default app;
