const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`API REST running on http://localhost:${port}`);
});
