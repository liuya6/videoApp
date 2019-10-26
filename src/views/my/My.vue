<template>
  <div class="my" v-title="'我的'">
    <div class="content">
      <div class="top">
        <img src="../../assets/images/wallhaven.png" alt />
        <div class="set flexC">
          <i class="iconfont">&#xe6bf;</i>
          <div @click="$router.push({ name: 'set' })">设置</div>
        </div>
        <div class="userInfoBox box shadow">
          <img :src="userInfo.avatar" alt />
          <div class="user flexC">
            <span>{{ userInfo.username || userInfo.nickname }}</span>
            <i class="iconfont" v-if="userInfo.gender == 2">&#xe6bc;</i>
            <i class="iconfont" v-else>&#xe6bd;</i>
          </div>
          <div class="flexC">
            <div class="flexC" @click="$router.push({ name: 'activation' })">
              激活码兑换
            </div>
            <div
              v-if="userInfo.currentLevel"
              class="flexC"
              @click="$router.push({ name: 'promotion' })"
            >
              Level {{ userInfo.currentLevel.level }}
              {{ userInfo.currentLevel.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="box main">
        <div class="main1 flexC">推广、看广告可增加更多观影次数哦~</div>
        <div class="main2">
          <div class="main3">
            <div v-if="userInfo && userInfo.username" class="times flexC">
              {{ userInfo.playNum }}/{{ userInfo.currentLevel.playNum }}
            </div>
            <p>今日剩余观影次数~</p>
          </div>
          <div class="main4">
            <img src="images/rumen.png" alt />
            <p>下一等级还差{{ userInfo.promotionNeed }}人~</p>
          </div>
        </div>
      </div>
      <ul class="box flexB">
        <li v-for="(item, i) in List" :key="i" @click="listGo(item)">
          <div :class="i == 3 ? 'blueBack' : null">
            <span
              :class="
                userInfo.feedbackCnt > 0 && i == 1 ? 'feedbackRedSpan' : null
              "
            ></span>
            <i
              class="iconfont"
              :class="i == 0 ? 'rotate' : null"
              :style="{ color: item.color }"
              v-html="item.icon"
            ></i>
          </div>
          <p>{{ item.title }}</p>
        </li>
      </ul>
      <div class="history box">
        <div class="flexB list line" @click="$router.push({ name: 'history' })">
          <div class="list2">
            <div class="ibox ibox1 flexC">
              <i class="iconfont" style="color: #fff">&#xe6b3;</i>
            </div>
            <div class="text">
              <div>历史记录</div>
              <p>目前历史观看过{{ userInfo.watchingCnt }}部</p>
            </div>
          </div>
          <i class="iconfont">&#xe6b4;</i>
        </div>
        <div class="list flexB" @click="$router.push({ name: 'myLove' })">
          <div class="list2">
            <div class="ibox ibox2 flexC">
              <i class="iconfont" style="color: #fff">&#xe6c1;</i>
            </div>
            <div class="text">
              <div>我的喜欢</div>
              <p>目前已有喜欢{{ userInfo.collectionCnt }}部</p>
            </div>
          </div>
          <i class="iconfont">&#xe6b4;</i>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import { userMy,isLogin } from "../../api";
export default {
  name: "My",
  data() {
    return {
      img: "../../assets/images/user.png",
      List: [
        {
          title: "我要推广",
          color: "#ffc800",
          icon: "&#xe6b8;",
          routerName: "promotion"
        },
        {
          title: "意见反馈",
          color: "#4a79f9",
          icon: "&#xe6ba;",
          routerName: "feedback"
        },
        {
          title: "我的通知",
          color: "#fd7e2d",
          icon: "&#xe6bb;",
          routerName: "notice"
        },
        {
          title: "火爆交流群",
          color: "#fff",
          icon: "&#xe6c7;",
          routerName: ""
        }
      ],
      list1: [],
      show: false,
      value: ""
    };
  },
  created() {
    this.getUserMy();
    this.checkedLogin();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserMy", "checkedLogin"]),
    listGo(item) {
      if (item.routerName) {
        this.$router.push({ name: item.routerName });
      } else {
        this.$toast("敬请期待");
      }
    },
    change(l, i) {
      if (i == 2) return;
      this.list1.push(l, i);
      this.show = true;
    },
    cancel() {
      this.show = false;
      this.list1 = [];
    },
    confirm() {
      this.show = false;
      this.list1 = [];
    }
  }
};
</script>

<style scoped lang="less">
.my {
  .content {
    padding-bottom: 102px;
    .top {
      height: 422px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .set {
        position: absolute;
        width: 143px;
        height: 66px;
        right: 0;
        top: 24px;
        background: linear-gradient(#e4df5f, #d7a301);
        border-top-left-radius: 33px;
        border-bottom-left-radius: 33px;
        color: #947305;
        i {
          margin-right: 8px;
          font-size: 32px;
        }
        > div {
          font-size: 28px;
        }
      }
      .userInfoBox {
        position: absolute;
        width: 590px;
        height: 260px;
        padding: 21px 40px;
        left: 40px;
        bottom: -160px;
        img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          position: absolute;
          left: 255px;
          top: -80px;
        }
        .user {
          font-size: 36px;
          font-weight: bold;
          padding-top: 99px;
          padding-bottom: 40px;
          i {
            margin-left: 10px;
            font-size: 30px;
          }
        }
        .flexC {
          div {
            width: 265px;
            height: 68px;
            border-radius: 34px;
            font-size: 36px;
          }
          div:first-child {
            color: #388eff;
            border: 2px solid #48aaed;
            margin-right: 60px;
          }
          div:last-child {
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            color: #fff;
          }
        }
      }
    }
    .main {
      width: 670px;
      margin-top: 186px;
      padding: 28px 0;
      font-size: 28px;
      color: #999999;
      margin-left: 40px;
      .main1 {
        margin-bottom: 38px;
      }
      .main2 {
        display: flex;
        align-items: center;
        > div {
          padding-left: 39px;
          padding-top: 10px;
        }
        .main3 {
          border-right: 1px solid #c0c0c0;
          padding-right: 56px;
          .times {
            font-size: 54px;
            color: #d8aa0c;
          }
        }
        .main4 {
          img {
            width: 80px;
            margin-left: 60px;
          }
        }
      }
    }
    ul {
      width: 670px;
      margin-left: 40px;
      margin-top: 20px;
      li {
        flex: 1;
        padding: 20px 0;
        position: relative;
        span {
          top: 20px;
          right: 46px;
        }
        i {
          font-size: 72px;
          display: flex;
          justify-content: center;
        }
        p {
          padding-top: 20px;
          font-size: 28px;
          color: #999999;
          text-align: center;
        }
      }
      .rotate {
        animation: rotating 3s linear infinite;
      }
      .blueBack {
        width: 67px;
        height: 66px;
        border-radius: 20px;
        background: #3875da;
        padding: 0 6px 10px 6px;
        margin-left: 42px;
      }
    }
    .history {
      width: 670px;
      margin-left: 40px;
      margin-top: 20px;
      margin-bottom: 40px;
      .list {
        padding: 40px;
        i:first-child {
          font-size: 60px;
        }
        i:last-child {
          font-size: 50px;
          color: #999999;
        }
        .list2 {
          display: flex;
          .ibox {
            width: 98px;
            height: 98px;
            border-radius: 10px;
          }
          .ibox1 {
            box-shadow: 0 0 12px 0 #519dff;
            background: #519dff;
          }
          .ibox2 {
            box-shadow: 0 0 12px 0 #28d08f;
            background: #28d08f;
          }
          .text {
            margin-left: 30px;
            div {
              font-size: 36px;
              color: #333333;
              padding: 10px 0;
            }
            p {
              font-size: 24px;
              color: #999999;
            }
          }
        }
      }
      .line {
        border-bottom: 1px solid #c0c0c0;
      }
    }
    .box {
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 0 0.346667rem 0.013333rem rgba(0, 0, 0, 0.15);
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
