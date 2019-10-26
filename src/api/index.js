export * from "./classify";
export * from "./find";
export * from "./user";
export * from "./my";
export * from "./playing";

import { fetch } from "../axios";

// 全部设置
export function setting() {
  return fetch({
    url: "/system/setting",
    method: "get"
  });
}

// 首页
export function indexHome(query) {
  return fetch({
    url: "/index/home",
    method: "get",
    params: query
  });
}

// 全部影片列表
export function videoIndex(query) {
  return fetch({
    url: "/video/index",
    method: "get",
    params: query,
    loading: true
  });
}

// 热搜关键词
export function searchKeyword(query) {
  return fetch({
    url: "/system/searchKeyword",
    method: "get",
    params: query
  });
}

// 热播换一换
export function changeHot() {
  return fetch({
    url: "/index/changeHot",
    method: "get"
  });
}
