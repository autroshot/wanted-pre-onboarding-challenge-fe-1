# ToDo

할 일(Todo)과 간단한 인증이 구현된 웹사이트입니다.

## 목차

- [구현 기능](#구현-기능)
- [구현 화면](#구현-화면)
- [실행 방법](#실행-방법)
- [기술 스택](#기술-스택)
- [디렉터리 구조](#디렉터리-구조-1)
- [고민](#고민)
- [한계 및 개선 사항](#한계-및-개선-사항)

## 구현 기능

### 인증

- 회원가입
- 로그인 및 로그아웃
- 입력 값에 대한 유효성 검사
- 비로그인 사용자 차단

### ToDo

- CRUD
- 목록 정렬
- 할 일 조회에 따른 URL 변화

## 구현 화면

배포된 [웹사이트](https://wanted-pre-onboarding-challenge-fe-1-kappa.vercel.app/)에서 직접 확인할 수 있습니다. 서비스 이용을 위한 인증은 다음을 사용할 수 있습니다.

- 이메일 - `test@test.com`
- 비밀번호 - `12345678`

또는 직접 회원가입을 통한 인증도 가능합니다.

구현 화면은 다음의 동영상으로도 확인할 수 있습니다.

<details>
  <summary>동영상 보기</summary>

  ### 인증

  https://user-images.githubusercontent.com/95019875/232439528-1c50dabe-1b85-47b8-8e6b-cbbdd906780c.mp4

  ### 할 일 CRUD

  https://user-images.githubusercontent.com/95019875/232439729-639a27e3-056d-47f6-8775-395b68e6995f.mp4

  ### 할 일 URL

  https://user-images.githubusercontent.com/95019875/232439822-e86a21ac-ba12-4e64-93d1-b75c9daa2596.mp4

</details>

## 실행 방법

### DB

DB는 [Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/)를 사용합니다. 자신의 시트를 직접 연결하고 싶다면 [링크](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/)를 참고하세요.

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

## 기술 스택

### 언어

- JavaScript
- [TypeScript](https://www.typescriptlang.org/)

### 프런트엔드

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

### CSS 프레임워크

- [Chakra UI](https://chakra-ui.com/)

### DB

- [Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/) - 자세한 내용은 [고민](#DB-마이그레이션) 참고
- [google-spreadsheet](https://theoephraim.github.io/node-google-spreadsheet/#/) - [Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/)의 래퍼

### 데이터 가져오기

- [Axios](https://axios-http.com/)
- [TanStack Query](https://tanstack.com/query/latest) - 서버 상태 관리

### 폼 관리 및 유효성 검사

- [React Hook Form](https://react-hook-form.com/)

### 테스팅

- [Cypress](https://docs.cypress.io/)

## 디렉터리 구조

최상위 디렉터리 구조만 정리하면 다음과 같습니다.

```
wanted-pre-onboarding-challenge-fe-1
├─ components # 컴포넌트
├─ constants # 공통 상수
├─ controllers # 컨트롤러
├─ cypress # E2E 테스팅
├─ db # DB 관련 논리
├─ hooks # 공통 훅
├─ pages # 페이지(라우팅)
├─ public # 정적 파일
├─ styles # 공통 스타일
├─ types # 공통 타입
└─ utils # 공통 유틸
```

자세한 내용은 [고민의 디렉터리 구조](#디렉터리-구조-2)를 참고하세요.

## 고민

프로젝트를 진행 중에 가졌던 고민과 그 결과입니다.

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

> 함께 변경되는 것들은 가능한 가까운 곳에 둔다. - [Dan Abramov](https://twitter.com/dan_abramov)

위와 같은 [코로케이션(colocation, 함께 두기)](https://kentcdodds.com/blog/colocation#the-principle) 원칙을 따랐습니다. 기본적으로 기능별로 나누되, 기능 안에서는 필요에 따라 유형별로 나눴습니다.

최상위 디렉터리부터 기능별로 나누는 것도 고려하였으나, 대신 `components` 디렉터리 안에서부터 기능별로 나눴습니다. React는 모든 요소가 컴포넌트 단위로 작동하기 때문입니다.

공통적으로 사용되는 것들은 가장 가까운 상위 디렉터리에 최대한 위치시켰습니다. 모듈을 찾아 상위 디렉터리로 올라가다가 다시 하위 디렉터리로 내려오는 것을 일부 막아줍니다.

앞의 [디렉터리 구조](#디렉터리-구조-1)에서 봤듯이 최상위에는 컴포넌트, 테스팅, 컨트롤러, 페이지(라우팅) 디렉터리 등이 위치합니다. 그리고 프로젝트 전체적으로 사용되는 공통 훅(hook), 유틸, 상수, 타입 디렉터리 등이 위치합니다.

`components` 디렉터리 내부에서는 `auth`(인증), `layout`(레이아웃), `todo`(할 일)로 나눠집니다. 예시로 `todo` 디렉터리 내부를 살펴보면 다음과 같습니다.

```
todo # 할 일 컴포넌트
├─ detail # 상세 컴포넌트
│  ├─ index.ts # 인덱스
│  ├─ buttons.tsx # 버튼 컴포넌트
│  ├─ inputs.tsx # 입력들 컴포넌트
│  └─ ...
├─ list # 목록 컴포넌트
│  ├─ index.ts # 인덱스
│  ├─ todo.tsx # 할 일 컴포넌트 (다음 todos의 항목)
│  ├─ todos.tsx # 할 일들 컴포넌트
│  └─ ...
├─ index.ts # 인덱스
├─ fetchers.ts # 공통 페쳐
├─ hooks.ts # 공통 훅
├─ queries.ts # 공통 쿼리
└─ types.ts # 공통 타입
```

`todo` 디렉터리 내부에도 `todo` 컴포넌트 전용 훅, 유틸, 타입 등이 존재한다는 것을 알 수 있습니다. 필요하다면 `detail`과 `list` 디렉터리 내부에도 전용 훅, 유틸, 상수, 페쳐(fetcher), 쿼리, 타입 등이 존재할 수 있습니다.

### TanStack Query 적용

[TanStack Query](https://github.com/tanstack/query)는 이전에 '리액트 쿼리'로 불렸던 데이터 가져오기 라이브러리입니다. 구체적으로는 **서버 상태**를 가져오고, 캐싱하고, 동기화하고, 업데이트하는 작업을 쉽게 만들어줍니다.

'할 일'이라는 서버 상태를 TanStack Query로 관리함으로써 코드가 선언적이고 간결해졌습니다.

기존에는 할 일 생성/업데이트/삭제 이후에 데이터를 새로 가져와야 했습니다. TanStack Query의 `setQueryData`를 사용하면 데이터를 새로 가져올 필요없이 기존의 상태를 업데이트할 수 있습니다. 따라서 네트워크 호출을 절약할 수 있습니다.

관련 문제는 다음과 같습니다.

- [탠스택 쿼리 적용](https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1/issues/1)

### 백엔드 마이그레이션

[기존의 백엔드](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)는 [Express.js](https://expressjs.com/)로, 프론트엔드는 [Next.js](https://nextjs.org/)로 작성되었습니다. 하지만 배포 환경인 [Vercel](https://vercel.com/)에서 Express.js를 적용하는 과정이 순탄치 않았고, 프론트엔드와 백엔드가 따로 있다 보니 CORS 문제도 발생했습니다. 그리고 Vercel에서도 백엔드를 Next.js의 [API 경로](https://nextjs.org/docs/api-routes/introduction)로 구현하는 것을 권장했기 때문에, 기존의 Express.js를 Next.js로 옮기는 백엔드 마이그레이션을 수행하게 되었습니다.

Express.js와 Next.js 모두 Node.js 기반 프레임워크라는 공통점이 있어 마이그레이션이 크게 어렵지는 않았습니다. 다만 기존의 백엔드에서 [lowdb](https://github.com/typicode/lowdb)를 사용하는 것이 문제가 되어, 결국 [DB 마이그레이션](#DB-마이그레이션)도 필요하게 되었습니다.

관련 문제는 다음과 같습니다.

- [백엔드 통합](https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1/issues/25)

### DB 마이그레이션

Vercel의 서버리스 함수(serverless function)는 기본적으로 무상태(stateless)입니다. [백엔드 마이그레이션](#백엔드-마이그레이션)에서 언급했듯이 기존의 백엔드에서는 [lowdb](https://github.com/typicode/lowdb)를 사용하였는데, 이는 로컬 JSON 데이터베이스이므로 유상태(stateful)입니다. 결과적으로 Vercel의 무서버 함수를 사용하려면 DB 마이그레이션이 필요하게 되었습니다.

DB는 [Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/)를 사용했습니다. Google Sheets를 DB로 사용하려면, [몇 가지 설정](https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/)이 필요하고 [Google Sheets API](https://developers.google.com/sheets/api/reference/rest?hl=ko)를 사용해야 합니다. Google Sheets는 기본적으로 스프레드시트 프로그램이기 때문에 DB로 사용하기에는 속도가 느리고 제한도 있습니다. 하지만 다음과 같은 이유로 Google Sheets를 사용하게 되었습니다.

- 무료 (가장 중요!)
- DB 수에 제한이 없음 (일부 무료 클라우드 DB에는 개수 제한이 있음)
- 현재 프로젝트에서는 Google Sheets의 단점이 큰 문제가 안 됨

참고로 Google Sheets API의 래퍼 역할을 하는 [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet)를 사용할 수 있습니다.

### 기존 타입 확장하여 사용하기

[Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/) 사용을 쉽게 만들어 주는 [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet) 패키지는 행의 모든 프로퍼티의 타입이 `any`라는 한계가 있습니다. 행을 불러올 때마다 `as` 단언을 하는 것이 번거로웠습니다. 기존 클래스 타입의 일부를 확장하고 제네릭을 추가하여, 이 한계를 조금이나마 해소하고자 했습니다.

예를 들어 기존 `GoogleSpreadsheetRow` 클래스 타입은 다음과 같습니다.

```ts
class GoogleSpreadsheetRow {
	/**
     * @description
     * This represents the properties that get loaded using the header row
     */
    [x: string]: any;
    
    ...
}
```

이를 확장하여 다음과 같이 제네릭으로 프로퍼티를 지정하게 만듭니다.

```ts
type MyRow<T extends DBIndexSignature> = {
  [Property in keyof T]: T[Property];
} & GoogleSpreadsheetRow;
```

`MyRow`의 프로퍼티는 이제 타입에 안전합니다.

`MyRow`를 이용하여 다음과 같이 `UserRow` 타입을 만들 수 있습니다.

```ts
interface UserDB {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

type UserRow = MyRow<UserDB>;
```

`UserRow`에서는 `id`, `email` 프로퍼티에 안전하게 접근할 수 있습니다.

`GoogleSpreadsheetWorksheet`의 일부 메서드도 `MyRow`와 호환되도록 오버라이드(override, 재정의)했습니다.

```ts
class MyWorkSheet<db> extends GoogleSpreadsheetWorksheet {
  async getRows(options?: PaginationOptions): Promise<MyRow<db>[]> {
    return (await super.getRows(options)) as MyRow<db>[];
  }

  ...
}
```

관련 문제는 다음과 같습니다.

- [[리팩터링] 구글 시트 클래스 확장](https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1/issues/27)

### `controllerSwitch` 유틸

기존 [Next.js](https://nextjs.org/)의 일반적인 [API 라우팅](https://nextjs.org/docs/api-routes/introduction) 페이지는 다음과 같습니다.

```ts
// pages/api/todos.ts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch(req.method) {
    case 'GET':
      const todos = await getTodos();
      res.status(200).json(todos);
      break;
        
    case 'POST':
      const newTodo = await createTodo(req.body);
      res.status(200).json(todos);
      break;
        
    default:
      res.status(405).end();
      break;
  }
}
```

API 페이지의 수가 많아지면 `switch`문을 반복적으로 작성하는 것이 불편해집니다.

이를 해결하기 위해 `controllerSwitch`라는 유틸 함수를 만들었습니다.

```ts
type ControllerSwitch = (
  req: NextApiRequest,
  res: NextApiResponse,
  controllerByMethod: ControllerByMethod
) => Promise<void>;

interface ControllerByMethod {
  POSTController?: Controller;
  GETController?: Controller;
  PUTController?: Controller;
  DELETEController?: Controller;
}

const controllerSwitch: ControllerSwitch = async (
  req,
  res,
  controllerByMethod
) => {
  const { POSTController, GETController, PUTController, DELETEController } =
    controllerByMethod;

  switch (req.method) {
    case 'POST':
      if (!POSTController) {
        res.status(405).end();
        break;
      }
      await POSTController(req, res);
      break;

    case 'GET':
      if (!GETController) {
        res.status(405).end();
        break;
      }
      await GETController(req, res);
      break;

    case 'PUT':
      if (!PUTController) {
        res.status(405).end();
        break;
      }
      await PUTController(req, res);
      break;

    case 'DELETE':
      if (!DELETEController) {
        res.status(405).end();
        break;
      }
      await DELETEController(req, res);
      break;

    default:
      res.status(405).end();
      break;
  }
};
```

`controllerSwitch`를 이용하면 API 페이지를 다음과 같이 간결하게 작성할 수 있습니다.

```ts
// pages/api/todos.ts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, {
    POSTController: createTodo,
    GETController: getTodos,
  });
}
```

유틸에서 오류를 잡는 논리도 구현했습니다.

```ts
function handleErrorDecorator(
  controllerSwitch: ControllerSwitch
): ControllerSwitch {
  return async (req, res, controllerByMethod) => {
    try {
      await controllerSwitch(req, res, controllerByMethod);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 429) {
        res.status(429).json({
          message: '너무 많은 요청이 발생했습니다. 1분 후에 다시 시도해주세요.',
        });

        return;
      }

      console.error(err);
      res.status(500).json({ message: '서버에 오류가 발생했습니다.' });
    }
  };
}

const decoratedControllerSwitch = handleErrorDecorator(controllerSwitch);
```

이제 `decoratedControllerSwitch`는 Axios의 `429` 응답 코드를 비롯한 오류를 가공해서 다시 응답으로 보냅니다.

#### 추가 개선

API 페이지에서 `req`, `res`가 중복되는 것을 없애기 위해 유틸 함수를 추가적으로 개선했습니다.

개선된 유틸 함수는 다음과 같습니다.

```ts
interface ControllerByMethod {
  POSTController?: Controller;
  GETController?: Controller;
  PUTController?: Controller;
  DELETEController?: Controller;
}

export function handler(controllerByMethod: ControllerByMethod) {
  const { POSTController, GETController, PUTController, DELETEController } =
    controllerByMethod;

  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      switch (req.method) {
        case 'POST':
          if (!POSTController) {
            res.status(405).end();
            break;
          }
          await POSTController(req, res);
          break;

        case 'GET':
          if (!GETController) {
            res.status(405).end();
            break;
          }
          await GETController(req, res);
          break;

        case 'PUT':
          if (!PUTController) {
            res.status(405).end();
            break;
          }
          await PUTController(req, res);
          break;

        case 'DELETE':
          if (!DELETEController) {
            res.status(405).end();
            break;
          }
          await DELETEController(req, res);
          break;

        default:
          res.status(405).end();
          break;
      }
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 429) {
        res.status(429).json({
          message: '너무 많은 요청이 발생했습니다. 1분 후에 다시 시도해주세요.',
        });

        return;
      }

      console.error(err);
      res.status(500).json({ message: '서버에 오류가 발생했습니다.' });
    }
  };
}
```

`handleErrorDecorator`의 오류 처리 논리도 이 함수에 포함되었습니다.

이제 API 페이지의 코드가 더 간단해졌습니다.

```ts
// pages/api/todos.ts

export default handler({
  PUTController: updateTodo,
  DELETEController: deleteTodo,
});
```

## 한계 및 개선 사항

- DB로 [Google Sheets](https://www.google.com/intl/ko_kr/sheets/about/)를 사용하여 속도가 느리고 확장성에 한계가 있습니다.
- 할 일 완료 기능
- 할 일 태그 기능
- 할 일 목록의 항목 드래그 앤 드롭(drag and drop) 기능
