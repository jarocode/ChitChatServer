import express from "express";
import { generateToken } from './api/utils/jwt.utils';

const app = express();
const port = 3000;

// Only generate a token for lower level environments
if (process.env.NODE_ENV !== 'production') {
  console.log('JWT', generateToken());
}

// the rest logic

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});