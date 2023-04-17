# ToDo

할 일 목록(TodoList)과 간단한 인증이 구현된 웹사이트입니다.

## 목차

- [실행 방법](#실행-방법)

## 구현 화면

배포된 [웹사이트]()를 확인하거나 다음 구현 화면을 확인하세요.



## 실행 방법

### DB

DB는 구글 시트를 사용합니다. 자신의 시트를 직접 연결하고 싶다면 [링크](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/)를 참고하세요.

### 패키지 설치

```bash
npm install
# 또는
yarn
```

### 환경 변수

루트 디렉터리의 `.env.local` 파일에 환경 변수를 설정합니다.

필요한 환경 변수는 다음과 같습니다.

- GOOGLE_SERVICE_ACCOUNT_EMAIL - 구글 클라이언트 이메일 ([링크](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/) 참고)
- GOOGLE_PRIVATE_KEY - 구글 비공개 키 ([링크](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/) 참고)
- GOOGLE_SHEET_ID - 구글 시트 ID ([링크](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/) 참고)
- JSON_WEB_TOKEN_SECRET_KEY - 토근 생성에 사용되는 임의의 문자열 ([문서](https://github.com/auth0/node-jsonwebtoken#readme) 참고)

### 실행

```bash
npm run dev
# 또는
yarn dev
```

이제 `http://localhost:3000`에서 앱이 실행되는 것을 확인할 수 있습니다.

## 구현 기능

### 인증

- 회원가입
- 로그인 및 로그아웃
- 입력 값에 대한 유효성 검사
- 비로그인 사용자 차단

### ToDo

- CRUD
- 목록 정렬
- ToDo 조회에 따른 URL 변화

## 디렉터리 구조

가장 상단의 디렉터리 구조만 정리하면 다음과 같습니다.

```
wanted-pre-onboarding-challenge-fe-1
├─ components # 컴포넌트
├─ constants # 공통 상수
├─ controllers # 컨트롤러
├─ cypress # E2E 테스팅
├─ db # DB 관련 논리
├─ hooks # 공통 훅
├─ pages # 페이지 (라우팅)
├─ public # 정적 파일
├─ styles # 공통 스타일
├─ types # 공통 타입
└─ utils # 공통 유틸
```

자세한 내용은 [고민의 디렉터리 구조](#디렉터리-구조-2)를 참고하세요.

## 고민

프로젝트를 진행 중에 생겼던 고민과 그 결과입니다.

### 명명 규칙(naming convention)

디렉터리와 파일의 이름에서는 `kebab-case`를 사용했습니다. 그 이유는 다음과 같습니다.

1. Git(기본 설정과 명령에서)과 일부 파일 시스템에서는 대소문자를 구분하지 않음
2. `camelCase`, `PascalCase`와 비교하면 가독성이 더 좋다고 판단함
3. `snake_case`와 비교하면 `Shift` 키를 사용할 필요가 없음

참고로 [구글 자바스크립트 스타일 가이드](https://google.github.io/styleguide/jsguide.html#file-name)에서는 `snake_case`나 `kebab-case`을 사용합니다.

코드 내부에서는 기존의 명명 규칙([에어비앤비 자바스크립트 스타일 가이드](https://github.com/parksb/javascript-style-guide#%EB%AA%85%EB%AA%85%EA%B7%9C%EC%B9%99-naming-conventions), [리액트 공식 문서](https://ko.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized))을 그대로 사용합니다.

관련 문제는 다음과 같습니다.

- [[리팩터링] 컴포넌트 파일의 명명 규칙 변경](https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1/issues/21)
- [[리팩터링] 파일의 명명 규칙 변경](https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1/pull/24)

### 디렉터리 구조



### 탠스택 쿼리 적용



### 백엔드 마이그레이션

[기존의 백엔드](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)는 [Express.js](https://expressjs.com/)로, 프론트엔드는 [Next.js](https://nextjs.org/)로 작성되었습니다. 하지만 배포 환경인 [Vercel](https://vercel.com/)에서 Express.js를 적용하는 과정이 순탄치 않았고, 프론트엔드와 백엔드가 따로 있다 보니 CORS 문제도 발생했습니다. 그리고 Vercel에서도 백엔드를 [Next.js](https://nextjs.org/)의 [API 경로](https://nextjs.org/docs/api-routes/introduction)로 구현하는 것을 권장했기 때문에, 기존의 익스프레스를 넥스트로 옮기는 백엔드 마이그레이션을 수행하게 되었습니다.

Express.js와 Next.js 모두 Node.js 기반 프레임워크라는 공통점이 있어 마이그레이션이 크게 어렵지는 않았습니다. 다만 기존의 백엔드에서 [lowdb](https://github.com/typicode/lowdb)를 사용하는 것이 문제가 되어, 결국 [DB 마이그레이션](#DB-마이그레이션)도 필요하게 되었습니다.

관련 문제는 다음과 같습니다.

- [백엔드 통합](https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1/issues/25)

### DB 마이그레이션

Vercel의 무서버 함수(serverless function)는 기본적으로 무상태(stateless)입니다. 기존의 백엔드에서는 [lowdb](https://github.com/typicode/lowdb)를 사용하였는데, 이는 로컬 JSON 데이터베이스이므로 유상태(stateful)입니다. 결과적으로, Vercel의 무서버 함수를 사용하려면 DB 마이그레이션이 필요하게 되었습니다.

DB는 [Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/)를 사용했습니다. Google Sheets를 DB로 사용하려면, [몇 가지 설정](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/)이 필요하고 [Google Sheets API](https://developers.google.com/sheets/api/reference/rest?hl=ko)를 사용해야 합니다. Google Sheets는 기본적으로 스프레드시트 프로그램이기 때문에 DB로 사용하기에는 속도가 느리고 제한도 있습니다. 하지만 다음과 같은 이유로 Google Sheets를 사용하게 되었습니다.

- 무료 (가장 중요!)
- DB 수에 제한이 없음 (일부 무료 클라우드 DB에는 개수 제한이 있음)
- 현재 프로젝트에서는 Google Sheets의 단점이 큰 문제가 안 됨

참고로 Google Sheets API의 래퍼 역할을 하는 [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet)를 사용할 수 있습니다.

### 기존 타입 확장하여 사용하기



### controllerSwitch 유틸



## 한계
