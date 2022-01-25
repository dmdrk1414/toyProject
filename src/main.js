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

// 임시저장 장소
// typedef을 보며 임시 저장소를 만들자
// 나중에 database을 연결하자.

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @type {Post[]}
 */
const posts = [
  {
    id: "My_first_post",
    title: "My first post",
    content: "Hello!!",
  },
  {
    id: "My_second_post",
    title: "My second post",
    content: "Hello!!",
  },
];

// 요청이 오면 실행되는 콜백 함수
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/; // 정규표현식
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined; // exec함수는 일치하는 정보를 배열로

  // url 세팅을 하기
  if (req.url === "/posts" && req.method === "GET") {
    const result = posts.map((post) => ({
      id: post.id,
      title: post.title,
    }));
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } else if (postIdRegexResult) {
    // GET /posts:id
    const postId = postIdRegexResult[1]; // post의 id값을 가져온다.
    console.log(`postId:  ${postId}`);

    res.statusCode = 200;
    res.end(`Reading a post : ${postId}`);
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200;
    res.end("Creating post");
  } else {
    res.statusCode = 404; // 응답 상태값 설정
    res.end("Not found"); // 응답 데이터 전송
  }
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
