윤효진 : 홈페이지 중앙 부분
이승수 : 검색 및 디테일
윤정렬 : 로그인
최재영 : 회원가입

https://koreanssan.com/

글자색 : #000000ff
강조색 : #ff0000ff
로고 : #2c2c54(네이비)

프로젝트 구조
src/
├─ app/
│  └─ store/
├─ features/
│  ├─ catalog/
│  ├─ cart/
│  ├─ order/
│  └─ auth/
├─ pages/
├─ layouts/
├─ shared/
│  ├─ ui/
│  ├─ hooks/
│  ├─ lib/
│  └─ constants/
└─ styles/
   ├─ tokens/
   ├─ base/
   ├─ layout/
   ├─ components/
   ├─ utilities/
   └─ themes/



   1. 경로는 절대경로 사용(상대경로 적용시 파일을 옮기게 되면 다 깨짐)
   2. 각자 개인적으로 다 만든 후 후에 중복 코드 조정
   