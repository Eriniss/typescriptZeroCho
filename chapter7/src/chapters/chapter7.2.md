## 7.2 JSX 타입 이해하기

### HTMLFormElement

먼저 form 태그 위 마우서 커서를 놓고 Go to Defination 한다.

```ts
declare global {
    /**
     * @deprecated Use `React.JSX` instead of the global `JSX` namespace.
     */
    namespace JSX {
        // We don't just alias React.ElementType because React.ElementType
        // historically does more than we need it to.
        // E.g. it also contains .propTypes and so TS also verifies the declared
        // props type does match the declared .propTypes.
        // But if libraries declared their .propTypes but not props type,
        // or they mismatch, you won't be able to use the class component
        // as a JSX.ElementType.
        // We could fix this everywhere but we're ultimately not interested in
        // .propTypes assignability so we might as well drop it entirely here to
        //  reduce the work of the type-checker.
        // TODO: Check impact of making React.ElementType<P = any> = React.JSXElementConstructor<P>
        type ElementType = string | React.JSXElementConstructor<any>;
        interface Element extends React.ReactElement<any, any> {}
        interface ElementClass extends React.Component<any> {
            render(): React.ReactNode;
        }
        interface ElementAttributesProperty {
            props: {};
        }
        interface ElementChildrenAttribute {
            children: {};
        }

        // We can't recurse forever because `type` can't be self-referential;
        // let's assume it's reasonable to do a single React.lazy() around a single React.memo() / vice-versa
        type LibraryManagedAttributes<C, P> = C extends
            React.MemoExoticComponent<infer T> | React.LazyExoticComponent<infer T>
            ? T extends React.MemoExoticComponent<infer U> | React.LazyExoticComponent<infer U>
                ? ReactManagedAttributes<U, P>
            : ReactManagedAttributes<T, P>
            : ReactManagedAttributes<C, P>;

        interface IntrinsicAttributes extends React.Attributes {}
        interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}

        interface IntrinsicElements {
            // HTML
            a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
            abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            area: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
            article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            audio: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
            b: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

            ... 이하 중략
```

```tsx
interface ClassAttributes<T> {
  key?: Key;
}
```

declare global을 사용한 선언 방식은 전역 타입을 만드는 선언 방식이다.
DetailedHTMLProps 타입에 JSX의 모든 타입 속성(h1, input, html 등)을 상속하고 있다.
이를 go to definition 하면 아래와 같다.

```tsx
declare namespace React {
    type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;
    ... 이하 중략
```

JSX는 크게 '함수 컴포넌트'와 '클래스 컴포넌트' 두가지의 형태로 나뉜다.
이름에서 유추할 수 있듯 HTMLAttributes는 주로 함수 컴포넌트에서 사용되는 타입이며 ClassAttributes는 클래스 컴포넌트에서 사용된다.
ClassAttributes는 주로 React 클래스 컴포넌트의 특별한 속성을 포함한다.
예를 들어, key 속성은 React의 리렌더링 알고리즘에서 사용되는 고유의 키이다.
