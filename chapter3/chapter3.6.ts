// 3.6

// ** map 직접 만들기 **

// 책을 보지 않고 혼자 생각하여 map의 타입을 한번 추론해 보기
const myArr1: number[] = [1, 2, 3];

// interface Array<T> {
//   myMap(callback: (a: T, b: number, c: T[]) => void): void;
// }

// 3.5장의 forEach와 3.6장의 map의 차이점에 대해 곰곰히 생각해 보자
// forEach와 map의 가장 큰 차이점은 '반환값'이 있다는 것
// 반환값에 제너릭 타입 R을 추가한 R[]을 반환하게 한다.
interface Array<T> {
  myMap<R>(callback: (a: T, b: number, c: T[]) => void): R[];
}

//
const myMap: string[] = myArr1.map(
  (value: number, index: number, array: number[]): string => `${value}는 [${array}]의 ${index}번 째 인덱스 입니다.`
);

console.log(myMap);
