import { UserInput } from 'types/user';
import validator from 'validator';

export const login: Login = (userInput) => {
  if (Object.values(userInput).some((value) => !value)) {
    return {
      isValid: false,
      message: USER_VALIDATION_ERRORS.EMPTY_FORM,
    };
  }

  if (!validator.isEmail(userInput.email)) {
    return {
      isValid: false,
      message: USER_VALIDATION_ERRORS.INVALID_EMAIL,
    };
  }
  if (!validator.isLength(userInput.password, { min: 8 })) {
    return {
      isValid: false,
      message: USER_VALIDATION_ERRORS.INVALID_PASSWORD,
    };
  }
  return {
    isValid: true,
  };
};

type Login = (userInput: UserInput) => LoginResult;

type LoginResult =
  | {
      isValid: true;
      message?: string;
    }
  | {
      isValid: false;
      message: string;
    };

export const USER_VALIDATION_ERRORS = {
  EMPTY_FORM: '이메일 또는 비밀번호 값이 비어 있습니다.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  INVALID_PASSWORD: '패스워드 길이는 8자 이상이어야 합니다.',
  USER_NOT_FOUND: '로그인에 실패했습니다.',
  EXIST_USER: '이미 존재하는 사용자입니다.',
};

export const TODO_VALIDATION_ERRORS = {
  TODO_SOMETHING_WRONG: 'ToDo를 찾는 도중에 문제가 생겼습니다.',
  INVALID_VALUE: '입력을 다시 확인해주세요.',
};
