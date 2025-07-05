const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role || 'user']);
    conn.release();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
    conn.release();
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, 'access_secret', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, 'refresh_secret');

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).send('Refresh token required');

  jwt.verify(token, 'refresh_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid refresh token');

    const accessToken = jwt.sign({ username: user.username, role: user.role }, 'access_secret', { expiresIn: '15m' });
    res.json({ accessToken });
  });
};

module.exports = { register, login, refreshToken };
