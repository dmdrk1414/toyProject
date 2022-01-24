```
// @ts-check

/* eslint-disable no-new */
/* eslint-disable no-console */

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 환용할 예정 (JSON)
 * - 인증 로직은 넣지 않는다. (유저에 의심하지 않는다)
 * - RESTful API을 사용한다. test와 사람이 보기 편하다hh
 */

const http = require("http"); // 노드 모듈을 가져온다

const PORT = 4000; // 사용할 서버 포트

function sleep(duration, callback) {
  setInterval(() => {
    callback();
  }, duration);
}

/**
 * Post = 글쓰기
 * GET /posts = 전체 글을 보는법
 * GET /posts:id = 특정 글을 보는법 (해당 id)
 * POST /posts = 글을 올리기
 */

// 요청이 오면 실행되는 콜백 함수
const server = http.createServer((req, res) => {
  // url 세팅을 하기
  if (req.url === "/posts" && req.method === "GET") {
    res.statusCode = 200;
    res.end("List of posts");
  } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) {
    res.statusCode = 200;
    res.end("Some content of the post");
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200;
    res.end("Creating post");
  } else {
    res.statusCode = 404; // 응답 상태값 설정
    res.end("Not found"); // 응답 데이터 전송
  }
  console.log(req.url);
});

// 서버를 요청 대기 상태로 만든다
try {
  server.listen(PORT, () => {
    // 요청 대기가 완료되면 실행되는 콜백 함수
    // 터미널에 로그를 기록한다
    console.log(`The server is listening at port: ${PORT}`);
  });
} catch (error) {
  sleep(
    500,
    server.listen(PORT, () => {
      // 요청 대기가 완료되면 실행되는 콜백 함수
      // 터미널에 로그를 기록한다
      console.log(`The server is listening at port: ${PORT}`);
    })
  );
}


```

정규표현식.test()는 정규표현식이 단순하게 맞냐 아니냐을 판단

정규표현식.exec()는 정규표현식이 정확하게 맞냐 아니냐을 판단

원하는 부분을 사용하기 위한 캡쳐그룹 정규표현식

```
const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined;

  // url 세팅을 하기
  if (req.url === "/posts" && req.method === "GET") {
    res.statusCode = 200;
    res.end("List of posts");
  } else if (postIdRegexResult) {
    // GET /posts:id
    const postId = postIdRegexResult[1];
    console.log(`postId:  ${postId}`);

    res.statusCode = 200;
    res.end("sdf");
  }
```

post id 가져오는법
