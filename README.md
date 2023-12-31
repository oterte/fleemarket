# FleeMarket App 만들기

1. 이전에 만들었던 NextMarket은 next.js로 처음 만들어보는 프로젝트이다 보니 만드는데 시간이 오래걸렸으나, 좋은 공부가 되었다. prisma로 db를 연결하여 데이터를 이용할 수 있었고, ssr을 통해 seo를 향상시킬 수 있었지만, div 태그로만 ui를 만들었고 semantic tag를 이용하지 않은게 약간 아쉬웠다.
그래서 이번에 만들땐 똑같이 tailwind를 이용하되, semantic 태그를 이용해서 ui를 만들어 볼 생각이다.


2. prisma 설치 및 railway를 이용하여 db 연결


3. React-hook-form을 이용하여 input 생성 -> 유효성 체크에 편리하고, 깔끔한 소스코드, 그리고 렌더링 최적화가 가능

4. next-cloudinary를 이용하여 이미지 업로드 기능 추가, 무료로 사용 가능한 클라우드 서비스

5. 카카오맵 api를 이용하기 위해 dynamic import 사용
    -> 모듈을 빌드 타임이 아닌 런타임에 불러오도록 한다. 번들 파일을 분리하고 퍼포먼스 향상 기대
    -> 초기 로딩 시 사이즈가 크거나 초기 로딩부터 사용하지 않는 부분, 또한 런타임에만 알 수 있는 정보에 기반해서 모듈을 가져와야 할 때 사용


6. 페이지 로딩 시, 더 나은 UX를 위해 Loader 컴포넌트를 생성, 로딩 중 Loader 컴포넌트 보여주기

7. 채팅 기능 구현을 위해 무엇을 사용할까? -> http polling 사용
    기타 다른 방법들 비교
        - Rest API VS Websocket
        - Rest -> A의 브라우저에서 Rest 요청을 보내면 B 브라우저에서 받은다음 그걸 보려면, 한번 더 요청을 가져와서 봐야한다
        -> 페이지를 새로고침 하면서 다시 요청을 보내고 A가 요청을 보냈는지 확인 후 볼 수 있음.
        -> Rest는 단방향 통신이다. 어떤 DB에서 데이터를 가져오려면 서버에 요청을 보내서 그 응답을 받아야 한다.
        - Websocket ->A 브라우저에서 요청을 보내면 B 브라우저에선 새로고침 하지 않고 실시간으로 메시지를 받아 볼 수 있음.
        -> Websocket은 양방향 통신. A가 서버에 요청을 보내면 서버는 B에게 A가 요청을 보냈다고 알려줄 수 있음.

        -> 내가 사용하려는 polling은?
        -> Polling -> 클라이언트가 일정한 간격으로 서버에 요청을 보내서 결과를 전달받는 방식. 즉 단방향이다.
        -> 구현은 쉽지만, 서버의 상태가 변하지 않았을 때에도 계속 요청을 보내야 하기에 필요없는 요청이 많아지며 요청 간격을 정하기도 쉽지 않음
        -> 폴링의 주기가 짧으면 서버에 부담이, 길면 실시간성이 좋지않음
        -> 서버에서 바뀐 데이터가 없어도 계속 요청을 해야하고 결과를 줘야 함
        -> 이러한 문제점을 해결하기 위해 Long Polling 등장
        -> 롱 폴링도 폴링처럼 계속 요청을 보낸다.
        -> 차이점은 일반 폴링은 주기적으로 요청을 보낸다면 롱 폴링은 요청을 보내면 서버가 대기하고 있다가 이벤트가 발생했거나 타임아웃이 발생할 때까지 기다린 후 응답을 주게 된다.
        -> 이렇게 클라이언트는 응답을 받자마자 다시 요청을 보내게 된다.
        -> 서버의 상태 변화가 많이 없다면 폴링 방식보다 서버의 부담이 줄어들게 됨
        -> 이러한 특징으로 롱 폴링은 실시간 메시지 전달이 중요하지만, 서버의 상태 변화가 자주 발생하지 않는 서비스에 적합
        -> 폴링과 롱 폴링의 공통점은 결국 HTTP 프로토콜을 이용하며 이 HTTP 요청과 응답에 Header가 같이 전달되는데 이 헤더에 많은 데이터가 들어있어서 너무 많은 요청과 응답의 교환은 부담을 주게 된다.


        HTTP 통신 방법과 Websocket의 차이점
        1. Websocket은 처음에 접속 확립(Handshake)를 위해서만 HTTP 프로토콜을 이용하고 그 이후부터는 독립적인 프로토콜 ws를 사용하게 된다.
        2. HTTP 요청은 응답이 온 후 연결이 끊기게 되지만, Websockey은 핸드쉐이크가 완료되고 임의로 연결을 끊기 전까진 계속 연결되어 있다.




8. 채팅 데이터 생성
    1. client 요청 -> useEffect로 변경이 일어날 때마다 axios 요청 보내기
    2. route에서 요청 처리 -> 모든 유저를 가져오고 include해서 해당 유저의 conversation의 데이터를 배열안에 다 나열
    -> 그리고 그 conversation 안에서 include해서 모든 message들을 배열안에 넣어주고 user 데이터도 넣어줌


9. SWR 적용
    1. SWR이란?
        - 데이터를 가져오기 위한 React Hook 라이브러리. 
        - SWR은 원격 데이터를 가져올 때 캐싱된 데이터가 있으면 그 데이터를 먼저 반환(stale)한 다음 가져오기 요청을 보내고 마지막으로 최신 데이터와 함께 제공하는 라이브러리.
        - useSWR을 이용하여 캐싱한다. 이 훅은 인자로 key와 fetcher가 있다.
        -> 첫번째 인자인 key에는 api url이면서 캐싱할 때 사용되는 key다. key 값을 캐싱하는 것
        - 채팅 데이터를 가져오기 위해 SWR을 사용할것


10. useSWRMutation 사용 -> 원격 데이터를 업데이트 해주고 캐시데이터도 업데이트 해주기 위해서 