const db = require('../Config/db');

const createUser = (user, callback) => {
  const sql = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
  db.query(sql, [user.fullname, user.email, user.password], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

module.exports = {
  createUser,
  getUserByEmail,
};
