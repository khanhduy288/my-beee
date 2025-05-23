import path from 'path';
import { promises as fs } from 'fs';

export async function getProducts() {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/products.json', 'utf8');
  return JSON.parse(fileContents);
}
