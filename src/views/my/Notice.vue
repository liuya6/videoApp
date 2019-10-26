<template>
  <div v-title="'通知'">
    <Header title="通知"></Header>
    <div class="top">
      <div class="flexC">
        <span
          class="flexC"
          v-for="(item, i) in tabList"
          :key="i"
          :class="{ active: activeIndex == i }"
          @click="changeTab(i)"
          >{{ item }}</span
        >
      </div>
      <p class="slide" :class="activeIndex == 0 ? 'i0' : 'i1'"></p>
    </div>
    <div class="content">
      <div class="blank1"></div>
      <swiper :options="SwiperOption" ref="Swiper" style="min-height: 100%">
        <swiper-slide>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
              v-if="announcement.length"
            >
              <div
                class="question flexC"
                :class="{ questionLine: announcement.length - 1 != i }"
                v-for="(item, i) in announcement"
                :key="i"
              >
                <div class="imgWrap flexC">
                  <img src="../../assets/images/notice.png" alt />
                </div>
                <div>
                  <div class="questionTitle">Q:{{ item.title }}</div>
                  <p class="questionAnswer">A:{{ item.content }}</p>
                </div>
              </div>
            </van-list>
            <Nodata v-else></Nodata>
          </van-pull-refresh>
        </swiper-slide>
        <swiper-slide>
          <van-pull-refresh v-model="isLoading1" @refresh="messageRefresh">
            <van-list
              v-model="loading1"
              :finished="finished1"
              finished-text="没有更多了"
              @load="messageOnLoad"
              :immediate-check="false"
              v-if="messageList.length"
            >
              <div
                class="feedback flexB"
                :class="{ questionLine: announcement.length - 1 != i }"
                v-for="(item, i) in messageList"
                :key="i"
              >
                <div class="imgWrap flexC">
                  <img src="../../assets/images/message.png" alt />
                </div>
                <div style="width:100%">
                  <div class="flexB feedbackTitle">
                    <div>{{ item.title }}</div>
                    <span>{{ timestampToString(item.createTime) }}</span>
                  </div>
                  <p class="questionAnswer">{{ item.content }}</p>
                </div>
              </div>
            </van-list>
            <Nodata v-else></Nodata>
          </van-pull-refresh>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { noticeAPI, messageAPI } from "../../api";

export default {
  name: "notice",
  data() {
    return {
      activeIndex: 0,
      SwiperOption: {
        on: {
          slideChangeTransitionStart: () => {
            this.activeIndex = this.swiper.activeIndex;
          }
        },
        autoHeight: true
      },
      tabList: ["公告", "消息"],
      announcement: [],
      messageList: [],
      isLoading: true,
      loading: false,
      finished: false,
      isLoading1: true,
      loading1: false,
      finished1: false,
      announcementQuery: {
        page: 1,
        pageSize: 10
      },
      messageQuery: {
        page: 1,
        pageSize: 10
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    noticeAPI(this.announcementQuery).then(res => {
      if (res.code) {
        this.announcement = res.data.list;
        console.log(res.data.list, res.data.list.length, "announcement");
      }
    });
    messageAPI(this.messageQuery).then(res => {
      if (res.code) {
        this.messageList = res.data.list;
        console.log(res.data.list, "messageList");
      }
    });
  },
  computed: {
    swiper() {
      return this.$refs.Swiper.swiper;
    }
  },
  methods: {
    getMessageAPI() {},
    changeTab(index) {
      this.activeIndex = index;
      console.log(this.activeIndex, "this.activeIndex");
      this.swiper.slideTo(index);
    },
    send(i) {
      problemList[i].active == true;
    },
    exchange(value) {},
    onRefresh() {
      this.finished = false;
      this.announcementQuery.page = 1;
      noticeAPI(this.announcementQuery).then(res => {
        if (res.data.list.length) {
          this.announcement = res.data.list;
          if (this.announcement.length < this.announcementQuery.pageSize) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          this.isLoading = false;
          this.$toast("刷新成功");
        } else {
          this.loading = false;
          this.finished = false;
          this.$toast(res.msg);
        }
      });
    },
    onLoad() {
      this.announcementQuery.page++;
      noticeAPI(this.announcementQuery).then(res => {
        if (res.data.list.length) {
          this.announcement = this.announcement.concat(res.data.List);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    messageRefresh() {
      this.finished1 = false;
      this.messageQuery.page = 1;
      messageAPI(this.messageQuery).then(res => {
        if (res.code) {
          this.messageList = res.data.list;
          this.isLoading1 = false;
          this.$toast("刷新成功");
        } else {
          this.$toast(res.msg);
        }
      });
    },
    messageOnLoad() {
      this.messageQuery.page++;
      messageAPI(this.messageQuery).then(res => {
        if (res.data.list.length) {
          this.messageList = this.messageList.concat(res.data.List);
          this.loading1 = false;
        } else {
          this.loading1 = false;
          this.finished1 = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-list {
  min-height: calc(100vh - 235px);
}
.top {
  height: 103px;
  background: #1d1f30;
  box-shadow: 0 1px 0 0 rgba(4, 0, 0, 0.1);
  position: relative;
  div {
    line-height: 103px;
    span {
      color: #fff;
      width: 33.3%;
      font-size: 28px;
      transition: 0.4s ease-in-out;
    }
  }
  .active {
    color: #eb623f;
  }
  .slide {
    width: 50px;
    height: 4px;
    position: absolute;
    left: 460px;
    bottom: 0;
    background: #eb623f;
    transition: 0.4s ease-in-out;
  }
  .i0 {
    left: 228px;
  }
  .i1 {
    left: 478px;
  }
}
.questionLine {
  border-bottom: 1px solid #e0e0e0;
}
.question {
  font-size: 28px;
  padding: 34px 18px;
  .imgWrap {
    background: #ebebed;
    padding: 18px;
    border-radius: 50%;
    padding: 20px;
    margin-right: 20px;
    img {
      width: 70px;
    }
  }
  .questionTitle {
    color: #666666;
    margin-bottom: 18px;
  }
  .questionAnswer {
    color: #999999;
  }
}
.feedback {
  font-size: 28px;
  padding: 34px 18px;
  .imgWrap {
    background: #ebebed;
    padding: 18px;
    border-radius: 50%;
    margin-right: 18px;
    img {
      width: 70px;
    }
  }
  .feedbackTitle {
    margin-bottom: 16px;
    min-width: 200px;
    div {
      color: #666666;
    }
    span {
      width: 150px;
      font-size: 24px;
      color: #999999;
      text-align: center;
    }
  }
  .questionAnswer {
    color: #999999;
  }
}
</style>
