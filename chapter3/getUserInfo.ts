import { User } from '../type_module';
import { SecUserInfo } from '../type_module';

// User중 이름, 주소, 휴대전화번호만 필요할 때 'Pick'
type LoginUserInfo = Pick<User, 'name' | 'address' | 'phoneNumber'>;

const loginUserInfo: LoginUserInfo = { name: 'Jeong', address: 'Ulsan', phoneNumber: 1234567890 };
console.log(loginUserInfo);

// User중 성별, 사이트만 필요하며 이를 옵셔널값으로 전환할 때 'Pick', 'Partial'
type GenderUserSiteInfo = Pick<User, Partial<'gender' | 'sites'>>;
const genderUserSiteInfo: GenderUserSiteInfo = { gender: 'male', sites: ['Naver', 'Kakao', 'Google'] };
console.log(genderUserSiteInfo);

// User중 성별을 제외한 모든 값을 옵셔널 값으로 변경하고 성별을 제너릭 타입 T로 바꿔야 할 때 'Partial', 'Omit'
type ChangeUserGenderType<T> = Partial<Omit<User, 'gender'>> & { gender: T };
const changeUserGenderType: ChangeUserGenderType<Boolean> = { gender: true };
console.log(changeUserGenderType);

// User중 성별 타입만 가져오고 male만 허용 'Extract', 'Pick'
type GenderType = Pick<User, 'gender'>; // 'male' | 'female'
type MaleOnly = Extract<GenderType, 'male'>; // 'male'
const maleOnly = { gender: 'male' } as MaleOnly;
console.log(maleOnly);

// User중 비밀정보인 SecUserInfo를 옵셔널로 추가 'Partial', '|'
type AllUserInfo = User | Partial<SecUserInfo>;
const allUserInfo: AllUserInfo = {
  name: 'Jeong',
  address: 'Ulsan',
  gender: 'male',
  phoneNumber: 1234567890,
  sites: ['Naver', 'Kakao'],
  pw: '대충 해시함수 끄적끄적',
  access: ['Admin'],
};
console.log(allUserInfo);
