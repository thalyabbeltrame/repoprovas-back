import cors from 'cors';
import express from 'express';
import 'express-async-errors';

export const app = express();

app.use(express.json());
app.use(cors());
