// 3.10

// ** Promise/await 분석 **

// Promise는 런타입에 '시간'에 대한 개념을 추가한 것이다.
// 아래는 예시 코드이다.
// 먼저 함수를 실행하기 전 console.log('Async function started'); 을 실행한다.
// 이후 getNumberAsaync와 getStringAsync는 '콜 스택'이라 불리는 JS 엔진의 임시 저장소에 보관된다.
// 1000ms가 지난 후 getNumberAsync가 콜 스택으로부터 호출되어 console.log('Number Result:', numberResult);가 출력된다.
// getNumberAsyn가 호출된 후 콜 스택에 대기하고 있던 getStringAsync가 2000ms 이후에 콜 스택에서 호출되어 console.log('String Result:', stringResult); 가 출력된다.
// 마지막으로 console.log('Async function completed');가 출력된다.

// 숫자를 비동기적으로 반환하는 async 함수
// 이 비동기 함수는 42를 resolve 하므로 Promise<number>을 반환한다.
async function getNumberAsync(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(42); // 비동기 작업이 완료되면 숫자 42를 resolve
    }, 1000);
  });
}

// 문자열을 비동기적으로 반환하는 async 함수
// 이 비동기 함수는 'Hello, world!'를 resolve 하므로 Promise<string>을 반환한다.
async function getStringAsync(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, World!'); // 비동기 작업이 완료되면 문자열 "Hello, World!"를 resolve
    }, 2000);
  });
}

// async/await 함수 사용 예시
async function exampleAsyncFunction(): Promise<void> {
  try {
    const numberResult: number = await getNumberAsync();
    console.log('Number Result:', numberResult);

    const stringResult: string = await getStringAsync();
    console.log('String Result:', stringResult);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// exampleAsyncFunction 호출
async function runExample() {
  console.log('Async function started');
  await exampleAsyncFunction();
  console.log('Async function completed');
}

// runExample 호출
runExample();

// 비동기 함수의 타입은 결과값을 비동기 처리된 제너릭 타입 T로 갖는다.
// 즉, Promise<T>의 값을 가진다.
