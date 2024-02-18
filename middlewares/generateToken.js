import jwt from 'jsonwebtoken';

const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: '30d',
  });

  console.log(token);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;