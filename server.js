import express from 'express';
import { getProducts } from './api/products.js';

const app = express();
const PORT = 3000;

app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error reading products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
