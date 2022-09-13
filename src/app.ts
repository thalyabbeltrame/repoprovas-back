import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import { router } from './routers';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
