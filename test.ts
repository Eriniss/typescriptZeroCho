import { Foo, Bar } from './type_module';

type MyPick = Pick<Foo, 'a' | 'b'>;

const myPick: MyPick = { a: 123, b: 313 };
console.log(myPick);
