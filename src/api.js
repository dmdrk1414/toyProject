// @ts-check

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

/**
 * Post = 글쓰기
 * GET /posts = 전체 글을 보는법
 * GET /posts:id = 특정 글을 보는법 (해당 id)
 * POST /posts = 글을 올리기
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {"GET" | "POST"} method
 * @property {() => Promise<APIResponse>} callback
 */
// @property {(values: Object) => string} callback   // callback 타입을 정하는 방법.

// url과 메소드가 메치가 되면
// 콜백함수를 부르는 결과을 잘가공해서 클라이언트에 내려준다.
/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: "GET",
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, // TODO: RegExp로 고쳐라
    method: "GET",
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts$/, // TODO: RegExp로 고쳐라
    method: "POST",
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
];

module.exports = {
  routes,
};
