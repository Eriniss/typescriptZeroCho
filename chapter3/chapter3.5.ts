// 3.5

// ** forEach 직접 만들기 **

// forEach는 총 1개의 콜백함수를 인자를 가진다.
// 그리고 콜백함수는 총 3개의 인자를 가진다.
// 첫 번째 인자는 순회하는 인자값을 가진다.
// 두 번째 인자는 현재 순회중인 인자의 인덱스값 이다.
// 세 번쨰 인자는 가리키는 배열값을 가진다.

const myArray: Array<number> = [1, 2, 3];

// 1. 먼저 callback 함수를 인자로 두어 '1-2개의 인수가 필요한데 0개를 가져왔습니다.' 에러를 해결한다.
myArray.myForEach(() => {});

// 2. 각각의 인수에 알맞은 타입을 할당한다. a는 순회하는 인자를, b는 순회하는 인자의 index 값을, 그리고 c는 가리키는 배열 값을 가진다.
interface Array<T> {
  myForEach2(callback: (a: number, b: number, c: []) => void): void;
}

// 3. a는 숫자값 뿐만 아니라 다른 여러 값들을 가질 수 있기에 제너릭 타입인 T로 변경한다.
// 4. c는 배열 내에 다양한 값들을 가질 수 있기에 제너릭 타입인 T를 붙여 T[]로 표현한다.
interface Array<T> {
  myForEach(callback: (a: T, b: number, c: T[]) => void, thisArg?: any): void;
}

myArray.myForEach((a, b, c) => console.log(a, b, c));

const myArr: string[] = ['Kim', 'Jeong'];

myArr.forEach((value: string, index: number, array: string[]): void =>
  console.log(`${value}는 ${array}의 [${index}]번 째 인덱스 입니다.`)
);
