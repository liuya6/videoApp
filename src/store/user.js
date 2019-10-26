import { isLogin, userMy } from "../api";

const User = {
  state: {
    userInfo: null
  },
  getters: {
    userInfo: state => {
      // console.log(state.userInfo,'state.userInfo')
      return state.userInfo;
    }
  },
  mutations: {
    SET_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
    CLEAR_USER_INFO(state) {
      state.userInfo = null;
    }
  },
  actions: {
    checkedLogin(context) {
      isLogin().then(res => {
        if (typeof res === "string") {
          return false;
        }
        if (res.code) {
          // console.log(res.data,'checkedLoginres.data')
          // context.commit("SET_USER_INFO", res.data);
        } else {
          context.commit("SET_USER_INFO", "");
        }
      });
    },
    getUserMy(context) {
      userMy().then(res => {
        if (res.code) {
          console.log(res.data.user, "SET_USER_INFO");
          context.commit("SET_USER_INFO", res.data.user);
        }
      });
    }
  }
};
export default User;
