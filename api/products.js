import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY; // Lấy từ biến môi trường

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing API key.' });
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/products.json', 'utf8');
    const products = JSON.parse(fileContents);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load products' });
  }
}
