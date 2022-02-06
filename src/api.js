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

// body의 타입은 Object || string 이다.
/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {"GET" | "POST"} method
 * @property {(matches: string[]) => Promise<APIResponse>} callback
 */
// @property {(values: Object) => string} callback   // callback 타입을 정하는 방법.

// url과 메소드가 메치가 되면
// 콜백함수를 부르는 결과을 잘가공해서 클라이언트에 내려준다.
/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: "GET",
    // body는 말들어서 데이터를 전송해야되기 때문?
    // 이부분이 가장 이해가 안된다.
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {
        id: "dmdrk1414",
      },
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, // TODO: RegExp로 고쳐라
    method: "GET",
    callback: async (matches) => {
      // main함수에서 가져온 url정보를 콜백으로 가져온다.
      const postId = matches[1];
      if (!postId) {
        return {
          statusCode: 404,
          body: "Not found",
        };
      }

      const post = posts.find((_post) => _post.id === postId);

      if (!post) {
        return {
          statusCode: 404,
          body: "Not found",
        };
      }

      return {
        statusCode: 200,
        body: post,
      };
    },
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
