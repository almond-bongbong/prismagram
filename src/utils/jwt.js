import jwt from 'jsonwebtoken';

export const generateJwt = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
