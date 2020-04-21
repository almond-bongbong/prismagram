import passport from 'passport';
import JWTStrategy from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: process.env.JWT_SECRET,
};
