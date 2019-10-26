import { fetch } from "../axios";

/* 公告 */
export function noticeAPI(query) {
  return fetch({
    url: "/user/notice",
    method: "get",
    params: query
  });
}
/* 消息 */
export function messageAPI(query) {
  return fetch({
    url: "/user/message",
    method: "get",
    params: query
  });
}
/* 常见问题 */
export function userFaqAPI() {
  return fetch({
    url: "/user/faq",
    method: "get"
  });
}
/* 意见反馈 */
export function feedbackAPI(query) {
  return fetch({
    url: "/user/feedback",
    method: "post",
    data: query
  });
}
/* 反馈标签 */
export function feedbackTagAPI() {
  return fetch({
    url: "/user/feedbackTag",
    method: "get"
  });
}
/* 我的意见反馈 */
export function myfeedbackAPI(query) {
  return fetch({
    url: "/user/myfeedback",
    method: "get",
    params: query
  });
}
/* 意见反馈回复列表 */
export function replyListAPI(query) {
  return fetch({
    url: "/user/replyList",
    method: "get",
    params: query
  });
}
/* 观看历史 */
export function watchingAPI(query) {
  return fetch({
    url: "/user/watching",
    method: "get",
    params: query
  });
}
/* 用户资料设置 */
export function userSet(query) {
  return fetch({
    url: "/user/set",
    method: "post",
    data: query
  });
}
/* 收藏记录 */
export function collectionAPI() {
  return fetch({
    url: "/user/collection",
    method: "get"
  });
}
