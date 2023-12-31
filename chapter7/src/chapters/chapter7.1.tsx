// 7.1

// 예시 코드

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

// 7.1.1 useStat

// useState의 오버로딩은 매개변수의 유무로 구분 된다
// 다음은 node_modules/@types/react/index.d.ts에 정의되어있는 useState의 type값이다.

type setStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

// 위 두개를 조합하면 다음과 같은 타입이 생성된다.
// (value: string | ((prevState: string) => string) => void)

// 종합하면 첫 번쨰 오버로딩인 setStateAction은 함수를 받아들이는 경우로
// 이전 state값을 받아 새로운 상태로 업데이트 하며 Dispatch는 이 함수를 사용하여 상태를 업데이트 하는 역할을 한다.

// 두 번째 오버로딩은 객체를 받아들이는 경우로
// 상태를 직접 업데이트 하는 값을 나타낸다.
// value의 타입 S가 기본값인 undefined로 되어 있을 경우 제너릭 타입을 사용한다.

// 7.1.2 useRef

// useRef의 오버로딩은 총 3개로 구성되어 있다.
// 다음은 index.d.ts에 정의된 useRef의 타입이다.

// function useRef<T>(initialValue: T): MutableRefObject<T>;
// function useRef<T>(initialValue: T | null): RefObject<T>;
// function useRef<T = undefined>(): MutableRefObject<T | undefined>;

export const ReactType = () => {
  const [value, setValue] = useState<string>(); // 원시 값을 직접 상태 업데이트 하므로 두 번쨰 오버로딩 사용
  const [name, setName] = useState<string>('jhs'); // 초기 문자열 jhs가 지정되어 있으므로 useState의 첫 번째 오버로딩 사용
  const address = useRef();
};
