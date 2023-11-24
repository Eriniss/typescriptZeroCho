// 6.1

// ** Axios 타입 분석 **

// axios.d.ts 또는 axios/index.d.ts에서 추출한 부분
declare function zaxios<T = any>(config: AxiosRequestConfig): Promise<T>;

// AxiosRequestConfig의 일부
interface AxiosRequestConfig {
  method?: Method;
  url?: string;
  data?: any;
  // ... 기타 옵션들
}

type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';

// ------------------------------

// axios의 AxiosResponse 타입 예시
import axios, { AxiosResponse, AxiosError } from 'axios';
import https from 'https';

const apiUrl = 'https://nxtcorp.enbrixcloud.com:8000/sites/all';

const agent = new https.Agent({  
  rejectUnauthorized: false  // 이 옵션을 통해 SSL 인증서 검증을 무시합니다. 보안상 주의가 필요합니다.
});

type FirstSite = {
  _id: string; // 먼저, _id값은 숫자이다.
  site_name: string;
  create_user: string;
  permission: string[];
}

axios.get<FirstSite[]>(apiUrl, { httpsAgent: agent })
  .then((res: AxiosResponse<FirstSite[]>) => {
    if (res.status >= 200 && res.status < 300) {
      const firstSite: FirstSite = res.data[0]; // 먼저 
      console.log('Enbrix firstSite:', firstSite);
    } else {
      throw new Error(`Error: ${res.status}`)
    }
  })
  .catch((error: Error) => {
    // 오류 처리
    console.error('Error:', error.message);
  });
