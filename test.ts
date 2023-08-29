type Foo = {
  x: number;
  y: number;
}

const foo = ({x, y}: Foo):number => {
  return x + y;
}

console.log(foo({ x: 3, y: 7 }));
