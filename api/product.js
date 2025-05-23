import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req, res) {
  const method = req.method;
  let products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (method === 'GET') {
    res.status(200).json(products);
  } else if (method === 'POST') {
    const newProduct = req.body;
    newProduct.id = Date.now();
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } else if (method === 'PUT') {
    const { id } = req.query;
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      res.status(200).json(products[index]);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } else if (method === 'DELETE') {
    const { id } = req.query;
    products = products.filter(p => p.id !== parseInt(id));
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
