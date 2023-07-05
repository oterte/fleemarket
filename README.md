# FleeMarket App 만들기

1. 이전에 만들었던 NextMarket은 next.js로 처음 만들어보는 프로젝트이다 보니 만드는데 시간이 오래걸렸으나, 좋은 공부가 되었다. prisma로 db를 연결하여 데이터를 이용할 수 있었고, ssr을 통해 seo를 향상시킬 수 있었지만, div 태그로만 ui를 만들었고 semantic tag를 이용하지 않은게 약간 아쉬웠다.
그래서 이번에 만들땐 똑같이 tailwind를 이용하되, semantic 태그를 이용해서 ui를 만들어 볼 생각이다.


2. prisma 설치 및 railway를 이용하여 db 연결


3. React-hook-form을 이용하여 input 생성 -> 유효성 체크에 편리하고, 깔끔한 소스코드, 그리고 렌더링 최적화가 가능

4. next-cloudinary를 이용하여 이미지 업로드 기능 추가, 무료로 사용 가능한 클라우드 서비스