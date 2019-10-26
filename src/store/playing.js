import { videoDetail } from "../api";

const Playing = {
  state: {
    videoDetailList: "111"
  },
  getters: {
    videoDetailList: state => {
      return state.videoDetailList;
    }
  },
  mutations: {
    SET_VIDEODETAIL: (state, payload) => {
      console.log(state, "state.videoDetailList");
      state.videoDetailList = payload;
    }
  },
  actions: {
    getVideoDetail(context, payload) {
      videoDetail(payload).then(res => {
        console.log(res.data, "SET_VIDEODETAIL");
        if (res.code) {
          context.commit("SET_VIDEODETAIL", res.data.movie);
        }
      });
    }
  }
};
export default Playing;
