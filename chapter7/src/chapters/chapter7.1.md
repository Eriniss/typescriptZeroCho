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
다음은 index.d.ts에 정의된 useRef의 타입과 예시코드이다.

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
하지만, 이 의미는 값 자체를 변경할 수 없다는 의미는 아니다. 즉, 값을 변경할 때의 오버로딩(current)을 가지며 값을 변경하지 않을때(readonly)의 오버로딩도 가진다.
current는 readonly의 값도 가지므로 좀 더 유연한 타입을 가진다.

```ts
const inputEl = useRef();

<input
  ref={inputEl} // null값을 인수로 제공하지 않으면 에러가 발생한다
/>;
```

만약 위처럼 inputEl의 default값에 null값을 넣지 않으면 위의 MutableRefObject와 RefObject 타입에서 에러가 발생한다.
초기 인수를 지정하지 않으면 자동으로 undefined가 할당된다. 즉, 3번쨰 오버로딩인 function useRef<T = undefined>(): MutableRefObject<T | undefined>; 가 타입으로 지정된다.

쉽게 재설명 하자면 다음과 같다.

- 첫 번째 오버로딩: MutableRefObject<T>를 반환하며, 초기값으로 어떤 값이든 허용합니다.
- 두 번째 오버로딩: RefObject<T>를 반환하며, 초기값으로 T 또는 null을 허용합니다.
- 세 번째 오버로딩: MutableRefObject<T | undefined>를 반환하며, 초기값이 주어지지 않으면 undefined로 추론됩니다.

위의 타입들은 '좀 더 유연한 타입'의 순서대로 되어있다. 즉, 첫번째 오버로딩은 두번째 오버로딩의 필요조건이고, 두번째 오버로딩은 세번째 오버로딩의 필요조건이다.

### 7.1.3 useEffet

먼저 useEffect의 index.d.ts의 1117줄에 정의되어있는 useEffect의 기본 타입에 대해 알아보자.

```ts
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
```

위의 타입에서 두번째 인자 deps는 옵셔널로 설정하였다. 실제로 useEffect의 두번째 매개변수를 사용하지 않는 useEffect 용법이 있다.
이제 EffectCallback의 타입을 Go to Definition 해보자.

```ts
type EffectCallback = () => void | Destructor;
```

위의 타입에서 void 혹은 Destructor를 반환하는 함수인것을 확인할 수 있다.
한번 더 Destructor를 Go to Definition 해보자.

```ts
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
```

void 또는 [UNDEFINED_VOID_ONLY]: never를 반환하게 강제로 타입이 지정되어 있다.
여기서 UNDEFINED_VOID_ONLY는 symbol값이다.
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };가 아닌 type Destructor = () => void | undefined;를 사용 할 경우 발생하는 예기치못한 에러 케이스는 아래와 같다.

```ts
useEffect(() => {
  return undefined; // Error가 발생하지 않는다.
}, [dependencies]);
```

위의 케이스에서 type Destructor = () => void | undefined;로 타입을 지정하게 되면 에러가 발생하지 않는다.
하지만, useEffect는 최종적으로 undefined를 반환하게 된다. 무조건적으로 void를 반환해야 하는 useEffect에 예기치 않은 에러가 발생했다!
이러한 에러 케이스를 막고자 'UNDEFINED_VOID_ONLY' 라는 새로운 symbol값을 도입하여 type에 지정하였다. undefined가 리턴될 경우 이를 void로 강제적으로 바꿔준다.
