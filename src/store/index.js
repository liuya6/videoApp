// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);
let Vuex = window.Vuex;
// console.log(Vue,'Vue')
// console.log(Vuex,'Vuex')
import Home from "./home";
import User from "./user";
import Find from "./find";
import My from "./my";
import Playing from "./playing";
console.log(Playing, "Playing");
const handleStore = store => {
  let storage = window.sessionStorage;
  if (!storage) {
    return console.warn("当前浏览器不支持sessionStorage!");
  }
  if (sessionStorage.store) {
    let state = JSON.parse(sessionStorage.store);
    store.replaceState(state);
  }
  store.subscribe((mutation, state) => {
    sessionStorage.setItem("store", JSON.stringify(state));
  });
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    Home,
    User,
    Find,
    My,
    Playing
  },
  plugins: [handleStore]
});
