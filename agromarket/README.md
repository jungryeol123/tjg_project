윤효진 : 홈페이지 중앙 부분
이승수 : 검색 및 디테일
윤정렬 : 로그인
최재영 : 회원가입

https://koreanssan.com/

글자색 : #000000ff
강조색 : #ff0000ff
로고 : #4949b1ff(네이비)

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

구조 참고용 사이트 : https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md

커밋 메세지 참고용 사이트 : https://velog.io/@archivvonjang/Git-Commit-Message-Convention

커밋 메세지 상세버전 참고용 사이트 : https://www.conventionalcommits.org/en/v1.0.0-beta.4

   1. 경로는 절대경로 사용(상대경로 적용시 파일을 옮기게 되면 다 깨짐)
   2. 각자 개인적으로 다 만든 후 후에 중복 코드 조정
   3. 백엔드는 인터페이스, 클래스로 꼭 나눌것
   




   리덕스 구조

   - 메인페이지는 처음페이지를 백엔드를통해 데이터베이스에서 불러온 후 리덕스에 스토어에 아이템들 저장

   - 현재 리덕스에 저장된 아이템에 PID로 백엔드로 데이터베이스에서 필요한 데이터 요청

   -디테일 페이지는 장바구니 버튼 클릭시 리덕스에 총수량 +1을 시키고 백엔드에 데이터베이스에 아이템 저장 OR 아이템 수량 업데이트(서비스 파트에서 조건절로 추가 예정)

   - 카트페이지는 백엔드로 데이터베이스에서 불러온 후 리덕스에 저장

   - 카트페이지에서 수량 +, - 클릭시 일단 그에 맞게 리덕스에서 해당 아이템 수량 변경 및 총 수량 변경  
   만약 백엔드에 데이터베이스로 수량 변경 성공하면 그대로 진행, 실패시 롤백으로 취소