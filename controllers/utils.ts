import jwt from 'jsonwebtoken';

export function createResponse<T>(data: T) {
  return {
    data,
  };
}

export function createError<T>(details: T) {
  return {
    details,
  };
}

const JWT_TOKEN_SALT = 'jwtTokenSalt';

export function createToken(value: string) {
  return jwt.sign(value, JWT_TOKEN_SALT);
}
