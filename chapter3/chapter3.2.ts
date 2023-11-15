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
type MyExtract<T, U> = T extends U ? T : never;
type Result6 = MyExtract<1 | '2' | 3, string>;

type FirstName = 'Kim' | 'Lee' | 'Jeong';
type ExtractedFirstName = Extract<FirstName, 'Kim' | 'Jeong'>;

const MyFirstName: ExtractedFirstName = 'Jeong';
// const MyFirstName: ExtractedFirstName = 'Lee'; 로 설정할 경우 'Lee'를 추출하지 않았기 때문에 에러 발생

// ** Omit **
