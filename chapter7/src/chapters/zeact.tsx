// ## 7.3 React 직접 타이핑하기

// 이제 zeact.tsx에 다음과 같은 코드를 입력하여 타입을 직접 선언하고 사용해 보자.
declare namespace Zeact {
  const useState: () => void;
  const useRef: () => void;
  const useEffect: (callback: Function) => void;
  const useCallback: (callback: Function) => void;
  interface FunctionComponent<P> {}
  interface FormEvent<T> {}
  interface ChangeEvent<T> {}
  type ReactNode = unknown;
}

interface Props {
  children: Zeact.ReactNode;
  onSubmit: (e: Zeact.FormEvent<HTMLFormElement>) => void;
}

const Form: Zeact.FunctionComponent<Props> = ({children, submit} => {
  return (
    <form onSubmit={onSubmit}>{children}</form>
  )
})

const WordRelay = () => {
  const [word, setWord] = Zeact.useState('제로초')
  const [value, setValue] = Zeact.useState('')
  const [result, setResult] = Zeact.useState('')
  const inputEl = Zeact.useRef<HTMLInputElement>(null)

  Zeact.useEffect(() => {
    console.log('useEffect');
  }, []);

  const onSubmitForm = Zeact.useCallback((e: Zeact.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputEl.current;
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      if (input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        input.focus();
      }
    }
  }, [word, value]);
}

const onChange = Zeact.useCallback((e: Zeact.ChangeEvent<HTMLInputElement>) => {
  setConstantValue(e.currentTarget.value);
}, []);

return (
  <>
    <div>{word}</div>
    <Form onSubmit={onSubmitForm}>
      <input
        ref={inputEl}
        value={value}
        onChange={onChange}
      />
      <button>입력!</button>
      <div>{result}</div>
    </Form>
  </>
)
