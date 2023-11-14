// 3.2

// ** Exclude **
type MyExclude<T, U> = T extends U ? never : T;
type Result5 = MyExclude<1 | '2' | 3, string>;

// 두번째 인자에 포함된 값을 제외한 새로운 타입 생성
type Info = 'name' | 'address' | 'phoneNumber'; // 선언된 타입
type ExcludedInfo = Exclude<Info, 'address'>; // 새로 생성된 타입

const user5: ExcludedInfo = 'name';

// ** Extract **
type MyExtract<T, U> = T extends U ? T : never;
type Result6 = MyExtract<1 | '2' | 3, string>;

type FirstName = 'Kim' | 'Lee' | 'Jeong';
type ExtractedFirstName = Extract<FirstName, 'Kim' | 'Jeong'>;

const MyFirstName: ExtractedFirstName = 'Jeong';
