const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { password } = req.body;

  // Simple check for demo purposes (Phase 1)
  // Later we will use bcrypt and database
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        name: 'Sanjay Mehta',
        role: 'Principal'
      }
    });
  }

  res.status(401).json({
    status: 'fail',
    message: 'Invalid administrative password'
  });
};
