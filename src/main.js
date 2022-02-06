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
const { type } = require("os");
const { routes } = require("./api");

const PORT = 4000; // 사용할 서버 포트

// 요청이 오면 실행되는 콜백 함수
const server = http.createServer((req, res) => {
  async function main() {
    // route에서 조건에 맞는 배열의 값을 가져온다.
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    );

    // 조건에 맞는 라우터가 없으면? Not found 표시를 줘라.
    if (!req.url || !route) {
      res.statusCode = 404;
      res.end("Not found.!!");
      return;
    }

    // routs 에 서 url 을 받을수있는방법은 이것이다 url을 가져와서 넘기는 방법
    const regexResult = route.url.exec(req.url);

    if (!regexResult) {
      res.statusCode = 404;
      res.end("Not found.");
      return;
    }

    const result = await route.callback(regexResult);

    res.statusCode = result.statusCode;

    // body에 던지는 코드  만약 body가 string이면 Object이면
    // body는 string만 가능하니 만약 object가 올시
    if (typeof result.body === "string") {
      res.end(result.body);
    } else {
      res.setHeader("content-Type", "applecation/json;charset=utf-8");
      res.end(JSON.stringify(result.body));
    }
  }

  main();
});

// 서버를 요청 대기 상태로 만든다
server.listen(PORT, () => {
  // 요청 대기가 완료되면 실행96되는 콜백 함수
  // 터미널에 로그를 기록한다
  console.log(`The server is listening at port: ${PORT}`);
});
