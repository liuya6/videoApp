import { fetch } from "../axios";

/* 注册 */
export function register(query) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: query,
    loading: true
  });
}

/* 登录 */
export function Login(query) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: query,
    loading: true
  });
}
/* 会员退出 */
export function LoginOut() {
  return fetch({
    url: "/auth/logout",
    method: "post",
    loading: true
  });
}

/* 检查登录状态 */
export function isLogin() {
  return fetch({
    url: "/auth/checkLogin",
    method: "get"
  });
}

/* 个人中心 */
export function userMy() {
  return fetch({
    url: "/user/my",
    method: "get"
  });
}

/* 收藏 */
export function collection(query) {
  return fetch({
    url: "/user/collection",
    method: "post",
    data: query
  });
}
