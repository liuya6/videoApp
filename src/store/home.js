import { setting } from "../api";

const Home = {
  state: {
    indexHome: "",
    allMovieType: "",
    setting: ""
  },
  getters: {
    allMovieType: state => {
      return state.allMovieType;
    },
    setting: state => {
      return state.setting;
    },
    webName: state => {
      return state.setting &&
        state.setting.setting &&
        state.setting.setting.webName
        ? state.setting.setting.webName
        : "视频";
    }
  },
  mutations: {
    SET_ALL_MOVIE_TYPE: (state, payload) => {
      state.allMovieType = payload;
    },
    SET_SETTING: (state, payload) => {
      state.setting = payload;
    }
  },
  actions: {
    settings({ commit }) {
      setting().then(res => {
        console.log(res.data);
        commit("SET_SETTING", res.data.setting);
        commit("SET_ALL_MOVIE_TYPE", res.data.channel);
      });
    }
  }
};
export default Home;
