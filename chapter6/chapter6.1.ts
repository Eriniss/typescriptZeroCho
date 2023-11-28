// 6.1

// ** Axios 타입 분석 **

// axios의 AxiosResponse 타입 예시
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import https from 'https';

const apiUrl = 'https://nxtcorp.enbrixcloud.com:8000/sites/all';

const agent = new https.Agent({
  rejectUnauthorized: false, // https 무시 옵션
});

type FirstSite = {
  _id: string;
  site_name: string;
  create_user: string;
  permission: string[];
};

// AxiosRequestConfig: 요청 설정 객체
const requestConfig: AxiosRequestConfig = {
  method: 'get', // 메소드 설정
  url: apiUrl, // URL 설정
  httpsAgent: agent, // httpsAgent 옵션 추가
  // 다른 요청 설정 옵션들을 추가할 수 있음
};

axios(requestConfig)
  // AxiosResponse에서 제너릭 타입으로 FirstSite[]를 할당하였으므로
  // axios의 req는 FirstSite[]의 형식으로 반환 되어야 하며 그렇지 않을 시  에러가 발생한다.
  .then((res: AxiosResponse<FirstSite[]>) => {
    // AxiosResponse<T>: 성공적인 응답을 나타내는 객체
    if (res.status >= 200 && res.status < 300) {
      const firstSite: FirstSite = res.data[0];
      console.log('Enbrix firstSite:', firstSite);
    } else {
      throw new Error(`Error: ${res.status}`);
    }
  })
  .catch((error: AxiosError) => {
    // AxiosError: Axios 요청 중에 발생한 오류
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Status Code:', error.response.status);
    } else if (error.request) {
      console.error('No Response Received');
    } else {
      console.error('Request Error:', error.message);
    }
  });

// 이처럼 Axios는 다양한 내장 타입을 보유하고 있다.

// AxiosRequestConfig는 req 옵션을 간단하게 설정할 수 있다.

// AxiosResponse<T>는 제너릭 타입 <T>를 통해 res 의 반환값에 타입을 설정할 수 있다.
// AxiosError는 Error의 로그를 보다 정확하게 파악해주며 에러를 간단하게 비동기 처리한다.
