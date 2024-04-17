
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // Add decoded token to request object
    next();
  } catch (error) {
    res.status(401).send('Please authenticate');
  }
};

app.get('/secure', auth, (req, res) => {
  res.send('This is a secure route');
});
