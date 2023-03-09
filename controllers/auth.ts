import { insertUser, selectUser } from 'db/user';
import { UserInput } from 'types/user';
import {
  login as loginValidator,
  USER_VALIDATION_ERRORS,
} from 'utils/validators';
import { Controller } from './types';
import { createError, createToken } from './utils';

export const login: Controller = async (req, res) => {
  const { email, password }: UserInput = req.body;

  const { isValid, message } = loginValidator({ email, password });
  if (!isValid) {
    return res.status(400).json(createError(message));
  }

  const foundUser = await selectUser(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    return res
      .status(400)
      .json(createError(USER_VALIDATION_ERRORS.USER_NOT_FOUND));
  }

  return res.status(200).json({
    message: '성공적으로 로그인 했습니다',
    token: createToken(email),
  });
};

export const signUp: Controller = async (req, res) => {
  const userInput: UserInput = req.body;

  const { isValid, message } = loginValidator(userInput);
  if (!isValid) {
    return res.status(400).json(createError(message));
  }

  const existUser = await selectUser((user) => user.email === userInput.email);

  if (!existUser) {
    const newUser = await insertUser(userInput);

    return res.status(200).json({
      message: '계정이 성공적으로 생성되었습니다',
      token: createToken(newUser.email),
    });
  }

  return res.status(409).json(createError(USER_VALIDATION_ERRORS.EXIST_USER));
};
