export type Foo = {
  a: number;
  b: number;
  c: number | string;
};

export type Bar = {
  a?: number;
  b?: number;
  c?: number | boolean;
};

export type User = {
  name: string;
  address: string;
  gender: 'male' | 'female';
  phoneNumber: number;
  sites: string[];
};

export type SecUserInfo = {
  pw: string;
  access: string[];
};
