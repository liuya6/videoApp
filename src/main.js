import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/index.less";

import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
Vue.use(VueVideoPlayer);
const VueLazyload = window.VueLazyload;
Vue.use(VueLazyload, {
  loading: "/images/loading.gif"
});
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components",
  // 是否查询其子目录
  true
  // 匹配基础组件文件名的正则表达式
  // /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.prototype.character = function(str) {
  return str
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/ /g, "&nbsp;")
    .replace(/\n/g, "<br/>");
};

Vue.prototype.back = function() {
  //全局返回
  if (window.history.length < 3) {
    return router.push({ name: "home" });
  }
  router.go(-1);
};

Vue.prototype.toNum = function(data) {
  if (data === "") {
    return undefined;
  }
  return data * 1;
};

Vue.prototype.cancel = function() {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  let cancelArr = window.axiosCancel;
  cancelArr.forEach((ele, index) => {
    ele.cancel("取消了请求"); // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index];
  });
};

Vue.prototype.timestampToString = function(timestamp = +new Date()) {
  //解析时间戳
  if (timestamp) {
    let time = new Date(timestamp * 1000);
    let y = time.getFullYear();
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    M = M < 10 ? "0" + M : M;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "";
  }
};

Vue.directive("title", {
  // 指令的定义
  inserted: function(el, binding) {
    let titles = router.app.$options.store.getters.webName;
    if (binding.value !== "") {
      titles = binding.value + " - " + titles;
    }
    document.title = titles;
  }
});

Vue.directive("focus", {
  //全局input聚焦
  inserted: function(el) {
    el.focus();
  }
});

Vue.prototype.dataURLToBlob = function(dataURL) {
  let BASE64_MARKER = ";base64,";
  let parts;
  let contentType;
  let raw;
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(",");
    contentType = parts[0].split(":")[1];
    raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(":")[1];
  raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

// swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default global options } */);

import "lib-flexible/flexible.js"; // 移动端自适应
console.log("入口文件");
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
