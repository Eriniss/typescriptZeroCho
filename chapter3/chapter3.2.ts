// 3.2

// ** Exclude **
// 말 그대로 상위 타입에서 '제외'
type MyExclude<T, U> = T extends U ? never : T;
type Result5 = MyExclude<1 | '2' | 3, string>;

// 두번째 인자에 포함된 값을 제외한 새로운 타입 생성, '추출'의 반대 개념
type Info = 'name' | 'address' | 'phoneNumber'; // 선언된 타입
type ExcludedInfo = Exclude<Info, 'address'>; // 새로 생성된 타입

const user5: ExcludedInfo = 'name';
// const user5: ExcludedInfo = 'address'; 로 설정할 경우 'address'를 제외하였기 때문에 에러 발생

// ** Extract **
// 말 그대로 상위 타입에서 '추출'
// Pick이 딕셔너리 형태의 타입이라면 이것은 일반 형태의 타입이라고 생각하면 편함
type MyExtract<T, U> = T extends U ? T : never;
type Result6 = MyExtract<1 | '2' | 3, string>;

type FirstName = 'Kim' | 'Lee' | 'Jeong';
type ExtractedFirstName = Extract<FirstName, 'Kim' | 'Jeong'>;

const MyFirstName: ExtractedFirstName = 'Jeong';
// const MyFirstName: ExtractedFirstName = 'Lee'; 로 설정할 경우 'Lee'를 추출하지 않았기 때문에 에러 발생

// ** Omit **
// Exclude의 객체 버전. 마찬가지로 딕셔너리 상위 타입에서 '제외'
// Pick과 반대되는 행동을 한다.
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Result7 = MyOmit<{ a: '1'; b: 2; c: true }, 'a' | 'c'>; // type Result7 = { b: 2 }

type Numbers = {
  a: number;
  b: number;
  c: number;
};

type OmitedNumbers = Omit<Numbers, 'a' | 'c'>;

const myNumbers: OmitedNumbers = { b: 1311 };
// const myNumbers2: OmitedNumbers= { c: 1211 }; // 'c'는 Omit에 의해 '제외' 되었기 떄문에 에러 발생

// Pick과의 비교
type PickedNumbers = Pick<Numbers, 'c'>;

const myNumbers2: PickedNumbers = { c: 1331 };
// const myNumbers2: PickedNumbers = { a: 1222, b: 13333 }; // 에러 발생!

// ** MyNonNullable **
// 타입에서 모든 undefined와 null을 제거
// T가 string | number | undefined | null 일시 string | number로 변경
type MyNonNullable<T> = T & {};

type PermitNull = {
  a: string | undefined;
  b: number | null;
};

type NonPermitNull = NonNullable<PermitNull>;

const permitNull: PermitNull = { a: undefined, b: null }; // 에러 x
// const nonPermitNull: NonPermitNull = { a: undefined, b: null } NonPermitNull을 통해 undefined와 null을 허용하지 않으므로 에러!
