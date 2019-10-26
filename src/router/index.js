const Router = window.VueRouter;
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

import Home from "./home";
import Classify from "./classify";
import Find from "./find";
import My from "./my";

const { Toast, Dialog } = window.vant;

const router = new Router({
  mode: "history",
  routes: [
    ...Home,
    ...Classify,
    ...Find,
    ...My,
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = router.app.$options.store.getters.userInfo;
  if (to.meta.denyAuth) {
    if (userInfo) {
      router.app.cancel();
      return next({
        name: "user"
      });
    }
  }
  if (to.meta.requiresAuth) {
    if (!userInfo) {
      // 登录验证
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // next = push
      console.log(to.fullPath);
      Dialog.confirm({
        title: "提示",
        message: "您还未登录，立即登录？"
      })
        .then(() => {
          router.app.cancel();
          return next({
            path: "/login",
            query: { redirect: to.fullPath }
          });
        })
        .catch(e => {
          // on cancel
          console.log(e, "取消");
          return next(false);
        });
      return false;
    }
    if (to.meta.team && userInfo.type != "3") {
      return next("/");
    }
    if (userInfo.parentId == 312 && to.meta.testIsNo) {
      // 试玩账号验证
      Toast("试玩账号无法进入");
      return next(false);
    }
  }
  router.app.cancel();
  return next();
});
export default router;
