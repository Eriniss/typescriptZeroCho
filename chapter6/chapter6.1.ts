// 6.1

// ** Axios 타입 분석 **

// axios.d.ts 또는 axios/index.d.ts에서 추출한 부분
declare function axios<T = any>(config: AxiosRequestConfig): Promise<T>;

// AxiosRequestConfig의 일부
interface AxiosRequestConfig {
  method?: Method;
  url?: string;
  data?: any;
  // ... 기타 옵션들
}

type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';