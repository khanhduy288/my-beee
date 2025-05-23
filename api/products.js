import path from 'path';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export async function getProducts(req, res) {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing API key.' });
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
    const products = JSON.parse(fileContents);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load products' });
  }
}
