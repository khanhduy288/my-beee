import path from 'path';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  // Chỉ cho phép phương thức GET (nếu cần)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing API key.' });
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
    const products = JSON.parse(fileContents);
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error reading products:', err);
    return res.status(500).json({ error: 'Failed to load products' });
  }
}
