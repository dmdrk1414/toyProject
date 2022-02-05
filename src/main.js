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
const { routes } = require("./api");

const PORT = 4000; // 사용할 서버 포트

/**
 * @typedef testType
 * @property {RegExp} one
 * @property {"GET" | "POST"} two
 */

/** @type {testType[]} */
const testBody = [
  {
    one: /test/,
    two: "GET",
  },
];

// 요청이 오면 실행되는 콜백 함수
const server = http.createServer((req, res) => {
  routes.forEach((e) => {
    testBody.push({
      one: e.url,
      two: e.method,
    });
  });

  console.log(testBody);
  res.statusCode = 200;
  res.end("test end");
});

// 서버를 요청 대기 상태로 만든다
server.listen(PORT, () => {
  // 요청 대기가 완료되면 실행96되는 콜백 함수
  // 터미널에 로그를 기록한다
  console.log(`The server is listening at port: ${PORT}`);
});
