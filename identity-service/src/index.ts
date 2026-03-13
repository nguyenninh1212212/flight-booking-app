// Sử dụng require kết hợp với kiểu dữ liệu của TS
const express = require('express');
import type { Request, Response } from 'express';
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Identity Service is running with CommonJS and TypeScript!');
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});