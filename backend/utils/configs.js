const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const jwtPublicKey = 'b0267b0b7720298ee51e644cd925986703c855992abaff6a3eacc06f7cc0db7e';

const {
  PORT = 3000,
  MONGO_PORT = 'mongodb://127.0.0.1:27017/mestodb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const tokenKey = NODE_ENV === 'production' ? JWT_SECRET : jwtPublicKey;

const allowedCors = ['https://moovies.nomoredomains.work/api', 'http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = {
  limiter,
  corsOptions,
  PORT,
  MONGO_PORT,
  tokenKey,
};
