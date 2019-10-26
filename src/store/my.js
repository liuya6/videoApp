import { noticeAPI, feedbackAPI, userFaqAPI } from "../api";

const My = {
  state: {
    faq: "",
    notice: "",
    feedback: ""
  },
  getters: {
    faq: state => {
      return state.faq;
    },
    notice: state => {
      return state.notice;
    },
    feedback: state => {
      return state.feedback;
    }
  },
  mutations: {
    SET_FAQ: (state, payload) => {
      state.faq = payload;
    },
    SET_NTOTICE: (state, payload) => {
      state.notice = payload;
    },
    SET_FEEDBACK: (state, payload) => {
      state.feedback = payload;
    }
  },
  actions: {
    getUserFaqAPI({ context }) {
      userFaqAPI().then(res => {
        if (res.code) {
          console.log(res.data);
          context.commit("SET_FAQ", res.data);
        }
      });
    },
    getNoticeAPI({ context }) {
      noticeAPI().then(res => {
        if (res.code) {
          console.log(res.data);
          context.commit("SET_NTOTICE", res.data);
        }
      });
    },
    getFeedback({ context }) {
      feedbackAPI().then(res => {
        if (res.code) {
          console.log(res.data);
          context.commit("SET_FEEDBACK", res.data);
        }
      });
    }
  }
};
export default My;
