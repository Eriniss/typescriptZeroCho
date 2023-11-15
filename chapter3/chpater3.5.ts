// 3.5

// ** forEach 직접 만들기 **

// forEach는 총 1개의 콜백함수를 인자를 가진다.
// 그리고 콜백함수는 총 3개의 인자를 가진다.
// 첫 번째 인자는 순회하는 인자를 가리킨다.
// 두 번째 인자는 현재 순회중인 인자의 인덱스값 이다.
// 세 번쨰 인자는 배열 자체를 나타낸다.

const myArray: Array<number> = [1, 2, 3];
myArray.myForEach(() => {});

interface Array<T> {
  myForEach(callback: (a: T, b: number, c: T[]) => void, thisArg?: any): void;
}

myArray.myForEach((a, b, c) => console.log(a, b, c));
