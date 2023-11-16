// 3.7

// ** filter 만들기 **

// 책 보기 전 한번 직접 만들어 보기

// 요점 생각 하기
// filter 메서드는 map과 같이 콜백 함수를 인자로 받으며 콜백함수 내의 3개 인자는 forEach, map과 동일하다.
// 또한 filter는 map과 같이 '반환값'이 있지만 한가지 큰 차이점이 있다.
// 바로, 각 배열을 순회하며 boolean값을 반환하고, boolean값이 'true'일 경우의 value값들을 push하여 최종적으로 array값을 반환한다.
interface Array<T> {
  myFilter(callback: (value: T, index: number, array: T[]) => boolean): void;
}

// 위는 내가 직접 생각하여 작성한 filter메서드 이다.
// 요점에 '반환값'이 있다고 서술하였지만 실수로 myFilter의 최종 return 값을 void로 설정했다.
// 최종 '반환값' 또한 value의 제너릭 타입에서 벗어나지 않으므로 T[]를 설정하면 된다.
// 이를 고치면 최종적으로 lib.es5.d.ts와 비슷한 문법이 만들어 진다.
interface Array<T> {
  myFilter(callback: (value: T, index: number, array: T[]) => boolean): T[];
}

// lib.es5.d.ts에 기재되어있는 filter의 type
interface Array<T> {
  myFilter(
    callback: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): T[];
}
