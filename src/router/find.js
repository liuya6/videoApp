const Find = () => import("../views/find/Find");

export default [
  {
    path: "/find",
    name: "find",
    component: Find,
    meta: {
      requiresAuth: true,
      keepAlive: true,
      DocumentTitle: "发现"
    }
  }
];
