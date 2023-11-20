// 3.8

// ** reduce 만들기 **

// 먼저 reduce에 대해 생각하자.
// reduce는 콜백함수에 총 4개의 인자를 갖는다.
// 첫번째 previousValue는 이전 값을 나타낸다.
// 두번쨰 currentValue는 현재 값을 나타낸다.
// 세번째 currentIndex는 현재 값의 index값을 나타낸다.
// 네번쨰 array는 원본 배열 값을 가진다.
// reduce는 말그대로 여러 값들을 하나로 '축소' 한다. 배열을 순회하며 이전값과 현재값을 참조하여 콜백함수를 실행한다.
const myArr2: number[] = [1, 2, 3, 4, 5];

const myReduce1 = myArr2.reduce((previousValue, currentValue, currentIndex, array) => {
  return previousValue + currentValue; // 15
});

// 이제 책을 보지 않고 나만의 방식으로 reduce의 타입을 만들어 보자.
// 우선 배열 내에 들어갈 제너릭 타입 T를 선언한다. T는 현재값, 이전값, 배열 내의 값을 가리킨다.
// 다음으로 이전 값과 현재 값을 참조하여 콜백함수를 실행 한 리턴값의 타입이다. 이전 값과 현재 값의 타입이 T 였으므로 리턴값 또한 T이다.
// 마지막으로 최종적으로 리턴되는 값 역시 T이다.
interface Array<T> {
  MyReduce(callback: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
}

// 위의 예제가 거의 들어 맞았다! 하지만 reduce에서 한가지 누락 된 부분이 있다.
// reduce는 첫번째 인자로 콜백함수를, 두번째 인자로 초기값을 갖는다.
// '초기값'은 배열을 참조하기 전 최초로 참조되는 값을 일컫는다.
// 즉, 위의 myArr2에 만약 10이라는 두번째 인자('초기값')을 가진다면 결과값은 25가 된다.
// 10 + 1 -> 11 + 2 -> 13 + 3 -> 16 + 4 -> 20 + 5 -> 25 -> return

// 위의 옵션을 반영하기 위해서 오버로드를 2개로 설정한다.
interface Array<T> {
  MyReduce(callback: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  MyReduce(callback: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
}
