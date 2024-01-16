## 7.1

예시 코드

```ts
import React, { useState, useCallback, useRef, useEffect } from 'react';

export const WordRelay = () => {
  const [word, setWord] = useState('jhs');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    console.log('useEffect 실행!');
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
        if (input) {
          input.focus();
        } else {
          setResult('땡');
          setValue('');
          if (input) {
            input.focus();
          }
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};
```

### 7.1.1 useStat

useState의 오버로딩은 매개변수의 유무로 구분 된다
다음은 node_modules/@types/react/index.d.ts에 정의되어있는 useState의 type값이다.

```ts
type setStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;
```

위 두개를 조합하면 다음과 같은 타입이 생성된다.

```ts
(value: string | ((prevState: string) => string) => void)
```

종합하면 첫 번쨰 오버로딩인 setStateAction은 함수를 받아들이는 경우로
이전 state값을 받아 새로운 상태로 업데이트 하며 Dispatch는 이 함수를 사용하여 상태를 업데이트 하는 역할을 한다.

두 번째 오버로딩은 객체를 받아들이는 경우로
상태를 직접 업데이트 하는 값을 나타낸다.
value의 타입 S가 기본값인 undefined로 되어 있을 경우 제너릭 타입을 사용한다.

### 7.1.2 useRef

useRef의 오버로딩은 총 3개로 구성되어 있다.
다음은 index.d.ts에 정의된 useRef의 타입이다.

```ts
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;

export const ReactType = () => {
  const [value, setValue] = useState<string>(); // 원시 값을 직접 상태 업데이트 하므로 두 번쨰 오버로딩 사용
  const [name, setName] = useState<string>('jhs'); // 초기 문자열 jhs가 지정되어 있으므로 useState의 첫 번째 오버로딩 사용
  const address = useRef();
};
```

이중 MutableRefObject와 RefObject의 차이를 파악하는게 중요해 보인다.

```ts
// index.d.ts의 936줄
interface MutableRefObject<T> {
  current: T;
}

// index.d.ts의 61줄
interface RefObject<T> {
  readonly current: T | null;
}
```

useRef는 useState와 다르게 값을 변경 시 리렌더링이 일어나지 않는다.
하지만, 이 의미는 값 자체를 변경할 수 없다는 의미는 아니다. 즉, 값을 변경할 때의 오버로딩을 가지며 값을 변경하지 않을때의 오버로딩도 가진다.
current는 readonly의 값도 가지므로 좀 더 유연한 타입을 가진다.

```ts
const inputEl = useRef();

<input
  ref={inputEl} // null값을 인수로 제공하지 않으면 에러가 발생한다
/>;
```
