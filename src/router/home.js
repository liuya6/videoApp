const Home = () => import("../views/home/Home");
const Search = () => import("../views/home/Search");
const AllMovie = () => import("../views/home/AllMovie");
const Login = () => import("../views/login/Login");
const Register = () => import("../views/login/Register");

export default [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      keepAlive: true,
      DocumentTitle: "搜索"
    }
  },
  {
    path: "/allmovie/:channelId?/:orderby?",
    name: "allmovie",
    component: AllMovie,
    meta: {
      // keepAlive: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      denyAuth: true // 拒绝登录访问
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      denyAuth: true // 拒绝登录访问
    }
  }
];
