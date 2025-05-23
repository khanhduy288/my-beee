import express from 'express';
import dotenv from 'dotenv';
import { getProducts } from './api/products.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/products', getProducts);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
