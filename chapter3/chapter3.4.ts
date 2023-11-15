// 3.4

// ** ThisType **

// 객체 가정
const obj: Obj = {
  data: {
    money: 0,
  },
  methods: {
    addMoney(amount: number): void {
      this.money += amount;
    },
    useMoney(amount: number): void {
      this.money = +amount;
    },
  },
};

// =======================================

// this:를 타이핑 하여 이용하여 this.를 매핑
type Data1 = {
  money: number;
};

type Methods1 = {
  addMoney(this: Data & Methods, amount: number): void;
  useMoney(this: Data & Methods, amount: number): void;
};

// =======================================

// ThisType을 이용한 객체 타입 지정
// this를 따로 사용하지 않아도 this.를 매핑
type Data = {
  money: number;
};

type Methods = {
  addMoney(amout: number): void;
  useMoney(amout: number): void;
};

type Obj = {
  data: Data;
  methods: ThisType<Data & Methods>;
};

// 두 방식중 어느 방식을 사용해도 무관
// 하지만, 확장성 & 가독성 향상을 위해 아래 방식 추천
