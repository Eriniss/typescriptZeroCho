// chapter3 lib.es5.d.ts 분석하기

// 타입이 모여있는 lib.es5.d.ts 파일 분석

// ** Partial **
// 기존 객체의 속성을 모두 옵셔널로 만드는 함수
type MyPartial<T> = {
  [P in keyof T]?: T[P];
}

type Result1 = MyPartial<{ a: string, b: number }>;

// ex)
// partialUser1은 옵셔널 값을 가진다.
type User1 = { // 우선 필수값으로 설정
  name: string;
  age: number;
}

type PartialUser1 = Partial<User1>; // Partial을 사용하여 필수값을 옵셔널 타입으로 설정
const partialUser1: PartialUser1 = {}; // 값이 비어있어도 필수값이 아니기 때문에 생략 가능

// ======================================

// ** Required **
// 모든 속성이 옵셔널이 아닌 값을 가진다.
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
}

type Result2 = MyRequired<{ a?: string, b?: number }>;

// ex)
// Result2는 옵셔널 값을 설정했음에도 Required에 의해 옵셔널이 제거되어 필수 지정값이 된다.
type User2 = { // 우선 옵셔널 타입으로 설정
  name?: string;
  age: number;
}

type RequiredUser = Required<User2>;
const requiredUser: RequiredUser = { name: 'Hellow', age: 26 }; // 값이 필수값으로 지정되었기 때문에 name과 age는 필수로 입력

// ======================================

// ** Readonly **
// 타입의 모든 속성 값을 읽기 전용으로 만든다.
// 반대로, -Readonly시 읽기 전용이 아니게 된다.
type User3 = {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User3>;
const readonlyUser: ReadonlyUser = { name: 'Jeong', age: 23}; // 읽기 전용이 된다. 편집 불가!

// ======================================

// ** Pcik **
// 기존 유형에서 특정 속성(키)를 선택하여 새 유형을 생성
// 기존 유형의 하위 집합을 만들 때 유용
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type Result3 = MyPick<{ a: string, b: number, c: number}, 'a' | 'c'>;

// User4는 CustomizedUser4Form에 비해 좀 더 넓은 타입 값을 설정하고 있는 상위 유형이다.
type User4 = {
  name: string;
  age: number;
  address: string;
  gender: boolean;
}

// CustomizedUser4Form은 User4에 종속성을 가지며 더 좁은 범위를 가진 하위 유형이다.
type CustomizedUser4Form = Pick<User4, 'name' | 'age'>;

const user4: CustomizedUser4Form = {
  name: 'Jeong',
  age: 27,
}

// ======================================

// ** Record **
// 모든 속성을 동일하게 설정한다.
type MyRecord<K extends keyof any, T> = {
  [P in K]: K;
}

type Result4 = MyRecord<'a' | 'b', string>;

// 딕셔너리 예시
type FruitCount = Record<string, number>;

const fruitInventory: FruitCount = {
  'apple': 10,
  'banana': 2,
  'blueberry': 20,
}

// HTTP 딕셔너리 예시
type DefualtConfig = Record<'API_URL' | 'DEBUG_MODE' | 'LOG_LEVEL', string | boolean>;

const defaultWebConfig: DefualtConfig = {
  API_URL: 'https://123.45.67.89', // string | boolean 할당
  DEBUG_MODE: false, // string | boolean 할당
  LOG_LEVEL: 'info', // string | boolean 할당
}
