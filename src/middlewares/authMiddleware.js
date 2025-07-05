const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access token required');

  jwt.verify(token, 'access_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid access token');

    req.user = user;
    next();
  });
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).send('Forbidden');

  next();
};

module.exports = { authenticateToken, authorizeRole };
