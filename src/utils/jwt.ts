import 'dotenv/config';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

interface IPayload {
  id: string;
  email: string;
}

export default {
  sign: (payload: IPayload) =>
    jwt.sign(payload, SECRET, { expiresIn: '1h', algorithm: 'HS256' }),

  verify: (token: string) => jwt.verify(token, SECRET),
};