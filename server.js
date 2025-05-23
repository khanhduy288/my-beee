const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001; // FE có thể chạy ở 3000, backend 3001
const filePath = path.join(__dirname, "products.json");

app.use(cors()); // Cho phép FE truy cập API
app.use(express.json());

// Lấy danh sách sản phẩm
app.get("/api/products", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// Thêm sản phẩm
app.post("/api/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath));
  const newProduct = req.body;
  newProduct.id = Date.now(); // đơn giản tạo ID
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

// Cập nhật sản phẩm
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;
  const products = JSON.parse(fs.readFileSync(filePath));
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updated };
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Xóa sản phẩm
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let products = JSON.parse(fs.readFileSync(filePath));
  products = products.filter(p => p.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API đang chạy ở http://localhost:${PORT}`);
});
