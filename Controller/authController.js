const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModule'); // ✅ Fixed folder name (models, not Model)

exports.signup = (req, res) => {
  const { fullname, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    User.createUser({ fullname, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(400).json({ error: 'Email already exists or DB error' });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }


      const token = jwt.sign({ id: user.id, email: user.email }, "ifiwieijweijeij", {
        expiresIn: '1h',
      });

     
      res.json({ token, fullname: user.fullname, email: user.email });
    });
  });
};
