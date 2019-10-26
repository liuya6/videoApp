import { fetch } from "../axios";

// 发现
export function find(query) {
  return fetch({
    url: "/index/find",
    method: "get",
    params: query
  });
}
// 收藏
export function movieCollection(query) {
  return fetch({
    url: "/user/movieCollection",
    method: "post",
    data: query
  });
}
// 评论点赞
export function commentLike(query) {
  return fetch({
    url: "/user/commentLike",
    method: "post",
    data: query
  });
}
