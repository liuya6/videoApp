import { fetch } from "../axios";

// 频道标签type
export function channelTagType() {
  return fetch({
    url: "/index/channelTagType",
    method: "get"
  });
}

// 频道标签movie
export function channelTagMovie(query) {
  return fetch({
    url: "/index/channelTagMovie",
    method: "get",
    params: query,
    loading: true
  });
}

// 频道专题
export function channelTopic() {
  return fetch({
    url: "/index/channelTopic",
    method: "get"
  });
}

// 主题影片
export function topic(query) {
  return fetch({
    url: "/video/topic",
    method: "get",
    params: query
  });
}

// 主题列表
export function topicList(query) {
  return fetch({
    url: "/video/topicList",
    method: "get",
    params: query
  });
}

// 女优列表
export function albumList(query) {
  return fetch({
    url: "/video/albumList",
    method: "get",
    params: query
  });
}
