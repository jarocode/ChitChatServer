import express from "express";

import { generateToken, validateToken } from './api/utils/jwt.utils';
import {connectDB} from "./config/db";

const app = express();
const port = 3000;

connectDB();

// Only generate a token for lower level environments
if (process.env.NODE_ENV !== 'production') {
  console.log('JWT', generateToken());
  console.log('VALIDATED_JWT', validateToken (generateToken()));
}

// the rest logic

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
});