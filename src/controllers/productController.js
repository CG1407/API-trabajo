const pool = require('../db');

const getAllProducts = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [products] = await conn.query('SELECT * FROM products');
    conn.release();
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    conn.release();
    res.status(201).send('Product created successfully');
  } catch (error) {
    res.status(500).send('Error creating product');
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
    conn.release();
    res.send('Product updated successfully');
  } catch (error) {
    res.status(500).send('Error updating product');
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM products WHERE id = ?', [id]);
    conn.release();
    res.send('Product deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
