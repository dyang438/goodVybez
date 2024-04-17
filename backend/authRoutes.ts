// Import statements using ES6 syntax
import jwt from 'jsonwebtoken';
import User from './models/User'; // Adjust the User model export to be compatible with ES6 imports
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

// Register User route
app.post('/register', [
  body('username').isString(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let newUser = new User(req.body); // Renamed to newUser to avoid any potential scope confusion
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login User route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '24h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
