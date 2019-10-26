<template>
  <div v-title="'意见反馈'" class="feedbackWrap">
    <Header title="意见反馈"></Header>
    <div class="top">
      <div class="flexC">
        <div
          class="flexC"
          v-for="(item, i) in tabList"
          :key="i"
          :class="{ active: activeIndex == i }"
          @click="changeTab(i)"
        >
          {{ item.title }}
          <span
            :class="
              userInfo.feedbackCnt > 0 && i == 2 ? 'feedbackRedSpan' : null
            "
          ></span>
        </div>
      </div>
      <p
        class="slide"
        :class="activeIndex == 0 ? 'i0' : activeIndex == 1 ? 'i1' : 'i2'"
      ></p>
    </div>
    <div class="feedbackContent">
      <div class="blank1"></div>
      <swiper :options="SwiperOption" ref="Swiper" style="min-height: 100%">
        <swiper-slide>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <Nodata v-if="nodata0"></Nodata>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
              v-else
            >
              <div class="question" v-for="(item, i) in questionList" :key="i">
                <div class="questionTitle">Q:{{ item.title }}</div>
                <div class="questionAnswer" v-html="item.content"></div>
              </div>
            </van-list>
          </van-pull-refresh>
        </swiper-slide>
        <swiper-slide>
          <div class="feedback">
            <div class="title">我遇见的问题</div>
            <ul class="flexS">
              <li
                class="flexC"
                v-for="(item, i) in problemList"
                :key="i"
                :class="{ active: problemActiveIndex === i }"
                @click="choose(i)"
              >
                {{ item.name }}
              </li>
            </ul>
            <textarea
              v-model="value"
              placeholder="请详尽描述遇到的问题，以使我们及时为您解决！
(10-100字)"
            ></textarea>
            <!-- <div class="add"></div> -->
            <div
              @click="sendFeedback(value)"
              class="button flexC"
              :class="{ avtiveButton: problemActiveIndex !== '' && value }"
            >
              立即反馈
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <van-pull-refresh v-model="isLoading1" @refresh="onRefresh1">
            <Nodata v-if="nodata2"></Nodata>
            <van-list
              v-model="loading1"
              :finished="finished1"
              finished-text="没有更多了"
              @load="onLoad1"
              :immediate-check="false"
              v-else
            >
              <div
                @click="showContent(item)"
                class="myFeedback flexB"
                v-for="(item, i) in feedbackList"
                :key="i"
              >
                <div style="width:90%">
                  <div class="flexB feedbackTitle">
                    <div>
                      {{ item.title }}
                      <span :class="item.status == 1 ? 'green' : 'red'">{{
                        item.status == 1 ? "已回复" : "未回复"
                      }}</span>
                    </div>
                    <p>{{ timestampToString(item.createTime) }}</p>
                  </div>
                  <p class="feedbackContent">{{ item.content }}</p>
                </div>
                <i class="iconfont" v-if="item.status == 1">&#xe6b4;</i>
              </div>
            </van-list>
          </van-pull-refresh>
        </swiper-slide>
      </swiper>
    </div>
    <!-- <div class="feedbackWrap"> -->
    <div class="feedbackWrap" v-if="showFeedbackWrap">
      <Header title="反馈详情" :close="closeWrap"></Header>
      <div class="main">
        <p>反馈内容：</p>
        <div class="title bottomLine common">
          {{ feedbackWrapItem.content }}
        </div>
        <p>反馈回复：</p>
        <ul>
          <li v-for="(item, i) in replyList" :key="i">
            <div>
              <span>{{ item.username }}：</span>
              {{ item.content }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters, mapActions } from "vuex";
import {
  feedbackAPI,
  feedbackTagAPI,
  myfeedbackAPI,
  userFaqAPI,
  replyListAPI
} from "../../api";

export default {
  name: "feedback",
  data() {
    return {
      activeIndex: "",
      SwiperOption: {
        on: {
          slideChangeTransitionStart: () => {
            this.activeIndex = this.swiper.activeIndex;
          }
        },
        autoHeight: true
      },
      tabList: [
        { title: "常见问题" },
        { title: "我要反馈" },
        { title: "我的反馈" }
      ],
      questionList: [],
      problemList: [],
      problemActiveIndex: "",
      value: "",
      feedbackList: [],
      nodata0: false,
      nodata2: false,
      isLoading: true,
      loading: false,
      finished: false,
      isLoading1: true,
      loading1: false,
      finished1: false,
      userFaqQuery: {
        page: 1,
        pageSize: 10
      },
      myfeedbackQuery: {
        page: 1,
        pageSize: 10
      },
      showFeedbackWrap: false,
      feedbackWrapItem: "",
      replyList: ""
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters(["feedback", "userInfo"]),
    swiper() {
      return this.$refs.Swiper.swiper;
    }
  },
  created() {
    userFaqAPI().then(res => {
      if (res.code) {
        console.log(res.data, "getUserFaqAPI");
        this.questionList = res.data.list;
        if (!res.data.list.length) {
          this.nodata0 = true;
        }
      } else {
        this.nodata0 = true;
        this.$toast(res.msg);
      }
    });
    feedbackTagAPI().then(res => {
      if (res.code) {
        console.log(res.data, "feedbackTagAPI");
        this.problemList = res.data.list;
      } else {
        this.$toast(res.msg);
      }
    });
    this.getMyFeedback();
  },
  methods: {
    ...mapActions(["getFeedback"]),
    getMyFeedback() {
      myfeedbackAPI().then(res => {
        if (res.code) {
          console.log(res.data, "myfeedbackAPI");
          this.feedbackList = res.data.list;
          if (!res.data.list.length) {
            this.nodata2 = true;
          }
        } else {
          this.nodata2 = true;
          this.$toast(res.msg);
        }
      });
    },
    changeTab(index) {
      this.activeIndex = index;
      this.swiper.slideTo(index);
    },
    choose(index) {
      console.log(this.problemActiveIndex, index, "11111");
      //现在是单选
      if (this.problemActiveIndex === "") {
        this.problemActiveIndex = index;
      } else {
        if (this.problemActiveIndex == index) {
          this.problemActiveIndex = "";
        } else {
          this.problemActiveIndex = index;
        }
      }
      //下面是多选
      // if (this.problemActiveIndex.indexOf(index) > -1) {
      //   this.problemActiveIndex.forEach((e, i) => {
      //     if (index == e) {
      //       this.problemActiveIndex.splice(i, 1);
      //     }
      //   });
      // } else {
      //   return this.problemActiveIndex.push(index);
      // }
    },
    sendFeedback(value) {
      console.log(
        this.problemActiveIndex,
        this.problemActiveIndex.length,
        "........."
      );
      if (this.problemActiveIndex === "") return this.$toast("请选择反馈标签");
      if (!this.value.length) return this.$toast("请输入反馈内容");
      feedbackAPI({
        content: value,
        type: this.problemList[this.problemActiveIndex].id
      }).then(res => {
        console.log(res, "feedbackAPI");
        if (res.code) {
          this.value = "";
          this.problemActiveIndex = "";
          this.getMyFeedback();
        }
        this.$toast(res.msg);
      });
    },
    onRefresh() {
      this.finished = false;
      this.userFaqQuery.page = 1;
      userFaqAPI(this.userFaqQuery).then(res => {
        if (res.code) {
          this.questionList = res.data.list;
          this.$toast("刷新成功");
          if (!res.data.list.length) {
          }
        } else {
          this.loading = false;
          this.$toast(res.msg);
        }
        this.isLoading = false;
      });
    },
    onLoad() {
      this.userFaqQuery.page++;
      userFaqAPI(this.userFaqQuery).then(res => {
        if (res.code) {
          this.questionList = this.questionList.concat(res.data.List);
          this.loading = false;
          if (res.data.list.length < this.userFaqQuery.pageSize) {
            this.finished = true;
          }
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    onRefresh1() {
      this.finished1 = false;
      this.myfeedbackQuery.page = 1;
      myfeedbackAPI(this.myfeedbackQuery).then(res => {
        if (res.code) {
          this.feedbackList = res.data.list;
          // console.log(res.data.list.length,'res.data.list.length')
          this.$toast("刷新成功");
          if (!res.data.list.length) {
          }
        } else {
          this.$toast(res.msg);
        }
        this.isLoading1 = false;
      });
    },
    onLoad1() {
      this.myfeedbackQuery.page++;
      myfeedbackAPI(this.myfeedbackQuery).then(res => {
        if (res.data.list.length) {
          this.feedbackList = this.feedbackList.concat(res.data.List);
          this.loading1 = false;
        } else {
          this.loading1 = false;
          this.finished1 = true;
        }
      });
    },
    showContent(item) {
      if (item.status == 1) {
        this.feedbackWrapItem = item;
        this.showFeedbackWrap = !this.showFeedbackWrap;
        replyListAPI({ fbId: item.id }).then(res => {
          if (res.code) {
            this.replyList = res.data.list;
          } else {
            this.$toast(res.msg);
          }
        });
      }
    },
    closeWrap() {
      this.showFeedbackWrap = false;
    }
  }
};
</script>

<style lang="less" scoped>
.van-list {
  min-height: calc(100vh - 235px);
}
.top {
  height: 100px;
  background: #1d1f30;
  box-shadow: 0 1px 0 0 rgba(4, 0, 0, 0.1);
  position: relative;
  div {
    line-height: 100px;
    div {
      color: #fff;
      width: 33.3%;
      font-size: 28px;
      transition: 0.4s ease-in-out;
      position: relative;
    }
  }
  .active {
    color: #eb623f;
  }
  .slide {
    width: 60px;
    height: 4px;
    position: absolute;
    left: 460px;
    bottom: 0;
    background: #eb623f;
    transition: 0.4s ease-in-out;
  }
  .i0 {
    left: 98px;
  }
  .i1 {
    left: 348px;
  }
  .i2 {
    left: 596px;
  }
}
.question {
  font-size: 28px;
  padding: 36px 20px;
  border-bottom: 1px solid #e0e0e0;
  .questionTitle {
    color: #666666;
    margin-bottom: 18px;
  }
  .questionAnswer {
    color: #999999;
  }
}
.question:last-child {
  border-bottom: 1px solid #c0c0c0;
}
.feedback {
  padding: 30px 0 30px 20px;
  .title {
    font-size: 36px;
    margin-bottom: 60px;
  }
  ul {
    flex-wrap: wrap;
    li {
      width: 216px;
      height: 76px;
      border-radius: 38px;
      border: solid 2px #999999;
      font-size: 28px;
      color: #999999;
      margin-bottom: 20px;
      margin-right: 20px;
    }
    .active {
      background: #eb623f;
      color: white;
      border: solid 2px #eb623f;
    }
  }
  textarea {
    width: 630px;
    height: 236px;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 10px;
    font-size: 28px;
    border: 0;
    color: #999999;
  }
  .button {
    border-radius: 50px;
    background-image: linear-gradient(-90deg, #868686, #cccccc),
      linear-gradient(#f7f7ef, #f7f7ef);
    width: 670px;
    height: 88px;
    margin-top: 60px;
    margin-left: 20px;
    color: #fff;
  }
  .avtiveButton {
    background-image: linear-gradient(-90deg, #eb623f, #f7d185),
      linear-gradient(#f7f7ef, #f7f7ef);
  }
}
.myFeedback {
  font-size: 28px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  color: #999999;
  .feedbackTitle {
    margin-bottom: 16px;
    width: 100%;
    div {
      font-size: 30px;
      color: #535353;
      span {
        font-size: 24px;
        margin-left: 16px;
        border-radius: 6px;
      }
      .green {
        border: solid 2px #559f51;
        color: #559f51;
      }
      .red {
        border: solid 2px #f03838;
        color: #f03838;
      }
    }
    p {
      font-size: 26px;
    }
  }
  .feedbackContent {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  i {
    font-size: 34px;
  }
}
.feedbackWrap {
  width: 100%;
  /*height: 100%;*/
  /*position: fixed;*/
  /*top: 0;*/
  /*z-index: 10;*/
  background: #fff;
  .main {
    padding: 20px 20px 0 20px;
    p {
      font-size: 34px;
      padding: 14px 20px;
      font-weight: bold;
    }
    .bottomLine {
      border-bottom: 1px solid #e0e0e0;
    }
    .common {
      padding: 20px;
    }
    ul {
      li {
        div {
          padding: 16px 0;
          font-size: 26px;
          span {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
