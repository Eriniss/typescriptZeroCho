// 3.9

// ** flat 분석하기 **
// flat은 배열 속의 배열을 평평하게(flat) 풀어주는 역할을 한다.
// flat이 받는 인자는 number type이며 number의 의미는 평평하게 만들 배열의 차원을 나타낸다.

const myArr3: number | [number, [number, number, [number, [number]], number]] =
  [1, [2, 3, [4, [5]], 6]];

const flat1 = myArr3.flat(); // [ 1, 2, 3, [ 4, [ 5 ] ], 6 ]
const flat2 = myArr3.flat(2); // [ 1, 2, 3, 4, [5], 6 ]
const flatInfinity = myArr3.flat(Infinity); // [ 1, 2, 3, 4, 5, 6 ], 차수와 상관없이 배열을 평평하게 만듬
