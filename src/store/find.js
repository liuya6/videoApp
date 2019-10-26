import { find } from "../api";

const Find = {
  state: {
    findList: "",
    ifGetFind: true
  },
  getters: {
    findList: state => {
      return state.findList;
    },
    ifGetFind: state => {
      return state.ifGetFind;
    }
  },
  mutations: {
    SET_find: (state, payload) => {
      state.findList = payload;
    },
    SET_IFGETFIND: (state, payload) => {
      state.ifGetFind = payload;
    }
  },
  actions: {
    getFind(context, payload) {
      find(payload).then(res => {
        console.log(res.data);
        if (res.code) {
          context.commit("SET_find", res.data.hot);
        }
      });
    }
  }
};
export default Find;
