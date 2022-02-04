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
 *
 * 영구적인 파일을 저장하는 파일시스템
 *
 * post을 지우기
 * user에 입장에서 업데이트
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
    // 전체의 글을 보여주는 /posts
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    };

    // json 타입이라고 정보를 알려준다.               utf-8으로 에로상황을 위해 적어주는 것도 좋다.
    res.setHeader("Content-Type", "application/json; encoding=utf-8");

    res.statusCode = 200;
    // JSON을 돌려준다. http responser로서 돌려준다.
    res.end(JSON.stringify(result));
  } else if (postIdRegexResult && req.method === "GET") {
    // GET /posts:id
    const postId = postIdRegexResult[1]; // post의 id값을 가져온다.
    const post = posts.find((_post) => _post.id === postId); // posts의 배열에서 postId와 비슷한것을 가져온다

    if (post) {
      res.setHeader("Content-Type", "application/json; encoding=utf-8");
      res.statusCode = 200;

      // html의 body로 넘어가는 건 string이다.
      res.end(JSON.stringify(post));
    } else {
      res.statusCode = 404;
      res.end(`Post not found.`);
    }
  } else if (req.url === "/posts" && req.method === "POST") {
    // http localhost:4000/posts foo=dmdrk1414 title=dmdrk14141414 --print=HhBb
    // http -v POST localhost:4000/posts foo=dmdrk1414 title=dmdrk1414

    req.setEncoding("utf-8"); // setEncoding은 터밀널에 httpie을 이용하여 요청된 POST의 정보를 bufer을 읽을때 사용.
    req.on("data", (data) => {
      // string 타입으로 정해져야 posts객체에 접근이 가능하다.
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */

      // POST을 통해 데이터를 주면 처리하는 곳
      /** @type {CreatePostBody} */
      const body = JSON.parse(data); // 요청값을 오브젝트값으로 변환
      posts.push({
        // POST 에 데이터를 입력을하면 posts에 push가 가능하다.
        // POST을 이용해 데이터를 전송을 하면 ./posts의 객체 posts의 데이터가 push가 된다.
        // 모든 띄어쓰기에 "_"을 대체해라
        id: body.title.toLowerCase().replace(/(\s+)/g, "_"),
        title: body.title,
        content: body.content,
      });
    });
    console.log(posts);
    res.statusCode = 200;
    res.end("Creating post");
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
