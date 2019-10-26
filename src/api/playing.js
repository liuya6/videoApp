import { fetch } from "../axios";

// 影片详情
export function videoDetail(query) {
  return fetch({
    url: "/video/detail",
    method: "get",
    params: query
  });
}

// 评论
export function movieLike(query) {
  return fetch({
    url: "/user/movieLike",
    method: "post",
    data: query
  });
}

// 评论
export function commentAPI(query) {
  return fetch({
    url: "/user/comment",
    method: "post",
    data: query
  });
}

// 影片评论
export function videoCommentAPI(query) {
  return fetch({
    url: "/video/commentList",
    method: "get",
    params: query
  });
}

// 影片评论
export function play(query) {
  return fetch({
    url: "/video/play",
    method: "post",
    data: query
  });
}

// 获取url
export function getVideoUrl(query) {
  return fetch({
    url: "/video/getVideoUrl",
    method: "get",
    responseType: "blob",
    params: query
  });
}
