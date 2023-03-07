import JWT from 'jsonwebtoken';

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

export function createToken(value: string): string {
  const JWTSecretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY;

  if (!JWTSecretKey) throw new Error('환경 변수에 JWT 키가 존재하지 않습니다.');

  return JWT.sign(value, JWTSecretKey);
}
