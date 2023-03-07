import { insertUser, selectUser } from 'db/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserInput } from 'types/user';
import {
  login as loginValidator,
  USER_VALIDATION_ERRORS,
} from 'utils/validators';
import { createError, createToken } from './utils';

export async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email, password }: UserInput = req.body;

  const { isValid, message } = loginValidator({ email, password });
  if (!isValid) {
    return res.status(400).send(createError(message));
  }

  const foundUser = await selectUser(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    return res
      .status(400)
      .send(createError(USER_VALIDATION_ERRORS.USER_NOT_FOUND));
  }

  return res.status(200).send({
    message: '성공적으로 로그인 했습니다',
    token: createToken(email),
  });
}

export async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const userInput: UserInput = req.body;

  const { isValid, message } = loginValidator(userInput);
  if (!isValid) {
    return res.status(400).send(createError(message));
  }

  const existUser = await selectUser((user) => user.email === userInput.email);

  if (!existUser) {
    const newUser = await insertUser(userInput);

    return res.status(200).send({
      message: '계정이 성공적으로 생성되었습니다',
      token: createToken(newUser.email),
    });
  }

  return res.status(409).send(createError(USER_VALIDATION_ERRORS.EXIST_USER));
}
