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


// ** Readonly **
// 타입의 모든 속성 값을 읽기 전용으로 만든다.
// 반대로, -Readonly시 읽기 전용이 아니게 된다.
type User3 = {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User3>;
const readonlyUser: ReadonlyUser = { name: 'Jeong', age: 23}; // 읽기 전용이 된다. 편집 불가!


// ** Pcik **
